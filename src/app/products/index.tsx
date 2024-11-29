import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useProductsStore } from "@/src/state/store";
import ProductsPage from "@/src/components/ProductsPage";
import { useGlobalSearchParams, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const shop = useGlobalSearchParams().category;

  const { products } = useProductsStore();
  const router = useRouter();

  const filteredproducts = products.filter((p) => p.category == shop);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
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
          {shop}
        </Text>
      </LinearGradient>
      {filteredproducts.length > 0 ? (
        <ProductsPage products={filteredproducts} />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          <Text>No product here..</Text>
        </View>
      )}
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
