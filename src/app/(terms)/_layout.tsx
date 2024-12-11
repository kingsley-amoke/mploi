import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";

const TermsLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerTitleAlign: "left",
        headerTransparent: false,
        headerTitleStyle: { fontSize: 14 },
      }}
    >
      <Stack.Screen
        name="about"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="disclaimer"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="terms-policy"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default TermsLayout;
