import { ScrollView, SectionList, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useProductsStore, useUsersStore } from "@/src/state/store";
import ProductsPage from "@/src/components/ProductsPage";
import UserCard from "@/src/components/UserCard";
import FancyHeader from "@/src/components/FancyHeader";
import moment from "moment";
import ProductCard from "@/src/components/ProductCard";
import { SectionGrid } from "react-native-super-grid";

const index = () => {
  const { search } = useLocalSearchParams();
  const { products } = useProductsStore();
  const { users } = useUsersStore();

  const searchedProducts = useMemo(
    () =>
      products.filter(
        (product) =>
          product.name
            .toLowerCase()
            .includes(search.toString().toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(search.toString().toLowerCase()) ||
          product.location
            .toLowerCase()
            .includes(search.toString().toLowerCase()) ||
          product.description
            .toLowerCase()
            .includes(search.toString().toLowerCase())
      ),
    [products.length, search]
  );

  const searchedUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.firstName
            .toLowerCase()
            .includes(search.toString().toLowerCase()) ||
          user.lastName
            .toLowerCase()
            .includes(search.toString().toLowerCase()) ||
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
      ),
    [users.length, search]
  );

  const sortedProducts = useMemo(
    () =>
      searchedProducts.sort(
        (a, b) =>
          moment(b.promoExpiresOn).diff(moment()) -
          moment(a.promoExpiresOn).diff(moment())
      ),
    [searchedProducts.length]
  );

  const searchResults = [
    {
      title: "Products",
      data: sortedProducts,
    },
    {
      title: "Users",
      data: searchedUsers,
    },
  ];

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Search Results" backButton />

      {/* {sortedProducts.length > 0 && (
        <View>
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
        </View>
      )}
      {searchedUsers.length > 0 && (
        <ScrollView showsVerticalScrollIndicator={false}>
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
          {searchedUsers.map((user, index) => (
            <View key={index}>
              <UserCard user={user} />
            </View>
          ))}
        </ScrollView>
      )} */}
      {searchedUsers.length < 1 && searchedProducts.length < 1 ? (
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
      ) : (
        <SectionGrid
          sections={searchResults}
          itemDimension={130}
          renderItem={({ item, index }) => {
            console.log(item);
            if (item.phone) {
              return (
                <View key={index}>
                  <UserCard user={item} />
                </View>
              );
            } else {
              return (
                <View key={index}>
                  <ProductCard product={item} />
                </View>
              );
            }
          }}
          renderSectionHeader={({ section }) => {
            return section.data.length > 0 ? (
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "bold",
                  marginLeft: 10,
                  marginVertical: 10,
                  color: Colors.grey,
                }}
              >
                {section.title}
              </Text>
            ) : (
              <></>
            );
          }}
        />
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
