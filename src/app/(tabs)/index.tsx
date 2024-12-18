import CategoryCard from "@/src/components/CategoryCard";
import FloatingButton from "@/src/components/FloatingButton";
import { Colors } from "@/src/constants/Colors";
import {
  useCategoryStore,
  useLocationStore,
  useProductsStore,
  useShopsStore,
  useUsersStore,
} from "@/src/state/store";
import { createQueryString, formatPrice, shopAvatar } from "@/src/utils/data";
import { auth } from "@/src/utils/firebaseConfig";

import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";

import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import {
  ActivityIndicator,
  Divider,
  Text,
  TextInput,
} from "react-native-paper";
import { SectionGrid } from "react-native-super-grid";

const Home = () => {
  const { storeUsers, users } = useUsersStore();
  const { categories } = useCategoryStore();
  const { shops } = useShopsStore();
  const { products } = useProductsStore();
  const router = useRouter();
  const { location } = useLocationStore();

  const [search, setSearch] = useState("");

  const user = users.find((usr) => usr._id === auth.currentUser?.uid)!;
  if (user?.suspended) {
    router.replace("/suspended");
  }
  const userLocation =
    location.length > 0
      ? location[0]?.regionName.subregion +
          ", " +
          location[0]?.regionName.city || "Loading..."
      : user?.location?.regionName?.subregion +
        ", " +
        user?.location?.regionName?.city;

  const filteredCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const filteredShops = shops.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const topCategories = filteredCategories.slice(0, 15);
  const topShops = filteredShops.slice(0, 15);
  const promoted = products.filter((item) => item.promo != "free");

  const submitKey = {
    nativeEvent: { key: "Enter" },
  };

  const handleSubmitSearch = ({
    nativeEvent: { key },
  }: {
    nativeEvent: { key: string };
  }) => {
    console.log(key);
    if (key === "Enter" && search !== "") {
      router.push(`/search?${createQueryString("search", search)}`);
    }
  };

  const AdsArea = () => (
    <View style={{ marginHorizontal: 10 }}>
      <Text
        style={{
          textAlign: "left",
          fontSize: 20,
          fontWeight: "700",
          color: Colors.grey,
        }}
      >
        Trending
      </Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={promoted}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={{
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              marginVertical: 10,
              borderWidth: 1,
              borderColor: "grey",
              borderRadius: 6,
              marginRight: 10,
              height: 100,
              width: 250,
            }}
            onPress={() => router.push(`/products/${item._id}`)}
          >
            <View style={{ width: "40%", height: "100%" }}>
              <Image
                source={{ uri: item.images[0] || shopAvatar }}
                height={98}
                style={{ borderTopLeftRadius: 6, borderBottomLeftRadius: 6 }}
              />
            </View>
            <View
              style={{
                width: "60%",
                height: "100%",
                padding: 3,
                paddingLeft: 5,
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  textTransform: "capitalize",
                }}
              >
                {item.name.slice(0, 14)}
              </Text>
              <Text>{item.location}</Text>
              <Divider bold />
              <Text style={{ fontSize: 12 }}>{item.category}</Text>
              <Text style={{ fontWeight: "bold", fontSize: 12 }}>
                {formatPrice(item.price)}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );

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
          <TouchableOpacity
            onPress={() =>
              router.push(auth.currentUser ? "/profile/edit" : "/")
            }
          >
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
            <Text style={{ color: "silver" }}>
              {/* <MaterialIcons name="location-pin" color="white" /> */}
              {userLocation}
            </Text>
          </TouchableOpacity>
          <MaterialIcons
            name={auth.currentUser ? "person" : "login"}
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
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
          }}
        >
          <TextInput
            mode="outlined"
            placeholder="Type what you are searching for here"
            style={{
              width: "74%",
              height: 40,

              fontSize: 14,
            }}
            onChangeText={(value) => setSearch(value)}
            onKeyPress={handleSubmitSearch}
          />
          <MaterialIcons
            name="search"
            size={30}
            color="white"
            onPress={() => handleSubmitSearch(submitKey)}
          />
        </View>
      </LinearGradient>
      {filteredShops.length > 0 ? (
        <ScrollView>
          <SectionGrid
            showsVerticalScrollIndicator={false}
            style={{ margin: 10, marginBottom: 20 }}
            itemDimension={63}
            scrollEnabled={false}
            sections={[
              {
                title: "Services",
                data: topCategories,
              },
            ]}
            renderItem={({ item }) => {
              return (
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
              );
            }}
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
                  onPress={
                    section.title != "Services"
                      ? () => router.push("/shop")
                      : () => router.push("/service")
                  }
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
          <AdsArea />
          <SectionGrid
            showsVerticalScrollIndicator={false}
            style={{ margin: 10 }}
            itemDimension={63}
            scrollEnabled={false}
            sections={[
              {
                title: "Market Place",
                data: topShops,
              },
            ]}
            renderItem={({ item }) => {
              return (
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
              );
            }}
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
                  onPress={
                    section.title != "Services"
                      ? () => router.push("/shop")
                      : () => router.push("/service")
                  }
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
        </ScrollView>
      ) : (
        <View
          style={{
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator color={Colors.secondary} size={40} />
        </View>
      )}
      <FloatingButton />
    </SafeAreaView>
  );
};

export default Home;
