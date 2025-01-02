import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const CategoryCard = ({ category }: DocumentData) => {
  return (
    <View
      style={{
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        height: 75,
        width: 69,
      }}
    >
      <View style={{ minHeight: "50%" }}>
        <MaterialCommunityIcons
          name={category?.icon}
          size={30}
          color={category?.color}
        />
      </View>

      <Text style={{ fontSize: 10, textAlign: "center" }}>
        {category?.name}
      </Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
