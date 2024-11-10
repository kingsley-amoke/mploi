import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Switch, Text } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import * as Notifications from "expo-notifications";

export default function Shop() {
  const [notificationStatus, setNotificationStatus] = useState("denied");

  const getNotification = async () => {
    Notifications.getPermissionsAsync().then((status) => {
      setNotificationStatus(status.status);
    });
  };

  const requestPermission = async () => {
    if (notificationStatus === "granted") {
      setNotificationStatus("denied");
      return;
    }
    Notifications.requestPermissionsAsync({}).then((data) => {
      console.log(data);
      getNotification();
    });
  };

  useEffect(() => {
    getNotification();
  }, [notificationStatus]);

  return (
    <View
      style={{
        flex: 1,
      }}
    >
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
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            itemsAlign: "center",
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Allow Notifications?</Text>

          <Switch
            value={notificationStatus === "granted" ? true : false}
            onValueChange={() => requestPermission()}
            color={Colors.primary}
          />
        </View>
      </ScrollView>
    </View>
  );
}
