import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Switch } from "react-native-paper";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const notifications = () => {
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          Notifications
        </Text>
      </LinearGradient>

      <View
        style={{
          margin: 16,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Text>Recieve Push Notifications</Text>
        <Switch value={isSwitchOn} onValueChange={switchTheme} />
      </View>
    </View>
  );
};

export default notifications;

const styles = StyleSheet.create({});
