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
            header: () => (
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  height: 200,
                  borderBottomRightRadius: 100,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={20}
                    color="white"
                    onPress={() => router.back()}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",

                      color: "white",
                    }}
                  >
                    MyPlug
                  </Text>
                </View>
              </LinearGradient>
            ),
          }}
        />
        <Stack.Screen
          name="register"
          options={{
            header: () => (
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  height: 200,
                  justifyContent: "center",

                  borderBottomRightRadius: 100,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignItems: "center",
                    paddingHorizontal: 20,
                  }}
                >
                  <MaterialCommunityIcons
                    name="arrow-left"
                    size={20}
                    color="white"
                    onPress={() => router.back()}
                  />
                  <Text
                    style={{
                      fontSize: 30,
                      fontWeight: "bold",

                      color: "white",
                    }}
                  >
                    MyPlug
                  </Text>
                </View>
              </LinearGradient>
            ),
          }}
        />
      </Stack>
    </>
  );
};

export default PublicLayout;
