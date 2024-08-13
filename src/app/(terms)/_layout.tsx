import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/src/constants/Colors";

const TermsLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="about"
        options={{
          headerTitle: "About MPLOi",
        }}
      />
      <Stack.Screen
        name="disclaimer"
        options={{
          headerTitle: "Disclaimer",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerTitle: "Privacy Policy",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="terms-policy"
        options={{
          headerTitle: "Terms & Conditions",
          headerTitleAlign: "center",
        }}
      />
    </Stack>
  );
};

export default TermsLayout;
