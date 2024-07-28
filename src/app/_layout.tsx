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
  useUsersStore,
  useUserStore,
} from "../state/store";
import { fetchUser, getLoggedUser } from "../utils/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Feather } from "@expo/vector-icons";
import { firestoreDB, realtimeDB } from "../utils/firebaseConfig";
import { getJobs, getServices, getUser, getUsers } from "../utils/data";
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
  const { colorScheme } = useTheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const paperTheme =
    colorScheme === "dark" ? CombinedDarkTheme : CombinedDefaultTheme;

  const { storeUser } = useUserStore();
  const { storeUsers } = useUsersStore();
  const { storeJobs } = useJobsStore();
  const { storeCategory } = useCategoryStore();
  const { storeChats } = useChatStore();
  const { storeNotifications } = useNotificationStore();

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

  // const fetchNotifications = async () => {
  //   const notifications = await fetchAllNotifications();
  //   storeNotifications(notifications);
  // };

  // const fetchAllUsers = async () => {
  //   const users = await fetchUsers();
  //   storeUsers(users);
  // }

  const fetchAllJobs = async () => {
    const jobs = await getJobs();
    storeJobs(jobs);
  }

  useLayoutEffect(() => {
    checkLocalUser();
    fetchServices();
    fetchAllChats()
    // fetchNotifications()
    fetchAllUsers()
    fetchAllJobs()
  }, []);

  return (
    <PaperProvider theme={paperTheme}>
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
            }}
          />
           <Stack.Screen
            name="admin/jobs"
            options={{
              headerShown: false
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
              title: "My Profile",
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
        </Stack>
      </ThemeProvider>
      <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
    </PaperProvider>
  );
}
