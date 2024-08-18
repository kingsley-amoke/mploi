import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Divider, Text, TextInput } from "react-native-paper";
import React, { useLayoutEffect, useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  useImageStore,
  useProductsStore,
  useReviewsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { doc, DocumentData, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { ProductTypes, ReviewTypes } from "@/src/utils/types";
import { averageRating, formatPrice } from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";
import Reviews from "@/src/components/Reviews";

const ProductDetails = () => {
  const { id: productID } = useLocalSearchParams();

  const navigation = useNavigation();

  const { products } = useProductsStore();
  const { reviews} = useReviewsStore();
  
  const { image, updateImage } = useImageStore();
  
  const product = products.find((product) => product._id === productID);

  const productReviews = reviews.filter(
    (review) => review.productID === productID
  );

  const ImageRenderItem = ({ item }: { item: string }) => {
    return (
      <TouchableOpacity
        style={{
          width: 100,
          height: 100,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          borderWidth: 1,
          borderColor: "grey",
          marginRight: 20,
        }}
        onPress={() => updateImage(item)}
      >
        <Image
          source={{ uri: item }}
          width={90}
          height={90}
          style={{ borderRadius: 10 }}
        />
      </TouchableOpacity>
    );
  };

  const contactSeller = () => {
    console.log("contact seller");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: product?.name.substring(0, 25),
      headerStyle: { backgroundColor: Colors.light.primary },
      headerTintColor: "white",
    });
    updateImage(product?.images[0]);
  }, []);

  return (
    <ScrollView style={{ padding: 10, paddingVertical: 30 }}>
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 300,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "grey",
              marginBottom: 30,
            }}
          >
            {image && (
              <Image
                source={{ uri: image }}
                width={290}
                height={290}
                style={{ borderRadius: 10 }}
              />
            )}
          </View>
          {product?.images.length > 1 && (
            <FlatList
              data={product?.images}
              horizontal
              renderItem={ImageRenderItem}
              showsHorizontalScrollIndicator={false}
            />
          )}
        </View>
        <Divider
          bold
          horizontalInset
          style={{ borderColor: "grey", marginTop: 20 }}
        />
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Product Details
          </Text>
          <View style={{ gap: 10 }}>
            <Text>Name: {product?.name}</Text>
            <Text>Description: {product?.description}</Text>
            <Text>Location: {product?.location}</Text>
            <Text>Price: {formatPrice(product?.price)}</Text>
            <Text>Negotiable: {product?.negotiable ? "Yes" : "No"}</Text>
          </View>
        </View>
      </View>
      <Divider
        bold
        horizontalInset
        style={{ borderColor: "grey", marginVertical: 20 }}
      />
      <View>
        <Button mode="contained" onPress={contactSeller}>
          Contact Seller
        </Button>
      </View>
      <View style={{ marginBottom: 40 }}>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Review this product
          </Text>
        </View>

        <View>
          <Text>Total: ({productReviews.length})</Text>
          <Text>Average: {averageRating(productReviews)}</Text>
        </View>
      </View>

      <Reviews itemID={productID} item="product"/>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
