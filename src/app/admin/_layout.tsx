import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Stack, useRouter } from "expo-router";

export default function Layout() {
  const router = useRouter();

  const exit = () => {
    router.replace("/");
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer>
        <Drawer.Screen
          name="index" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Users",
            drawerIcon: () => (
              <MaterialCommunityIcons name="account-group-outline" size={30} />
            ),
            title: "Admin Dashboard",
            headerRight: () => (
              <MaterialCommunityIcons
                name="exit-to-app"
                size={30}
                style={{ marginRight: 15 }}
                onPress={() => exit()}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="products" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Products",
            drawerIcon: () => (
              <MaterialCommunityIcons name="shopping-outline" size={30} />
            ),
            title: "Admin Dashboard",
            headerRight: () => (
              <MaterialCommunityIcons
                name="exit-to-app"
                size={30}
                style={{ marginRight: 15 }}
                onPress={() => exit()}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="careers" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "Jobs",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="briefcase-account-outline"
                size={30}
              />
            ),
            title: "Admin Dashboard",
            headerRight: () => (
              <MaterialCommunityIcons
                name="exit-to-app"
                size={30}
                style={{ marginRight: 15 }}
                onPress={() => exit()}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="cvs" // This is the name of the page and must match the url from root
          options={{
            drawerLabel: "CV Reviews",
            drawerIcon: () => (
              <MaterialCommunityIcons
                name="file-document-multiple-outline"
                size={30}
              />
            ),
            title: "Admin Dashboard",
            headerRight: () => (
              <MaterialCommunityIcons
                name="exit-to-app"
                size={20}
                style={{ marginRight: 15 }}
                onPress={() => exit()}
              />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
}
