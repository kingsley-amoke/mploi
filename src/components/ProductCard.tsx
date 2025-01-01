import { DocumentData } from "firebase/firestore";
import React from "react";
import { Button, Card, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { shopAvatar } from "../utils/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import moment from "moment";
import { Colors } from "../constants/Colors";

const ProductCard = ({ product }: { product: DocumentData }) => {
  const router = useRouter();

  const price = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "ngn",
    currencySign: "accounting",
  }).format(product.price);

  return (
    <Card style={{ height: 280, position: "relative" }}>
      <Card.Cover
        source={{ uri: product.images[0] || shopAvatar }}
        style={{ height: 140 }}
      />
      {moment(product.promoExpiresOn).diff(moment()) > 0 && (
        <MaterialCommunityIcons
          name="crown-circle-outline"
          size={30}
          style={{ position: "absolute", top: 2, left: 2 }}
          color={Colors.golden}
        />
      )}
      <Card.Content style={{ marginVertical: 10 }}>
        <Text
          variant="bodySmall"
          style={{ fontWeight: "bold", fontSize: 14, flexWrap: "wrap" }}
        >
          {product.name.length > 14
            ? `${product.name.substring(0, 33)}...`
            : product.name}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ fontSize: 12, fontStyle: "italic" }}
        >
          {price}
        </Text>
        <Text style={{ fontSize: 14 }}>{product.location}</Text>
        <Button
          mode="outlined"
          style={{ marginTop: 10 }}
          onPress={() => router.push(`products/${product._id}`)}
        >
          Buy Now
        </Button>
      </Card.Content>
    </Card>
  );
};
export default ProductCard;
