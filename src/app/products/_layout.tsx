import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProductLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="add"
        options={{
          title: "Add Product",
        }}
      />
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default ProductLayout;

const styles = StyleSheet.create({});