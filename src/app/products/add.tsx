import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React, { useRef, useState, useCallback } from "react";
import { Button, Text, TextInput } from "react-native-paper";
import {
  useLocationStore,
  useShopsStore,
  useUserStore,
} from "@/src/state/store";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { ProductTypes } from "@/src/utils/types";
import { useRouter } from "expo-router";
import { CustomModal } from "@/src/components/CustomModal";
import { Colors } from "@/src/constants/Colors";
import { CustomToast, deduct } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "@/src/components/ProgressBar";
import PhotosCard from "@/src/components/PhotosCard";
import * as VideoThumbnails from "expo-video-thumbnails";

const add = () => {
  const router = useRouter();

  const { user } = useUserStore();
  const { shops } = useShopsStore();
  const { location: userLocation } = useLocationStore();
  // const { width, height } = Dimensions.get("window");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [category, setCategory] = useState("Select category");

  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);

  const [progress, setProgress] = useState(0);
  const [images, setImages] = useState([]);
  const [video, setVideo] = useState(
    "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
  );
  const [image, setImage] = useState<string | null>(null);

  const generateThumbnail = async () => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(video, {
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
    const promo =
      active === 2
        ? "7 days"
        : active === 3
        ? "30 days"
        : active === 4
        ? "3 months"
        : "free";

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
      videos: videos,
      sellerID: user?._id!,
      promo: promo,
    };

    const productRef = doc(firestoreDB, "products", data._id);
    setDoc(productRef, data).then(() => {
      router.push("/");
      setVisible(false);
      setPosting(false);
    });
  };

  const handleProcessPayment = (active: number) => {
    if (active > parseInt(user?.walletBalance)) {
      CustomToast("Please fund your wallet to continue.");
      setPosting(false);
    } else {
      // decreaseUserBalance(active);
      deduct(user, active).then(() => {
        handleSubmitProduct();
      });
    }
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
      mediaTypes:
        mediaType == "photos"
          ? ImagePicker.MediaTypeOptions.Images
          : ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      quality: 1,
    };

    result = await ImagePicker.launchImageLibraryAsync(options);

    if (!result.canceled) {
      uploadImage(result.assets[0].uri, mediaType);
    }
  };

  const uploadImage = async (uri: string, type: string) => {
    // const filename = new Date().getTime() + ".jpg";

    const filename = uri.split("/").pop();
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `products/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress));
      },
      (error) => {
        // handle error
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          if (type == "photos") {
            setImages([...images, downloadURL]);
          } else {
            setVideo(downloadURL);
            generateThumbnail();
          }
          setProgress(0);
        });
      }
    );
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
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 1 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(1)}
        >
          <Text
            style={{
              color: active === 1 ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            No Promo
          </Text>
          <Text style={{ color: active === 1 ? "white" : "black" }}>Free</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 2 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(2)}
        >
          <View>
            <Text
              style={{
                color: active === 2 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Promo Lite
            </Text>
            <Text
              style={{
                color: active === 2 ? "white" : "black",
              }}
            >
              7 days
            </Text>
          </View>
          <Text style={{ color: active === 2 ? "white" : "black" }}>
            NGN 600
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 3 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(3)}
        >
          <View>
            <Text
              style={{
                color: active === 3 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Top Promo
            </Text>
            <Text
              style={{
                color: active === 3 ? "white" : "black",
              }}
            >
              30 days
            </Text>
          </View>
          <Text style={{ color: active === 3 ? "white" : "black" }}>
            NGN 5000
          </Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 4 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(4)}
        >
          <View>
            <Text
              style={{
                color: active === 4 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Boost Premium Promo
            </Text>
            <Text
              style={{
                color: active === 4 ? "white" : "black",
              }}
            >
              3 months
            </Text>
          </View>
          <Text style={{ color: active === 4 ? "white" : "black" }}>
            NGN 10000
          </Text>
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
          onPress={payment}
        >
          {posting ? "Please wait..." : "Proceed"}
        </Button>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          Add Product
        </Text>
      </LinearGradient>
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
                <FlatList
                  showsHorizontalScrollIndicator={false}
                  horizontal
                  data={images}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <PhotosCard item={item} />
                    </View>
                  )}
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
              {progress > 0 ? (
                <ProgressBar progress={progress} barWidth={200} />
              ) : (
                <Text style={{ color: "grey" }}>
                  Only images less than 5mb are supported.
                </Text>
              )}
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

            <View style={{ marginVertical: 10 }}>
              <CustomModal
                content={modalContent}
                triggerText="Post"
                visible={visible}
                setVisible={setVisible}
                icon="cart"
              />
            </View>
          </ScrollView>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
};

export default add;

const styles = StyleSheet.create({});
