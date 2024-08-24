import { useProductsStore } from "@/src/state/store";
import React, { useState } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  useColorScheme,
  View,
} from "react-native";
import {
  Card,
  Text,
  TextInput,
} from "react-native-paper";

import ProductsPage from "@/src/components/ProductsPage";
import { DocumentData } from "firebase/firestore";
import { formatPrice, shopAvatar } from "@/src/utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function Shop() {
  const { products, promoted } = useProductsStore();

  const router = useRouter();
  const colorScheme = useColorScheme();

  const [search, setSearch] = useState("");

  const textColor = colorScheme === "light" ? "#000" : "#fff";

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );



  const ShopItem = ({ item }: { item: DocumentData }) => {
    return (
      <Card
        style={{ width: 150, marginLeft: 10 }}
        onPress={() => router.push(`/products/${item._id}`)}
      >
        <Card.Cover source={{ uri: item.images[0] || shopAvatar }} style={{ height: 150 }} />
        <Card.Content style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>
            {item.name.length > 20
              ? item.name.substring(0, 14) + "..."
              : item.name}
          </Text>
          <Text style={{ fontSize: 10 }}>{formatPrice(item.price)}</Text>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      <View
        style={{
          marginVertical: 10,
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Search services"
          style={{ width: 300, paddingLeft: 20, height: 40 }}
          outlineStyle={{ width: 1 }}
          onChangeText={(value) => setSearch(value)}
        />
        <MaterialIcons
          name="search"
          size={20}
          color={textColor}
          style={{ position: "absolute", left: 35 }}
        />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {promoted.length > 0 && (
          <>
          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <Text
              style={{
                textAlign: "left",
                fontSize: 18,
                fontWeight: "700",
                marginVertical: 10,
              }}
            >
              Best Selling Deals
            </Text>
          </View>
        <FlatList
        data={promoted}
        renderItem={(item) => ShopItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10, height: 200 }}
        />
      </>

      )}
        {products.length > 0 ? (
          <ProductsPage products={filteredProducts} />
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>No products today...</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
