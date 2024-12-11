import React, {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from "react";

// import { Button, Switch, Text } from "react-native-paper";
import { View, Text, Button, ScrollView } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { addDoc, doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

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

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  // const handleSheetChanges = useCallback((index: number) => {}, []);

  useEffect(() => {
    // getNotification();
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

      {/* <View
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
        </View> */}
      <GestureHandlerRootView
        style={{
          flex: 1,
          padding: 24,
          justifyContent: "center",
        }}
      >
        <BottomSheetModalProvider>
          <Button onPress={handlePresentModalPress} title="Present" />
          <BottomSheetModal ref={bottomSheetModalRef}>
            <BottomSheetView
              style={{
                flex: 1,
                alignItems: "center",
              }}
            >
              <Text>Awesome 🎉</Text>
            </BottomSheetView>
          </BottomSheetModal>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </View>
  );
}
