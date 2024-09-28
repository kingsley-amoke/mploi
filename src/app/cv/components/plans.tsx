import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Card } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Plans = ({
  title,
  description,
  price,
  details = [],
}: {
  title: string;
  description: string;
  price: string;
  details: string[];
}) => {
  return (
    <Card>
      <Card.Content>
        <Card.Title
          title={title}
          titleStyle={{ textAlign: "center", fontWeight: "bold" }}
        />
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          {description}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          NGN {price}
        </Text>
        <Card.Actions
          style={{
            backgroundColor: Colors.light.primary,
          }}
        >
          <Text style={{ color: "white", marginRight: "40%" }}>Checkout</Text>
        </Card.Actions>
        <Card.Content
          style={{ marginVertical: 20, flexDirection: "column", gap: 10 }}
        >
          {details.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <MaterialCommunityIcons name="check" />
              <Text>{item}</Text>
            </View>
          ))}
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default Plans;

const styles = StyleSheet.create({});
