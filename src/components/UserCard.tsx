import { DocumentData } from "firebase/firestore";
import React from "react";
import { Card, Text } from "react-native-paper";

const UserCard = ({ user }: { user: DocumentData }) => (
  <Card style={{ height: 200 }}>
    <Card.Cover source={{ uri: user.image }} style={{ height: 100 }} />
    <Card.Content style={{ marginVertical: 10 }}>
      <Text
        variant="titleLarge"
        style={{
          fontWeight: "bold",
          fontSize: 16,
          textTransform: "capitalize",
        }}
      >
        {user.firstName} {user.lastName[0]}
      </Text>
      <Text variant="bodyMedium" style={{ fontSize: 12, fontStyle: "italic" }}>
        {user.skills[0]}
      </Text>
      <Text style={{ fontSize: 10 }}>{user.location.subregion}</Text>
    </Card.Content>
  </Card>
);

export default UserCard;
