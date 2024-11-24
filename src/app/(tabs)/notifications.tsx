import React, { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button, Switch, Text } from "react-native-paper";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";

export default function Shop() {
  const [notificationStatus, setNotificationStatus] = useState(false);

  // const getNotification = async () => {
  //   Notifications.getPermissionsAsync().then((status) => {
  //     setNotificationStatus(status.status);
  //   });
  // };

  // const requestPermission = async () => {
  //   if (notificationStatus === "granted") {
  //     setNotificationStatus("denied");
  //     return;
  //   }
  //   Notifications.requestPermissionsAsync({}).then((data) => {
  //     getNotification();
  //   });
  // };

  useEffect(() => {
    // getNotification();
  }, [notificationStatus]);

  // const shopData = {
  //   _id: Date.now(),
  //   name: "Food Stuffs",
  //   color: "#31c4a0",
  //   icon: "fish",
  //   subshops: [
  //     {
  //       name: "Garri",
  //     },
  //     {
  //       name: "Rice",
  //     },
  //     {
  //       name: "Beans",
  //     },
  //     {
  //       name: "Corn",
  //     },
  //     {
  //       name: "Yam",
  //     },
  //     {
  //       name: "Plantain",
  //     },
  //     {
  //       name: "Beef",
  //     },
  //     {
  //       name: "Chicken",
  //     },
  //     {
  //       name: "Pork",
  //     },
  //     {
  //       name: "Fish",
  //     },
  //     {
  //       name: "Stockfish",
  //     },
  //     {
  //       name: "Crayfish",
  //     },
  //   ],
  // };

  // const shopRef = doc(firestoreDB, "shop", shopData._id.toString());

  // const addShop = () => {
  //   setDoc(shopRef, shopData).then(() => {
  //     console.log("done");
  //   });
  // };

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
            margin: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>Allow Notifications?</Text>

          <Switch
            value={notificationStatus}
            onValueChange={() => setNotificationStatus(!notificationStatus)}
            color={Colors.primary}
          />
        </View>
        {/* <Button icon="plus" onPress={addShop}>
          Add
        </Button> */}
      </ScrollView>
    </View>
  );
}
