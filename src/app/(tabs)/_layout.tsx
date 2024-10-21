import { StyleSheet, Platform } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        tabBarStyle:
          Platform.OS === "android"
            ? { height: 50, padding: 10 }
            : { height: 100 },
        tabBarLabelStyle: { fontSize: 10, marginBottom: 5 },

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
            <MaterialCommunityIcons name="home" size={20} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="career"
        options={{
          title: "Jobs",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-clock"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: "Notifications",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={20} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
