import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "expo-router";
import { createQueryString } from "../utils/data";

const SubShop = ({ subshop }: DocumentData) => {
  const router = useRouter();

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity
        onPress={() =>
          router.push(
            `/products?${createQueryString("category", subshop?.name)}`
          )
        }
      >
        <Text style={{ fontSize: 18, fontWeight: "500" }}>{subshop?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SubShop;

const styles = StyleSheet.create({});
