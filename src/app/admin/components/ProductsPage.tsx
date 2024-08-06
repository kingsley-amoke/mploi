import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useProductsStore, useUserStore } from "@/src/state/store";
import ProductCard from "@/src/components/ProductCard";
import { Text } from "react-native-paper";
import { DocumentData } from "firebase/firestore";

const ProductsPage = ({products}: {products: DocumentData[]}) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [loading, setLoading] = useState(false);

  return (
    <View>
       <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 18,
            fontWeight: "700",
            marginVertical: 10,
          }}
        >
          Latest Products
        </Text>
      </View>

      <View
        style={{
          width: "100%",
          marginVertical: 10,
          flexDirection: "row",
          marginHorizontal: "auto",
          flexWrap: "wrap",
          gap: 10,
        }}
      >
        {products.map((product) => (
          <ProductCard product={product} key={product._id} />
        ))}
      </View>
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({});
