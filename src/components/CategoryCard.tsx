import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const CategoryCard = ({ category }: DocumentData) => {
  return (
    <View
      style={{
        borderRadius: 10,
        shadowRadius: 4,
        backgroundColor: "white",
        shadowColor: "black",
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: -20 },

        elevation: 5,
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
