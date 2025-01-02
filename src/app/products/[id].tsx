import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import React, { useEffect, useLayoutEffect, useMemo } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useGlobalSearchParams,
  useLocalSearchParams,
  useRouter,
} from "expo-router";
import {
  useImageStore,
  useProductsStore,
  useReviewsStore,
  useUsersStore,
} from "@/src/state/store";
import {
  averageRating,
  createChat,
  CustomToast,
  deleteFromStorage,
  formatPrice,
  shopAvatar,
} from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";
import Reviews from "@/src/components/Reviews";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import FancyHeader from "@/src/components/FancyHeader";
import moment from "moment";
import { ImagesAssets } from "../../../assets/imageAssets";

const ProductDetails = () => {
  const { id: productID } = useLocalSearchParams();
  const url = useGlobalSearchParams();

  const router = useRouter();

  const { products, deleteProduct } = useProductsStore();
  const { reviews, storeReviews } = useReviewsStore();
  const { users } = useUsersStore();

  const { image, updateImage } = useImageStore();

  const product = useMemo(
    () => products.find((product) => product._id === productID),
    [products.length, productID]
  );
  const seller = useMemo(
    () => users.find((user) => user._id === product?.sellerID)!,
    [users.length]
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

  //view image fullscreen

  const handleViewImage = () => {
    if (image) {
      router.push(`/image`);
    } else {
      CustomToast("This product has no image");
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
    if (auth.currentUser && product) {
      createChat(auth.currentUser.uid, product.sellerID);
      router.push(`/`);
    } else {
      CustomToast("Please login to continue");
    }
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, "reviews"),
        where("productID", "==", productID)
      ),
      (snapshot) => {
        const reviews = snapshot.docs.map((doc) => doc.data());
        storeReviews(reviews);
      }
    );

    return () => unsubscribe();
  }, [productID]);
  return (
    <View style={{ flex: 1 }}>
      <FancyHeader
        title={product?.name.substring(0, 25)}
        backButton
        rightComponent={
          <MaterialCommunityIcons
            name="share-variant-outline"
            size={20}
            onPress={() => onShare()}
            color="white"
          />
        }
      />
      <ScrollView>
        <View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Pressable
              style={{
                position: "relative",
                width: "100%",
                height: 300,
                justifyContent: "center",
                alignItems: "center",
                borderRadius: 10,
                marginBottom: 40,
              }}
              onPress={handleViewImage}
            >
              <Image
                source={{ uri: image || shopAvatar }}
                width={430}
                height={300}
                style={{ borderRadius: 10 }}
              />
              <Image
                source={Image.resolveAssetSource(ImagesAssets.logo)}
                style={{
                  width: 150,
                  height: 50,
                  opacity: 1,
                  position: "absolute",
                  bottom: 100,
                }}
              />
              {moment(product?.promoExpiresOn).diff(moment()) > 0 && (
                <Text
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 10,
                    backgroundColor: Colors.primary,
                    color: "white",
                    fontWeight: "condensedBold",
                    fontSize: 18,
                    padding: 10,
                    borderRadius: 10,
                  }}
                >
                  Promoted
                </Text>
              )}
              {moment(product?.promoExpiresOn).diff(moment()) > 0 &&
                product?.sellerID == auth.currentUser?.uid && (
                  <Text
                    style={{
                      position: "absolute",
                      bottom: -40,
                      left: 10,
                      fontWeight: "condensedBold",
                      fontSize: 18,
                      padding: 10,
                      color: Colors.grey,
                      borderRadius: 10,
                    }}
                  >
                    Expires on: {moment(product?.promoExpiresOn).calendar()}
                  </Text>
                )}
            </Pressable>
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
              <Text>Seller: {seller?.lastName}</Text>
              <Text>Phone: {seller?.phone}</Text>
            </View>
          </View>
        </View>
        <Divider
          bold
          horizontalInset
          style={{ borderColor: "grey", marginVertical: 20 }}
        />
        <Text style={{ color: Colors.light.error, paddingHorizontal: 20 }}>
          Do not pay before deliveries, Physically inspect goods and sellers
          before making payment. MyPlug will not be responsible for transactions
        </Text>
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
            <Text>Total: ({reviews.length})</Text>
            <Text>Average: {averageRating(reviews)}</Text>
          </View>
        </View>

        <Reviews itemID={productID} item="product" />
      </ScrollView>
    </View>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
