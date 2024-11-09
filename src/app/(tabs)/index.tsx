import CategoryCard from "@/src/components/CategoryCard";
import FloatingButton from "@/src/components/FloatingButton";
import { Colors } from "@/src/constants/Colors";
import {
  useCategoryStore,
  useChatStore,
  useLocationStore,
  useShopsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { createQueryString, getUsers } from "@/src/utils/data";
import { auth } from "@/src/utils/firebaseConfig";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { FlatGrid, SectionGrid } from "react-native-super-grid";

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
              width: "80%",
              height: 40,
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
            style={{ position: "absolute", left: 10, top: 10 }}
          />
        </View>
      </LinearGradient>

      <SectionGrid
        style={{ margin: 10 }}
        itemDimension={63}
        sections={[
          {
            title: "Services",
            data: topCategories,
          },
          {
            title: "Market Place",
            data: topShops,
          },
        ]}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: item.subshops
                ? `/shop/[id]`
                : `/service/providers/[id]`,
              params: { id: item._id },
            }}
            asChild
          >
            <TouchableOpacity>
              <CategoryCard category={item} />
            </TouchableOpacity>
          </Link>
        )}
        renderSectionHeader={({ section }) => (
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
              {section.title}
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
        )}
      />

      <FloatingButton />
    </SafeAreaView>
  );
};

export default Home;
