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
import { createQueryString, getUsers } from "@/src/utils/data";
import { auth } from "@/src/utils/firebaseConfig";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";

const Home = () => {
  const { users, storeUsers } = useUsersStore();
  const { user, storeUser } = useUserStore();
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

  const filteredCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const topCategories = filteredCategories.slice(0, 15);
  const topShops = shops.slice(0, 15);

  const handleSubmitSearch = ({
    nativeEvent: { key },
  }: {
    nativeEvent: { key: string };
  }) => {
    if (key === "Enter" && search !== "") {
      router.push(`/search?${createQueryString("search", search)}`);
    }
  };

  useLayoutEffect(() => {
    getUsers().then((users) => {
      storeUsers(users);

      const user = users.find((usr) => usr._id === auth.currentUser?.uid)!;
      storeUser(user);
      if (user?.suspended) {
        router.replace("/suspended");
      }
    });
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
            <Text
              style={{
                fontWeight: "bold",
                color: "white",
                textTransform: "capitalize",
                fontSize: 18,
              }}
            >
              Hi {auth.currentUser ? user?.lastName : "Anonymous"}
            </Text>
            <Text style={{ color: "white" }}>
              <MaterialIcons name="location-pin" color="white" />
              {location}
            </Text>
          </TouchableOpacity>
          <MaterialIcons
            name="person"
            size={30}
            color="white"
            onPress={() =>
              router.push(auth.currentUser ? "/profile" : "/login")
            }
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
            onKeyPress={handleSubmitSearch}
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
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 10 }}
            onPress={() => router.push("/service")}
          >
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
          </TouchableOpacity>
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
                    pathname: `/service/providers/[id]`,
                    params: { id: category._id },
                  }}
                  key={index}
                  asChild
                >
                  <TouchableOpacity>
                    <CategoryCard category={category} />
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
          <TouchableOpacity
            style={{ flexDirection: "row", gap: 10 }}
            onPress={() => router.push("/shop")}
          >
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
          </TouchableOpacity>
        </View>

        <View>
          {topShops.length > 0 && (
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
              {topShops.map((shop, index) => (
                <Link
                  href={{
                    pathname: `/shop/[id]`,
                    params: { id: shop._id },
                  }}
                  key={index}
                  asChild
                >
                  <TouchableOpacity>
                    <CategoryCard category={shop} />
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

export default Home;
