import { ScrollView, View, TouchableOpacity, useColorScheme  } from "react-native";
import {
  Avatar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "@/src/constants/Colors";
import {Ionicons} from "@expo/vector-icons";
import {DocumentData } from "firebase/firestore";
import UserPhotos from "./UserPhotos";
import AboutUser from "./AboutUser";
import BookService from "./BookService";
import { useRouter } from "expo-router";
import { useImageStore, useReviewsStore } from "../state/store";
import Reviews from "./Reviews";
import { averageRating } from "../utils/data";

const Profile = ({ user }: { user: DocumentData | null }) => {
  if(!user) return;

  const router = useRouter();
  const colorScheme = useColorScheme();
  const {updateImage} = useImageStore();
  const { reviews} = useReviewsStore();

  const [value, setValue] = useState("about");

;
  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;


      const userReviews = reviews.filter(
        (review) => review.productID === user._id
      );

//view image fullscreen

const handleViewImage = () => {
  updateImage(user?.image);
  router.push(`/image`)
}


  return (
    <SafeAreaView style={{ margin: 10 }}>
      <View style={{ flexDirection: "row", gap: 20 }}>
        <TouchableOpacity onPress={() =>handleViewImage()}>
          <Avatar.Image size={60} source={{ uri: user?.image }} />
        </TouchableOpacity>
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
            <Text>{user?.location?.subregion}</Text>
          </View>
        </View>
        <View
          style={{
            borderRightColor: borderColor,
            borderWidth: 1,
            height: 30,
            marginTop: 10,
          }}
        />
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={{fontSize:12}}>{user?.skills[1]}</Text>
        </View>
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
          <Text>Total Jobs</Text>
          <Text>1</Text>
        </View>
        <View style={{ borderRightColor: borderColor, borderWidth: 1 }} />
        <View style={{ alignItems: "center" }}>
          <Text>Customer Ratings</Text>
          <Text>{averageRating(userReviews)}/{userReviews.length}</Text>
        </View>
      </View>
      <BookService user={user}/>
      
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
         density='medium'
        />
        {value === "about" ? (
          <View>

          <AboutUser user={user} />
          </View>
        ) : value === "photos" ? (
          <View>
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
