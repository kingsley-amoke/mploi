import { ScrollView, View, TouchableOpacity  } from "react-native";
import {
  Avatar,
  SegmentedButtons,
  Text,
} from "react-native-paper";
import React, { useState } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "@/src/hooks/useTheme";
import { Colors } from "@/src/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";
import UserPhotos from "./UserPhotos";
import AboutUser from "./AboutUser";
import BookService from "./BookService";
import { useRouter } from "expo-router";
import { useImageStore } from "../state/store";

const Profile = ({ user }: { user: DocumentData | null }) => {
  if(!user) return;

  const router = useRouter();
  const { colorScheme } = useTheme();
  const {updateImage} = useImageStore();

  const [value, setValue] = useState("about");

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;



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
                  style={{ color: "white", padding: 2 }}
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
                  style={{ color: "white", padding: 2 }}
                />
              </View>
            )}
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Ionicons name="location" color={iconColor} />
            <Text>{user?.location?.lga}</Text>
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
          <Text>4/5</Text>
        </View>
      </View>
      <BookService user={user}/>
      <ScrollView>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
                      
              value: "about",
              label: "About",
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
          <View>
            <Text>Reviews</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
