import { StyleSheet, useColorScheme, View } from "react-native";
import React from "react";
import { router, Stack } from "expo-router";
import { Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import useTheme from "@/src/hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const PublicLayout = () => {
  const colorScheme = useColorScheme();

  const bgColor =
    colorScheme === "dark" ? Colors.dark.primary : Colors.light.primary;

  return (
    <>
      <StatusBar style="light" />
      <Stack>
        <Stack.Screen
          name="login"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
};

export default PublicLayout;
