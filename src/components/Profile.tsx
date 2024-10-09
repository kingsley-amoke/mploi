import {
  ScrollView,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { Avatar, SegmentedButtons, Text } from "react-native-paper";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/src/constants/Colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import UserPhotos from "./UserPhotos";
import AboutUser from "./AboutUser";
import BookService from "./BookService";
import { useRouter } from "expo-router";
import {
  useChatStore,
  useImageStore,
  useReviewsStore,
  useUserStore,
} from "../state/store";
import Reviews from "./Reviews";
import { averageRating } from "../utils/data";
import { firestoreDB, storage } from "../utils/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { getBlobFroUri } from "../utils/data";

const Profile = ({ user }: { user: DocumentData | null }) => {
  if (!user) return;

  const router = useRouter();
  const colorScheme = useColorScheme();
  const { updateImage } = useImageStore();
  const { reviews } = useReviewsStore();
  const { user: loggedUser, storeUser } = useUserStore();
  const { chats } = useChatStore();

  const [value, setValue] = useState("about");
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState("");

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const userReviews = reviews.filter((review) => review.productID === user._id);

  const engagements = chats.filter(
    (c) => c.serviceProvider._id === user._id || c.client._id === user._id
  ).length;

  //view image fullscreen

  const handleViewImage = () => {
    updateImage(user?.image);
    router.push(`/image`);
  };

  //upload image

  const handleProfileImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const imageBlob = await getBlobFroUri(result.assets[0].uri);

      if (!imageBlob) return;

      const filename = result.assets[0].uri.split("/").pop();

      const storageRef = ref(storage, `images/${filename}`);
      const userRef = doc(firestoreDB, "users", user?._id.toString()!);
      setLoading(true);

      uploadBytes(storageRef, imageBlob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (url) => {
              setProfileImage(url);
              updateDoc(userRef, { image: url }).then(async () => {
                const user = await getDoc(userRef);

                storeUser(user.data()!);
                setLoading(false);
              });
            }
          );
        })
        .catch((error) => {
          console.log("Upload failed!", error);
          setLoading(false);
        });
    }
  };

  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity
          onPress={() => handleViewImage()}
          style={{ position: "relative" }}
        >
          <Avatar.Image
            size={60}
            source={{ uri: loading ? profileImage : user?.image }}
          />
        </TouchableOpacity>
        {loggedUser._id === user._id && (
          <MaterialCommunityIcons
            name="upload"
            size={30}
            style={{
              position: "absolute",
              bottom: -4,
              color: Colors.light.primary,
            }}
            onPress={handleProfileImageSelection}
          />
        )}
        <View>
          <View>
            {user?.status?.isVerified ? (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <Text>VIP</Text>
                <Ionicons
                  name="checkmark"
                  size={15}
                  style={{ color: iconColor, padding: 2 }}
                />
              </View>
            ) : (
              <View
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >
                <Text>Free</Text>
                <Ionicons
                  name="close"
                  size={15}
                  style={{ color: iconColor, padding: 2 }}
                />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="location" color={iconColor} />
            <Text>
              {user?.location?.regionName?.city +
                ", " +
                user?.location?.regionName?.country}
            </Text>
          </View>
        </View>
        {/* <View
          style={{
            borderRightColor: borderColor,
            borderWidth: 1,
            height: 30,
            marginTop: 10,
          }}
        /> */}
        {/* <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <Text style={{ fontSize: 12, flexWrap: "wrap" }}>
            {user?.skills ? user?.skills[0] : "Client"}
          </Text>
        </View> */}
      </View>
      <ScrollView showsHorizontalScrollIndicator={false}>
        <View
          style={{
            borderColor: borderColor,
            borderWidth: 1,
            borderRadius: 10,
            marginVertical: 20,
            padding: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <View style={{ alignItems: "center" }}>
            <Text>Engagements</Text>
            <Text>{engagements}</Text>
          </View>
          <View style={{ borderRightColor: borderColor, borderWidth: 1 }} />
          <View style={{ alignItems: "center" }}>
            <Text>Customer Ratings</Text>
            <Text>
              {averageRating(userReviews)}/{userReviews.length}
            </Text>
          </View>
        </View>
        {loggedUser._id !== user._id && <BookService user={user} />}

        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              value: "about",
              label: "About ",
            },
            {
              value: "photos",
              label: "Photos",
            },
            {
              value: "reviews",
              label: "Reviews",
            },
          ]}
          density="medium"
        />
        {value === "about" ? (
          <View>
            <AboutUser user={user} />
          </View>
        ) : value === "photos" ? (
          <View style={{ flex: 1 }}>
            <UserPhotos user={user} />
          </View>
        ) : (
          <Reviews itemID={user._id} item="user" />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
