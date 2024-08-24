import {
  FlatList,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import {
  useProductsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { ActivityIndicator, Text } from "react-native-paper";
import { deleteDoc, doc, DocumentData, updateDoc } from "firebase/firestore";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { CustomToast } from "@/src/utils/data";

const ProductsPage = () => {

  const { users } = useUsersStore();
  const { products, deleteProduct,deletePromoted } = useProductsStore();
  const [loading, setLoading] = useState(false);

  const ProductRenderItem = ({ item }: DocumentData) => {
    const seller = users.find((user) => user._id === item.sellerID);

    const removeProduct = () => {
      setLoading(true);
      const productRef = doc(firestoreDB, "products", item._id);

      deleteDoc(productRef).then(() => {
        deleteProduct(item);
        deletePromoted(item)
        setLoading(false);
        CustomToast("Product deleted Successfully");
      });
    };

    const cancelPromo = () => {
      const productRef = doc(firestoreDB, "products", item._id);

      updateDoc(productRef, {promo: 'free'}).then(() => {
        deletePromoted(item);
        CustomToast("Successful");
      })
    };

    return (
      <View style={{ borderBottomWidth: 1, paddingBottom: 5, marginBottom: 5 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
          Title: {item.name}
        </Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "95%",
          }}
        >
          <View>
            <Text>ID: {item._id}</Text>
            <Text>Price: #{item.price}</Text>
            <Text>Seller: {seller?.lastName}</Text>
            <Text>Promo: {item.promo}</Text>
          </View>
          <View style={{ gap: 20, alignItems: "center", flexDirection: "row" }}>
            {item.promo && item.promo !== "free" && (
              <TouchableOpacity onPress={cancelPromo}>
                <MaterialCommunityIcons name="cancel" size={20} />
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={removeProduct}>
              <MaterialCommunityIcons name="trash-can-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return loading || products.length < 1 ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {!loading ? (
        <View>
          <Text>No products today...</Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator animating color="teal" size="small" />
          <Text>Deleting...</Text>
        </View>
      )}
    </View>
  ) : (
    <View
      style={{
        margin: 10,
        paddingTop: 10,
        paddingBottom: 40,
      }}
    >
      <FlatList
        data={products}
        renderItem={ProductRenderItem}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({});
