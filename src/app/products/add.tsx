import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState, useCallback, useMemo } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import {
  useLocationStore,
  useShopsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { auth, firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { ProductTypes } from "@/src/utils/types";
import { useRouter } from "expo-router";
import { CustomModal } from "@/src/components/CustomModal";
import { Colors } from "@/src/constants/Colors";
import { CustomToast, deduct } from "@/src/utils/data";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import PhotosCard from "@/src/components/PhotosCard";
import * as VideoThumbnails from "expo-video-thumbnails";
import moment from "moment";
import FancyHeader from "@/src/components/FancyHeader";
import { UIActivityIndicator } from "react-native-indicators";

const add = () => {
  const router = useRouter();

  const { shops } = useShopsStore();
  const { user } = useUserStore();
  const { location: userLocation } = useLocationStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [category, setCategory] = useState("Select category");

  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);

  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [image, setImage] = useState<string | null>(null);

  const generateThumbnail = async (videoURl: string) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(videoURl, {
        time: 15000,
      });
      setImage(uri);
    } catch (e) {
      console.warn(e);
    }
  };

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSubmitProduct = () => {
    const promo = active === 2 ? 7 : active === 3 ? 30 : active === 4 ? 90 : 0;

    const id = `${Date.now()}`;

    const data: ProductTypes = {
      _id: id,
      name,
      description,
      location:
        location !== ""
          ? location
          : userLocation.length > 0
          ? userLocation[0].regionName?.city
          : user?.location?.regionName?.city,
      price: parseFloat(price),
      negotiable,
      category,
      images: images,
      video: video,
      sellerID: auth.currentUser?.uid!,
      promo: promo == 0 ? "free" : promo == 90 ? "3 months" : promo + " days",
      promoExpiresOn:
        promo > 0
          ? moment().add(promo, "days").toISOString()
          : moment().toISOString(),
    };

    const productRef = doc(firestoreDB, "products", data._id);
    setDoc(productRef, data).then(() => {
      router.push("/");
    });
    setVisible(false);
    setPosting(false);
  };

  const handleProcessPayment = (active: number) => {
    if (active > parseInt(user?.walletBalance)) {
      CustomToast("Please fund your wallet to continue.");
      setPosting(false);
    } else {
      deduct(user, active).then(() => {
        handleSubmitProduct();
      });
    }
    setPosting(false);
    setVisible(false);
  };

  const payment = () => {
    setVisible(true);
    setPosting(true);
    switch (active) {
      case 1:
        handleSubmitProduct();

        break;
      case 2:
        handleProcessPayment(600);

        break;
      case 3:
        handleProcessPayment(5000);
        break;
      case 4:
        handleProcessPayment(10000);
        break;
      default:
        handleSubmitProduct();
        break;
    }
  };

  const selectMedia = async (mediaType: string) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: mediaType == "photos" ? ["images"] : ["videos"],
      allowsEditing: true,
      quality: 1,
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      uploadImage(result.assets[0].uri, mediaType);
    }
  };

  const uploadImage = async (uri: string, type: string) => {
    setLoading(true);

    const filename = uri.split("/").pop();
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `products/${filename}`);

    await uploadBytesResumable(storageRef, blob);
    getDownloadURL(storageRef)
      .then(async (downloadURL) => {
        if (type == "photos") {
          setImages([...images, downloadURL]);
        } else {
          generateThumbnail(downloadURL).then(() => {
            setVideo(downloadURL);
          });
        }
      })
      .catch((e) => console.log(e))
      .finally(() => {
        setLoading(false);
      });
  };

  const modalContent = (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>
        How would you like to post this product?
      </Text>
      <View style={{ width: 300, marginVertical: 20, gap: 10 }}>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1.5,
            borderColor:
              active === 1 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(1)}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            No Promo
          </Text>
          <Text>Free</Text>
        </Pressable>
        <Pressable
          style={{
            gap: 10,
            padding: 10,
            borderWidth: 1.5,
            borderColor:
              active === 2 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(2)}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Promo Lite
          </Text>
          <Text style={{ color: Colors.grey }}>
            Get a 7 days boost, your ads will appear at the top of search
            results.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>7 days</Text>
            <Text>NGN 600</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            gap: 10,
            padding: 10,
            borderWidth: 1.5,
            borderColor:
              active === 3 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(3)}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Top Promo
          </Text>
          <Text style={{ color: Colors.grey }}>
            Best choice if you need a fast sale. Your add will be at the top of
            search results and get 15X more traffic.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>30 days</Text>
            <Text>NGN 5000</Text>
          </View>
        </Pressable>
        <Pressable
          style={{
            gap: 10,
            padding: 10,
            borderWidth: 1.5,
            borderColor:
              active === 4 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(4)}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Boost Premium Promo
          </Text>
          <Text style={{ color: Colors.grey }}>
            Best choice for our top plugs. All Top Promo features inclusive plus
            3 dats ads on all our social media platforms.
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text>3 months</Text>
            <Text>NGN 10000</Text>
          </View>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          marginBottom: 10,
        }}
      >
        <Button
          mode="outlined"
          contentStyle={{ paddingVertical: 10 }}
          labelStyle={{ fontSize: 18 }}
          onPress={() => setVisible(false)}
        >
          Cancel
        </Button>
        <Button
          mode="contained"
          contentStyle={{ paddingVertical: 10 }}
          labelStyle={{ fontSize: 18 }}
          onPress={() => payment()}
        >
          {posting ? "Please wait..." : "Proceed"}
        </Button>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Add Product" backButton />
      <GestureHandlerRootView>
        <BottomSheetModalProvider>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ margin: 10, gap: 30, paddingTop: 20 }}>
              <TextInput
                label="Name"
                mode="outlined"
                onChangeText={(value) => setName(value)}
              />

              <View
                style={{
                  borderBottomWidth: 1,
                  borderColor: "black",
                }}
              >
                <SectionedMultiSelect
                  items={shops}
                  IconRenderer={MaterialIcons}
                  uniqueKey="name"
                  single
                  subKey="subshops"
                  readOnlyHeadings
                  selectText={category}
                  colors={{
                    selectToggleTextColor: "black",
                    primary: Colors.light.primary,
                  }}
                  onSelectedItemsChange={(item) => setCategory(item[0])}
                />
              </View>
              <View style={{ flexDirection: "row", gap: 10 }}>
                {loading ? (
                  <UIActivityIndicator color={Colors.primary} />
                ) : (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "silver",
                      padding: 20,
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={40}
                      onPress={handlePresentModalPress}
                    />

                    <BottomSheetModal ref={bottomSheetModalRef}>
                      <BottomSheetView
                        style={{
                          height: 200,
                        }}
                      >
                        <Text style={{ textAlign: "center", marginBottom: 40 }}>
                          Choose media type
                        </Text>
                        <Button
                          mode="text"
                          labelStyle={{ fontSize: 20, marginLeft: 10 }}
                          onPress={() => selectMedia("photos")}
                        >
                          Photos
                        </Button>
                        <Button
                          mode="text"
                          labelStyle={{ fontSize: 20, marginLeft: 10 }}
                          onPress={() => selectMedia("videos")}
                        >
                          Videos
                        </Button>
                      </BottomSheetView>
                    </BottomSheetModal>
                  </View>
                )}
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={images}
                  renderItem={({ item }) => {
                    return (
                      <View
                        style={{
                          justifyContent: "center",
                          alignItems: "center",
                          marginRight: 10,
                        }}
                      >
                        <PhotosCard item={item} />
                      </View>
                    );
                  }}
                />
              </View>
              {image && (
                <Image
                  source={{ uri: image }}
                  style={{
                    width: 400,
                    height: 200,
                  }}
                />
              )}

              <Text style={{ color: "grey" }}>
                Only images less than 5mb are supported.
              </Text>

              <TextInput
                label="Description"
                mode="outlined"
                multiline
                numberOfLines={5}
                onChangeText={(value) => setDescription(value)}
              />

              <TextInput
                label="Price"
                keyboardType="numeric"
                mode="outlined"
                onChangeText={(value) => setPrice(value)}
              />
              <TextInput
                label="Location"
                defaultValue={
                  userLocation.length > 0
                    ? userLocation[0].regionName?.region
                    : user?.location?.regionName?.region
                }
                mode="outlined"
                onChangeText={(value) => setLocation(value)}
              />
            </View>
            {auth.currentUser ? (
              <View style={{ marginVertical: 10 }}>
                <CustomModal
                  content={modalContent}
                  triggerText="Post"
                  visible={visible}
                  setVisible={setVisible}
                  icon="cart"
                />
              </View>
            ) : (
              <Button
                disabled
                mode="contained"
                style={{ marginHorizontal: 20 }}
                labelStyle={{ paddingVertical: 10, color: Colors.grey }}
              >
                Please login to continue
              </Button>
            )}
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default add;
