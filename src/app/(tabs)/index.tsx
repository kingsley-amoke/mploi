import Categories from "@/src/components/Categories";
import CategoryCard from "@/src/components/CategoryCard";
import FloatingButton from "@/src/components/FloatingButton";
import UserCard from "@/src/components/UserCard";
import { Colors } from "@/src/constants/Colors";
import {
  useCategoryStore,
  useChatStore,
  useLocationStore,
  useProductsStore,
  useShopsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { CustomToast, formatPrice, shopAvatar } from "@/src/utils/data";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Text,
  ActivityIndicator,
  Card,
  Button,
  TextInput,
} from "react-native-paper";

const Home = () => {
  const { users } = useUsersStore();
  const { user } = useUserStore();
  const { chats } = useChatStore();
  const { categories } = useCategoryStore();
  const { shops } = useShopsStore();
  const router = useRouter();

  const { location: userLocation } = useLocationStore();

  const [search, setSearch] = useState("");

  const location =
    userLocation[0]?.regionName.subregion +
      ", " +
      userLocation[0]?.regionName.city || "Loading...";

  const serviceProviderChats = chats.map((c) => c.serviceProvider._id);

  const topUsers = users.filter((usr) => {
    return serviceProviderChats.includes(usr._id) && usr.skills?.length > 0;
  });

  const topCategories = categories.splice(0, 10);

  useEffect(() => {
    if (user.suspended) {
      router.replace("/suspended");
    }
  }, [user]);

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 200,
          paddingHorizontal: 20,
          borderBottomRightRadius: 120,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginVertical: 20,
            paddingTop: 20,
          }}
        >
          <TouchableOpacity onPress={() => router.push("/profile/edit")}>
            <Text style={{ fontWeight: "bold", color: "white" }}>
              Hi {user.lastName ? user.lastName : "Anonymous"}
            </Text>
            <Text style={{ color: "white" }}>
              <MaterialIcons name="location-pin" color="white" />
              {location}
            </Text>
          </TouchableOpacity>
          <MaterialIcons
            name="person"
            size={20}
            color="white"
            onPress={() => router.push(user._id ? "/profile" : "/login")}
          />
        </View>
        <Text
          style={{
            fontWeight: "bold",
            marginBottom: 10,
            color: "white",
          }}
        >
          What can we assist you with today?
        </Text>
        <View
          style={{
            position: "relative",
            width: "100%",
          }}
        >
          <TextInput
            mode="outlined"
            placeholder="Type what you are searching for here"
            style={{
              width: 350,
              height: 52,
              paddingLeft: 18,
              fontSize: 14,
            }}
            onChangeText={(value) => setSearch(value)}
          />
          <MaterialIcons
            name="search"
            size={20}
            color="black"
            style={{ position: "absolute", left: 10, top: 15 }}
          />
        </View>
      </LinearGradient>

      <View
        style={{ width: "100%", paddingHorizontal: 20, marginVertical: 20 }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "700",
              color: Colors.grey,
            }}
          >
            Services
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text
              style={{
                textAlign: "left",

                fontWeight: "700",
                color: Colors.grey,
              }}
            >
              See all
            </Text>
            <MaterialCommunityIcons name="arrow-right-box" size={20} />
          </View>
        </View>

        <View>
          {topCategories.length > 0 && (
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                flexDirection: "row",
                marginHorizontal: "auto",
                flexWrap: "wrap",
                gap: 15,
              }}
            >
              {topCategories.map((category, index) => (
                <Link
                  href={{
                    pathname: `/profile/[id]`,
                    params: { id: user._id },
                  }}
                  key={index}
                  asChild
                >
                  <TouchableOpacity style={{ width: "17%" }}>
                    <CategoryCard />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          )}
        </View>
      </View>

      <View
        style={{ width: "100%", paddingHorizontal: 20, marginVertical: 20 }}
      >
        <View
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            marginBottom: 10,
          }}
        >
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "700",
              color: Colors.grey,
            }}
          >
            Market Place
          </Text>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Text
              style={{
                textAlign: "left",

                fontWeight: "700",
                color: Colors.grey,
              }}
            >
              See all
            </Text>
            <MaterialCommunityIcons name="arrow-right-box" size={20} />
          </View>
        </View>

        <View>
          {shops.length > 0 && (
            <View
              style={{
                width: "100%",
                marginVertical: 10,
                flexDirection: "row",
                marginHorizontal: "auto",
                flexWrap: "wrap",
                gap: 15,
              }}
            >
              {shops.map((category, index) => (
                <Link
                  href={{
                    pathname: `/profile/[id]`,
                    params: { id: user._id },
                  }}
                  key={index}
                  asChild
                >
                  <TouchableOpacity style={{ width: "17%" }}>
                    <CategoryCard />
                  </TouchableOpacity>
                </Link>
              ))}
            </View>
          )}
        </View>
      </View>
      <FloatingButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Home;
