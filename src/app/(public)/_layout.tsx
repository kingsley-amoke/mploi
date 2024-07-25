import { StyleSheet, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import useTheme from "@/src/hooks/useTheme";

const PublicLayout = () => {
  // const imageUrl = user?.user?.externalAccounts[0].imageUrl!;

  // const router = useRouter();

  const { colorScheme } = useTheme();

  const bgColor =
    colorScheme === "dark" ? Colors.dark.shadow : Colors.light.primary;

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          header: () => (
            <View
              style={{
                backgroundColor: bgColor,
                height: 200,
                justifyContent: "center",
                alignItems: "center",
                borderBottomRightRadius: 100,
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
              }}
            >
              <Text style={{fontSize: 30, fontWeight: "bold", marginTop:10}}> MPLOi</Text>
            </View>
          ),
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          header: () => (
            <View style={{backgroundColor: bgColor,
              height: 200,
              justifyContent: "center",
              alignItems: "center",
              borderBottomRightRadius: 100,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,}}>
              <Text style={{ fontSize: 30, fontWeight: "bold", marginTop:10 }}> MPLOi</Text>
            </View>
          ),
        }}
      />
    </Stack>
  );
};

export default PublicLayout;