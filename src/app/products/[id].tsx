import {
  FlatList,
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Divider, Text, TextInput } from "react-native-paper";
import React, { useLayoutEffect, useState } from "react";
import {
  Feather,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useNavigation,
  useRouter,
} from "expo-router";
import {
  useImageStore,
  useProductsStore,
  useReviewsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import {
  averageRating,
  createChat,
  deleteFromStorage,
  formatPrice,
  shopAvatar,
} from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";
import Reviews from "@/src/components/Reviews";
import { ref } from "firebase/database";
import { LinearGradient } from "expo-linear-gradient";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";

const ProductDetails = () => {
  const { id: productID } = useLocalSearchParams();
  const url = useGlobalSearchParams();

  const router = useRouter();

  const { products, deleteProduct } = useProductsStore();
  const { reviews } = useReviewsStore();
  const { user: loggedUser } = useUserStore();
  const { users } = useUsersStore();

  const { image, updateImage } = useImageStore();

  const product = products.find((product) => product._id === productID);
  const seller = users.find((user) => user._id === product?.sellerID);

  const productReviews = reviews.filter(
    (review) => review.productID === productID
  );

  const onShare = async () => {
    console.log(url.id);
    try {
      const result = await Share.share({
        message: `myplug://products/${url.id}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

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
    const id = `${Date.now()}`;
    //create chat
    const item = {
      _id: id,
      client: loggedUser,
      serviceProvider: seller,
    };

    createChat(item).then(() => {
      router.push(`/rooms/${item._id}`);
    });
  };

  const removeProduct = () => {
    //delete product

    const productRef = doc(firestoreDB, "products", product?._id);
    deleteDoc(productRef).then(() => {
      deleteProduct(product!);
      product?.images.forEach((image: string) => {
        deleteFromStorage(image);
      });
    });
  };

  useLayoutEffect(() => {
    updateImage(product?.images[0]);
  }, []);

  return (
    <ScrollView>
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
          {product?.name.substring(0, 25)}
        </Text>
        <MaterialCommunityIcons
          name="share-variant-outline"
          size={20}
          onPress={onShare}
          color="white"
        />
      </LinearGradient>
      <View>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: "100%",
              height: 300,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              marginBottom: 30,
            }}
          >
            <Image
              source={{ uri: image || shopAvatar }}
              width={400}
              height={290}
              style={{ borderRadius: 10 }}
            />
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
        <View style={{ margin: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Product Details
          </Text>
          <View style={{ gap: 10, marginTop: 10 }}>
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
      <View style={{ marginHorizontal: 10 }}>
        <Button
          mode="contained"
          onPress={
            product?.sellerID == auth.currentUser?.uid
              ? removeProduct
              : contactSeller
          }
          style={{ paddingVertical: 10 }}
          labelStyle={{ fontSize: 19 }}
        >
          {product?.sellerID == auth.currentUser?.uid
            ? "Delete Product"
            : "Contact Seller"}
        </Button>
      </View>
      <View style={{ marginBottom: 40, marginHorizontal: 10 }}>
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

      <Reviews itemID={productID} item="product" />
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
