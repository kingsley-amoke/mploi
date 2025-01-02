import { StyleSheet, Platform, View } from "react-native";
import { Tabs } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { useEffect, useState } from "react";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const TabLayout = () => {
  const [unReadChats, setUnreadChats] = useState(0);

  useEffect(() => {
    if (!auth.currentUser) return;

    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, "chats"),
        where("isRead", "==", false),
        where("serviceProviderId", "==", auth.currentUser.uid)
      ),
      (snapshot) => {
        setUnreadChats(snapshot.docs.length);
      }
    );

    return () => unsubscribe();
  }, []);
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        tabBarStyle:
          Platform.OS === "android"
            ? { height: 70, padding: 10 }
            : { height: 100 },
        tabBarLabelStyle: { fontSize: 14, marginBottom: 5 },

        headerTransparent: false,
        headerTitleStyle: { fontSize: 14, marginTop: 10 },
        headerStatusBarHeight: 14,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={30}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          tabBarLabel: "Chats",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <View>
              <MaterialCommunityIcons
                name="message-outline"
                size={30}
                color={color}
              />
              {unReadChats > 0 && (
                <Badge style={{ position: "absolute", right: -2, top: -5 }}>
                  {unReadChats}
                </Badge>
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="career"
        options={{
          tabBarLabel: "Jobs",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-clock-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          tabBarLabel: "Wallet",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="wallet-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarLabel: "Settings",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={30} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
