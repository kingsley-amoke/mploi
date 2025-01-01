import { Stack, useRouter } from "expo-router";
import { useColorScheme, View } from "react-native";
import {
  MD3DarkTheme,
  MD3LightTheme,
  PaperProvider,
  adaptNavigationTheme,
} from "react-native-paper";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";

import { Colors } from "../constants/Colors";
import { StatusBar } from "expo-status-bar";
import { useEffect, useLayoutEffect } from "react";
import {
  useCategoryStore,
  useJobsStore,
  useLocationStore,
  useProductsStore,
  useShopsStore,
  useUsersStore,
} from "../state/store";
import { firestoreDB, realtimeDB } from "../utils/firebaseConfig";
import {
  CustomToast,
  exitApp,
  getJobs,
  getServices,
  getShops,
} from "../utils/data";
import { RootSiblingParent } from "react-native-root-siblings";
import * as Location from "expo-location";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import React from "react";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  // registerNNPushToken(24745, "yN3hxcW8jdGFZ7rIZfHwHq");
  const colorScheme = useColorScheme();

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const { storeJobs } = useJobsStore();
  const { storeCategory } = useCategoryStore();

  const { storeShops } = useShopsStore();
  const { storeProducts } = useProductsStore();

  const { storeLocation } = useLocationStore();
  const { storeUsers } = useUsersStore();

  const getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status === "granted") {
      Location.getCurrentPositionAsync({})
        .then((data) => {
          const coordinates = {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
          };

          Location.reverseGeocodeAsync(coordinates).then((location) => {
            const locationData = {
              coordinates,
              regionName: location[0],
            };

            storeLocation(locationData);
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      CustomToast("Permission to access location was denied");
      exitApp();
    }
  };

  const fetchServices = async () => {
    const categories = await getServices();
    storeCategory(categories);
  };

  const fetchShops = async () => {
    const shops = await getShops();
    storeShops(shops);
  };

  const fetchProducts = () => {
    const unsubscribe = onSnapshot(
      collection(firestoreDB, "products"),
      (snapshot) => {
        const products = snapshot.docs.map((doc) => doc.data());
        storeProducts(products);
      }
    );

    return () => unsubscribe();
  };

  const fetchAllJobs = async () => {
    const jobs = await getJobs();
    storeJobs(jobs);
  };

  useEffect(() => {
    getLocation();
    fetchServices();
    fetchAllJobs();
    fetchShops();
    fetchProducts();

    const unsubscribe = onSnapshot(
      collection(firestoreDB, "users"),
      (snapshot) => {
        const cvs = snapshot.docs.map((doc) => doc.data());
        storeUsers(cvs);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <RootSiblingParent>
      <PaperProvider theme={paperTheme}>
        <ThemeProvider value={paperTheme}>
          <Stack
            screenOptions={{
              headerTitleAlign: "left",
              headerTransparent: false,
              headerTitleStyle: { fontSize: 14 },
            }}
          >
            <Stack.Screen
              name="(tabs)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(public)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="(terms)"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="admin"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="jobs"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="products"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="search/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="shop/index"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="shop/[id]"
              options={{
                headerShown: false,
              }}
            />

            <Stack.Screen
              name="portfolio/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile/edit"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="profile/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="service/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="service/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="service/providers/[id]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="service/requests"
              options={{
                title: "Service Requests",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="image/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="settings/index"
              options={{
                title: "Change Theme",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="wallet/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="wallet/fund"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="suspended/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="rooms/[roomId]"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="cv/index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="notifications/index"
              options={{
                headerShown: false,
              }}
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
      <StatusBar style="light" />
    </RootSiblingParent>
  );
}
