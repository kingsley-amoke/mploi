import { DocumentData } from "firebase/firestore";
import React from "react";
import { View } from "react-native";
import { Button, Card, Text } from "react-native-paper";
import { useUsersStore } from "../state/store";
import { useRouter } from "expo-router";
import { noAvatar, shopAvatar } from "../utils/data";

const ProductCard = ({ product }: { product: DocumentData }) => {

  const { users } = useUsersStore();

  const router = useRouter();

  const seller = users.find((user) => user._id === product.sellerID)!;

  const price = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "ngn",
    currencySign: "accounting",
  }).format(product.price);



  const contactSeller = () => {
    router.push(`products/${product._id}`)
  }

  
  return (
    <Card style={{ height: 280, width: 160 }}>
      <Card.Cover source={{ uri: product.images[0] || shopAvatar}} style={{ height: 140 }} />
      <Card.Content style={{ marginVertical: 10 }}>
        <Text variant='bodySmall' style={{ fontWeight: "bold", fontSize: 14, flexWrap:'wrap' }}>
          {product.name.length > 14 ? `${product.name.substring(0, 33)}...` : product.name}
        </Text>
        <Text
          variant="bodyMedium"
          style={{ fontSize: 12, fontStyle: "italic" }}
        >
          {price}
        </Text>
        <Text style={{ fontSize: 14 }}>{product.location}</Text>
        <Button mode="outlined" style={{ marginTop: 10 }} onPress={contactSeller}>
          Buy Now
        </Button>
      </Card.Content>
    </Card>
  );
};
export default ProductCard;
