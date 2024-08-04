import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Button, Divider, Text, TextInput } from "react-native-paper";
import React, { useLayoutEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import { useImageStore, useProductsStore, useReviewsStore, useUsersStore, useUserStore } from "@/src/state/store";
import { doc, DocumentData, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { ProductTypes, ReviewTypes } from "@/src/utils/types";

const ProductDetails = () => {
  const { id: productID } = useLocalSearchParams();

  const { user } = useUserStore();
  const { users } = useUsersStore();
  const {products} = useProductsStore();
  const {reviews } = useReviewsStore();

  const { image, updateImage } = useImageStore();

  const [star, setStar] = useState(0);
  const [review, setReview] = useState("");

  const [submitting, setSubmitting] = useState(false);


  const product = products.find((product) => product._id === productID)

  const productReviews = reviews.filter((review) => review.productID === productID)

  const handleSubmitReviews = () => {
    setSubmitting(true);

    const id = `${Date.now()}}`;

    const data = {
      _id: id,
      review: review,
      rating: star,
      productID: productID,
      userID: user?._id,
    };

    const reviewRef = doc(firestoreDB, "reviews", data._id);

    setDoc(reviewRef, data).then(() => {
      setSubmitting(false);
    });
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
        <Text>{item}</Text>
      </TouchableOpacity>
    );
  };

  const ReviewRenderItem = ({ item }: { item: DocumentData }) => {
    const reviewer = users.find((user) => user?._id === item.userID);

    return (
      <View
        style={{
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 10,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          gap: 30,
        }}
      >
        <Avatar.Icon icon="cart"/>
        <View style={{gap:10}}>
          <Text style={{fontWeight:'bold', fontSize:16}}>{reviewer?._id === user?._id ? 'You' : reviewer?.lastName}</Text>
          <View
            style={{
              flexDirection: "row",

              alignItems: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 1,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="star"
                color={item.rating > 0 ? "green" : "grey"}
                size={20}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 1,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="star"
                color={item.rating > 1 ? "green" : "grey"}
                size={20}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 1,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="star"
                color={item.rating > 2 ? "green" : "grey"}
                size={20}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 1,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="star"
                color={item.rating > 3 ? "green" : "grey"}
                size={20}
              />
            </View>
            <View
              style={{
                borderWidth: 1,
                borderColor: "grey",
                padding: 1,
                borderRadius: 5,
              }}
            >
              <MaterialIcons
                name="star"
                color={item.rating === 5 ? "green" : "grey"}
                size={20}
              />
            </View>
          </View>
          <Text>{item.review}</Text>
        </View>
      </View>
    );
  };

  useLayoutEffect(() => {
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
              width: 350,
              height: 350,
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 10,
              borderWidth: 1,
              borderColor: "grey",
              marginBottom: 30,
            }}
          >
            <Text>{image}</Text>
          </View>
          <FlatList
            data={product?.images}
            horizontal
            renderItem={ImageRenderItem}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Divider bold horizontalInset style={{borderColor:'grey', marginTop:20}}/>
        <View style={{ marginVertical: 20 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Product Details
          </Text>
          <View style={{gap:10}}>
            <Text>Name: {product?.name}</Text>
            <Text>Description: {product?.description}</Text>
            <Text>Location: {product?.location}</Text>
            <Text>Price: {product?.price}</Text>
            <Text>Negotiable: {product?.negotiable ? "Yes" : "No"}</Text>
            <Text>Average rating: 4.5</Text>
          </View>
        </View>
      </View>
      <Divider bold horizontalInset style={{borderColor:'grey', marginVertical:20}}/>
      <View>
        <Button mode="contained">Contact Seller</Button>
      </View>
      <View style={{ marginBottom: 40 }}>
        <View style={{ marginVertical: 30 }}>
          <Text
            style={{ textAlign: "center", fontSize: 20, fontWeight: "bold" }}
          >
            Submit your review
          </Text>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
          }}
        >
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 0 ? "green" : "grey"}
              size={30}
              onPress={() => setStar(1)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 1 ? "green" : "grey"}
              size={30}
              onPress={() => setStar(2)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 2 ? "green" : "grey"}
              size={30}
              onPress={() => setStar(3)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 3 ? "green" : "grey"}
              size={30}
              onPress={() => setStar(4)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 5,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star === 5 ? "green" : "grey"}
              size={30}
              onPress={() => setStar(5)}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 20,
          }}
        >
          <TextInput
            mode="outlined"
            label="Review"
            style={{ width: 350 }}
            onChangeText={(value) => setReview(value)}
          />
          {
submitting ? (
  <MaterialIcons  name="downloading"
  color="white"
  size={30}/>
) : (

  <MaterialIcons
  name="send"
  color="white"
  size={30}
  onPress={handleSubmitReviews}
  />
)
          }
        </View>
      </View>
      <View style={{ marginBottom: 50, gap:20 }}>
      <Divider bold horizontalInset style={{borderColor:'grey'}} />
        {productReviews.map((review) => (
          <ReviewRenderItem key={review._id} item={review} />
        ))}
      </View>
    </ScrollView>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({});
