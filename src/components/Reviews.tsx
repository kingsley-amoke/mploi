import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { doc, DocumentData, setDoc } from "firebase/firestore";
import { useReviewsStore, useUsersStore, useUserStore } from "../state/store";
import { Avatar, Divider, Text, TextInput } from "react-native-paper";
import { firestoreDB } from "../utils/firebaseConfig";

const Reviews = ({
  itemID,
  item,
}: {
  itemID: string | string[] | undefined;
  item: string;
}) => {
  const colorScheme = useColorScheme();

  const { users } = useUsersStore();
  const { user } = useUserStore();
  const { reviews, updateReviews } = useReviewsStore();

  const [review, setReview] = useState("");
  const [star, setStar] = useState(1);

  const [submitting, setSubmitting] = useState(false);

  const itemReviews = reviews.filter((review) => review.productID === itemID);

  const textColor = colorScheme === "dark" ? "white" : "black";

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
        <Avatar.Image source={{ uri: reviewer?.image }} />
        <View style={{ gap: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>
            {reviewer?._id === user?._id ? "You" : reviewer?.lastName}
          </Text>
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

  const handleSubmitReviews = () => {
    setSubmitting(true);

    const id = `${Date.now()}`;

    const data = {
      _id: id,
      review: review,
      rating: star,
      productID: itemID,
      userID: user?._id,
    };

    setReview("");

    const reviewRef = doc(firestoreDB, "reviews", data._id);

    setDoc(reviewRef, data).then(() => {
      updateReviews(data);
      setSubmitting(false);
    });
  };

  return (
    <View style={{ marginVertical: 10 }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginHorizontal: 20,
          marginTop: 10,
        }}
      >
        <Text>Rate this {item}.</Text>
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
              padding: 3,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 0 ? "green" : "grey"}
              size={20}
              onPress={() => setStar(1)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 3,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 1 ? "green" : "grey"}
              size={20}
              onPress={() => setStar(2)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 3,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 2 ? "green" : "grey"}
              size={20}
              onPress={() => setStar(3)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 3,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star > 3 ? "green" : "grey"}
              size={20}
              onPress={() => setStar(4)}
            />
          </View>
          <View
            style={{
              borderWidth: 1,
              borderColor: "grey",
              padding: 3,
              borderRadius: 5,
            }}
          >
            <MaterialIcons
              name="star"
              color={star === 5 ? "green" : "grey"}
              size={20}
              onPress={() => setStar(5)}
            />
          </View>
        </View>
      </View>
      {itemID !== user?._id && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,
            marginVertical: 20,
            marginHorizontal: 10,
          }}
        >
          <TextInput
            mode="outlined"
            label="write a review..."
            style={{ flex: 1 }}
            value={review}
            onChangeText={(value) => setReview(value)}
          />
          {submitting ? (
            <Feather name="loader" color={textColor} size={30} />
          ) : (
            <MaterialIcons
              name="send"
              color={textColor}
              size={30}
              onPress={handleSubmitReviews}
            />
          )}
        </View>
      )}
      {submitting && (
        <Text style={{ color: "grey", textAlign: "center", marginBottom: 10 }}>
          Submitting...
        </Text>
      )}
      <View style={{ marginBottom: 50, marginTop: 20, gap: 20 }}>
        {itemReviews.length > 0 ? (
          <>
            <Divider bold horizontalInset style={{ borderColor: "grey" }} />
            {itemReviews.map((review) => (
              <ReviewRenderItem key={review._id} item={review} />
            ))}
          </>
        ) : (
          <Text style={{ textAlign: "center", fontStyle: "italic" }}>
            No reviews
          </Text>
        )}
      </View>
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({});
