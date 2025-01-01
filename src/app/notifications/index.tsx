import { StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Text, Switch } from "react-native-paper";

import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import FancyHeader from "@/src/components/FancyHeader";

const notifications = () => {
  const router = useRouter();
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
  };

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Notifications" backButton />

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
