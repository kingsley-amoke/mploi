import { StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import CustomHeader from "@/src/components/CustomHeader";
import { useUserStore } from "@/src/state/store";

const TabLayout = () => {

    const {user} = useUserStore();
  return (
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: Platform.OS === 'android' ? { height: 70  } : { height:100 },
        tabBarLabelStyle: { marginBottom: 10, fontSize: 14 },
        tabBarIconStyle: { fontSize: 40 },
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",

          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={size} color={color} />
          ),

          header: () => <CustomHeader title={`Hello ${user ? user?.firstName : 'MPLOir'}!`} />,
        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="career"
        options={{
          title: "Career",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-clock-outline"
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
