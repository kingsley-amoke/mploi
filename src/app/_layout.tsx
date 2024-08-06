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
import useTheme from "../hooks/useTheme";
import { StatusBar } from "expo-status-bar";
import { useLayoutEffect } from "react";
import {
  useCategoryStore,
  useChatStore,
  useJobsStore,
  useNotificationStore,
  useProductsStore,
  useRequestStore,
  useReviewsStore,
  useShopsStore,
  useUsersStore,
  useUserStore,
} from "../state/store";
import { fetchUser, getLoggedUser } from "../utils/userActions";
import { Feather } from "@expo/vector-icons";
import { firestoreDB, realtimeDB } from "../utils/firebaseConfig";
import { getJobs, getProducts, getReviews, getServices, getShops, getUser, getUsers } from "../utils/data";
import { onValue, ref } from "firebase/database";

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

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const { storeUser } = useUserStore();
  const { storeUsers } = useUsersStore();
  const { storeJobs } = useJobsStore();
  const { storeCategory } = useCategoryStore();
  const { storeChats } = useChatStore();
  const {storeRequests} = useRequestStore();
  const { storeShops } = useShopsStore();
  const {storeProducts} = useProductsStore();
  const {storeReviews} = useReviewsStore();

  const router = useRouter();

  const checkLocalUser = async () => {
    const loggedUser = await getLoggedUser();
    if (loggedUser) {
    getUser(loggedUser._id).then((user) => {
      storeUser(user);
      router.replace("/");
    })
    } else {
      router.replace("/login");
    }
  };

  const fetchAllUsers = async () => {
   getUsers().then((users) => {
     storeUsers(users);
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
    storeProducts(products);
  };

  const fetchAllChats = ( ) => {
    const chatRef = ref(realtimeDB, 'chats/');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if(!data) return
      const myData = Object.keys(data).map(key => {
        return data[key];
    })

    storeChats(myData)
    });
  }

  const fetchAllRequests = async () => {
    const requestRef = ref(realtimeDB, "requests/");
    onValue(requestRef, (snapshot) => {
      const data = snapshot.val();

      if(!data) return
      const myData = Object.keys(data).map(key => {
        return data[key];
    })

    storeRequests(myData)
    });
  }


  const fetchAllJobs = async () => {
    const jobs = await getJobs();
    storeJobs(jobs);
  }


  const fetchReviews = async () => {
    const reviews = await getReviews();
    storeReviews(reviews);
  }

  useLayoutEffect(() => {
    checkLocalUser();
    fetchServices();
    fetchAllChats()
    fetchAllRequests()
    fetchAllUsers()
    fetchAllJobs()
    fetchShops()
    fetchProducts()
    fetchReviews()
  }, []);


  return (
    <PaperProvider theme={paperTheme}>
       <StatusBar style='light' />
      <ThemeProvider value={paperTheme}>
        <Stack>
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
            name="admin/index"
            options={{
              title: 'Admin Dashboard',
              headerTitleAlign:'center',
             headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white'
            }}
          />
           <Stack.Screen
            name="admin/jobs"
            options={{
              headerShown: false
            }}
          />
           <Stack.Screen
            name="products"
            options={{
              headerShown: false
            }}
          />

          <Stack.Screen
            name="profile/edit"
            options={{
              title: 'Edit Profile',
              headerTitleAlign:'center',
              headerStyle: {backgroundColor:Colors.light.primary},
              headerTintColor: 'white'
            }}
          />
          <Stack.Screen
            name="profile/index"
            options={{
              title: "My Profile",
               headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white',
              headerRight: () => (
                <Feather
                  name="edit"
                  size={30}
                  color={iconColor}
                  onPress={() => router.push("profile/edit")}
                />

              ),
            }}
          />
          <Stack.Screen
            name="service/index"
            options={{
              title: "All Services",
              headerTitleAlign:'center',
             headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white'
              
            }}
          />
          <Stack.Screen
            name="service/[id]"
            options={{
             headerShown:false
              
            }}
          />
           <Stack.Screen
            name="service/requests"
            options={{
              title: "Service Requests",
              headerTitleAlign:'center',
             headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white'
              
            }}
          />
           <Stack.Screen
            name="image/index"
            options={{
              headerShown:false
              
            }}
          />
          <Stack.Screen
            name="settings/index"
            options={{
             title: 'Change Theme',
             headerTitleAlign:'center',
             headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white'
              
            }}
          />
            <Stack.Screen
            name="wallet/index"
            options={{
             title: 'Wallet',
             headerTitleAlign:'center',
             headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white'
              
            }}
          />
        </Stack>
      </ThemeProvider>
     
    </PaperProvider>
  );
}
