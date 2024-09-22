import { StyleSheet, Platform, View } from "react-native";
import { Tabs, useRouter } from "expo-router";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useLocationStore, useUserStore } from "@/src/state/store";
import { Text } from "react-native-paper";

const TabLayout = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const { location: userLocation } = useLocationStore();

  const location =
    userLocation[0]?.regionName.subregion +
      ", " +
      userLocation[0]?.regionName.city || "Loading...";

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
        name="home"
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={20} color={color} />
          ),
          header: () => (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginVertical: 20,
                marginHorizontal: 20,
                paddingTop: 20,
              }}
            >
              <View>
                <Text style={{ fontWeight: "bold", marginLeft: 20 }}>
                  Hi {user.lastName}
                </Text>
                <Text>
                  {" "}
                  <MaterialIcons name="location-pin" /> {location}
                </Text>
              </View>
              <MaterialIcons
                name="person"
                size={20}
                onPress={() => router.push("/profile")}
              />
            </View>
          ),
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
          title: "Career",
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
        name="shop"
        options={{
          title: "Shop",
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
