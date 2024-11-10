import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const CategoryCard = ({ category }: DocumentData) => {
  return (
    <View
      style={{
        borderWidth: 1,
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
        {category?.name.split(" ")[0]}
      </Text>
    </View>
  );
};

export default CategoryCard;

const styles = StyleSheet.create({});
