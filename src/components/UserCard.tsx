import { DocumentData } from "firebase/firestore";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";
import { auth } from "../utils/firebaseConfig";

import { createChat, CustomToast } from "../utils/data";

const UserCard = ({ user }: { user: DocumentData }) => {
  const router = useRouter();

  const handleCreateChat = () => {
    if (auth.currentUser) {
      createChat(auth.currentUser.uid, user._id);
      router.push(`/service/${user._id}`);
    } else {
      CustomToast("Please login to order services.");
    }
  };

  return (
    <Card style={{ margin: 5, position: "relative" }}>
      <Card.Cover source={{ uri: user.image }} resizeMode="contain" />
      {/* <Octicons
        name="dot-fill"
        color={user?.isOnline ? Colors.success : Colors.offline}
        size={30}
        style={{
          position: "absolute",
          bottom: -6,
          right: 8,
        }}
      /> */}
      <Card.Content
        style={{
          marginVertical: 5,
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginBottom: 5 }}>
          <Text
            variant="titleLarge"
            style={{
              fontWeight: "bold",
              fontSize: 16,
              textTransform: "capitalize",
            }}
          >
            {user.firstName} {user.lastName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              variant="bodyMedium"
              style={{
                fontSize: 12,
                fontStyle: "italic",
                flex: 1,
                flexWrap: "wrap",
              }}
            >
              {user?.skills ? user.skills[0] : "Client"}
            </Text>
          </View>
          <Text style={{ fontSize: 10 }}>
            {user?.location?.regionName?.city}
          </Text>
        </View>
        <View style={{ gap: 10 }}>
          <Button
            mode="contained"
            icon="eye"
            buttonColor={Colors.secondary}
            onPress={() => router.push(`/profile/${user._id}`)}
          >
            View
          </Button>
          <Button
            mode="contained"
            icon="book"
            onPress={
              auth.currentUser?.uid
                ? () => handleCreateChat()
                : () => router.push(`/login`)
            }
          >
            Hire
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
