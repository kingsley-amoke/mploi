import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "expo-router";

const Shop = ({ shop }: DocumentData) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => router.push(`/shop/${shop._id}`)}
    >
      <Text style={{ fontSize: 18, fontWeight: "500" }}>{shop?.name}</Text>
    </TouchableOpacity>
  );
};

export default Shop;

const styles = StyleSheet.create({});
