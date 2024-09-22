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
      headerTitleStyle: {fontSize:14},

    }}
    >
      <Stack.Screen
        name="about"
        options={{
          headerTitle: "About MyPlug",
        }}
      />
      <Stack.Screen
        name="disclaimer"
        options={{
          headerTitle: "Disclaimer",
      
        }}
      />
      <Stack.Screen
        name="privacy"
        options={{
          headerTitle: "Privacy Policy",
 
        }}
      />
      <Stack.Screen
        name="terms-policy"
        options={{
          headerTitle: "Terms & Conditions",

        }}
      />
    </Stack>
  );
};

export default TermsLayout;
