import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "react-native";
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
import { useLayoutEffect } from "react";
import {
  useCategoryStore,
  useChatStore,
  useJobsStore,
  useProductsStore,
  useRequestStore,
  useReviewsStore,
  useShopsStore,
  useTransactionsStore,
  useUsersStore,
} from "../state/store";
import { Feather } from "@expo/vector-icons";
import { realtimeDB } from "../utils/firebaseConfig";
import {
  getJobs,
  getProducts,
  getReviews,
  getServices,
  getShops,
  getTransactions,
  getUsers,
  transactions,
} from "../utils/data";
import { onValue, ref } from "firebase/database";
import { RootSiblingParent } from "react-native-root-siblings";

const customDarkTheme = { ...MD3DarkTheme, colors: Colors.dark };
const customLightTheme = { ...MD3LightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedDefaultTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

export default function RootLayout() {
  const colorScheme = useColorScheme();

  const router = useRouter();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const { storeUsers } = useUsersStore();
  const { storeJobs } = useJobsStore();
  const { storeCategory } = useCategoryStore();
  const { storeChats } = useChatStore();
  const { storeRequests } = useRequestStore();
  const { storeShops } = useShopsStore();
  const { storeProducts, storePromoted } = useProductsStore();
  const { storeReviews } = useReviewsStore();
  const {storeTransactions} = useTransactionsStore();

  const fetchAllUsers = async () => {
    getUsers().then((users) => {
      storeUsers(users);
    });
    getTransactions().then(transactions => {
      storeTransactions(transactions)
    })
  };

  const fetchServices = async () => {
    const categories = await getServices();
    storeCategory(categories);
  };

  const fetchShops = async () => {
    const shops = await getShops();
    storeShops(shops);
  };

  const fetchProducts = async () => {
    const products = await getProducts();
    const promo = products.filter(p => p.promo !== 'free')
    storeProducts(products);
    storePromoted(promo)
  };

  const fetchAllChats = () => {
    const chatRef = ref(realtimeDB, "chats/");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;
      const myData = Object.keys(data).map((key) => {
        return data[key];
      });

      storeChats(myData);
    });
  };

  const fetchAllRequests = async () => {
    const requestRef = ref(realtimeDB, "requests/");
    onValue(requestRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;
      const myData = Object.keys(data).map((key) => {
        return data[key];
      });

      storeRequests(myData);
    });
  };

  const fetchAllJobs = async () => {
    const jobs = await getJobs();
    storeJobs(jobs);
  };

  const fetchReviews = async () => {
    const reviews = await getReviews();
    storeReviews(reviews);
  };

  useLayoutEffect(() => {
    fetchServices();
    fetchAllChats();
    fetchAllRequests();
    fetchAllUsers();
    fetchAllJobs();
    fetchShops();
    fetchProducts();
    fetchReviews();
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
              name="index"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="admin/index"
              options={{
                title: "Admin Dashboard",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="admin/jobs"
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
              name="profile/edit"
              options={{
                title: "Edit Profile",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="profile/index"
              options={{
                title: "My Profile",
                headerTitleStyle: { fontSize: 14 },

                headerRight: () => (
                  <Feather
                    name="home"
                    size={20}
                    color={iconColor}
                    onPress={() => router.push("/home")}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="service/index"
              options={{
                title: "All Services",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="service/[id]"
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
                title: "Wallet",
                headerTitleAlign: "center",
              }}
            />
            <Stack.Screen
              name="suspended/index"
              options={{
                headerShown:false
              }}
            />
            <Stack.Screen
              name="rooms/[roomId]"
              
            />
          </Stack>
        </ThemeProvider>
      </PaperProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </RootSiblingParent>
  );
}
