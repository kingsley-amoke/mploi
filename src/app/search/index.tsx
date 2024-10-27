import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProductsStore, useUsersStore } from "@/src/state/store";
import ProductsPage from "@/src/components/ProductsPage";
import UserCard from "@/src/components/UserCard";
import { DocumentData } from "firebase/firestore";

const index = () => {
  const { search } = useLocalSearchParams();
  const { products } = useProductsStore();
  const { users } = useUsersStore();

  const router = useRouter();

  const searchedProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toString().toLowerCase()) ||
      product.category
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      product.location
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(search.toString().toLowerCase())
  );

  const searchedUsers = users.filter(
    (user) =>
      user.firstName.toLowerCase().includes(search.toString().toLowerCase()) ||
      user.lastName.toLowerCase().includes(search.toString().toLowerCase()) ||
      user.bio.toLowerCase().includes(search.toString().toLowerCase()) ||
      user.location.regionName?.city
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      user.location.regionName?.country
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      user.location.regionName?.region
        .toLowerCase()
        .includes(search.toString().toLowerCase()) ||
      user.skills
        ?.map((i: string) => i.toLowerCase())
        .includes(search.toString())
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          Search Results
        </Text>
      </LinearGradient>
      {searchedProducts.length > 0 && (
        <>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginVertical: 10,
            }}
          >
            Products
          </Text>
          <ProductsPage products={searchedProducts} />
        </>
      )}
      {searchedUsers.map((user, index) => (
        <View key={index}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 10,
              marginVertical: 10,
            }}
          >
            Service Providers
          </Text>
          <UserCard user={user} />
        </View>
      ))}
      {searchedUsers.length < 1 && searchedProducts.length < 1 && (
        <View
          style={{
            flex: 1,
            height: 700,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Search not found</Text>
        </View>
      )}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
