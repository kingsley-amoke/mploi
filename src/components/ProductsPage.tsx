import { View } from "react-native";
import React from "react";
import ProductCard from "@/src/components/ProductCard";
import { DocumentData } from "firebase/firestore";
import { FlatGrid } from "react-native-super-grid";

const ProductsPage = ({ products }: { products: DocumentData[] }) => {
  return (
    <View>
      <FlatGrid
        data={products}
        itemDimension={130}
        renderItem={({ item }) => <ProductCard product={item} />}
      />
    </View>
  );
};

export default ProductsPage;
