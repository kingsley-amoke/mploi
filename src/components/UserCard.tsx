import { DocumentData } from "firebase/firestore";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { Colors } from "../constants/Colors";
import { useRouter } from "expo-router";

const UserCard = ({ user }: { user: DocumentData }) => {
  const router = useRouter();

  return (
    <Card style={{ paddingVertical: 10, margin: 10 }}>
      <Card.Cover source={{ uri: user.image }} resizeMode="contain" />
      <Card.Content
        style={{
          marginVertical: 10,
          justifyContent: "space-between",
          marginHorizontal: 10,
        }}
      >
        <View style={{ marginBottom: 10 }}>
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
        <View style={{ flexDirection: "row", gap: 10 }}>
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
            onPress={() => router.push(`/service/${user._id}`)}
          >
            Hire
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default UserCard;
