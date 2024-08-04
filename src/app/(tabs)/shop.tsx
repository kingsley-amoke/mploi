import { useProductsStore, useUsersStore, useUserStore } from "@/src/state/store";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, MD2Colors, Text } from "react-native-paper";

import ProductCard from "@/src/components/ProductCard";
import Map from "@/src/components/Map";


export default function Shop() {

  const router = useRouter();


  const {products} = useProductsStore();
  const {user} = useUserStore();
  const [loading, setLoading] = useState(false);


  const addShop = () => {
  console.log('nothing')
      
  };

  console.log(products)

  return (
    <View style={{flex:1, justifyContent:'center', alignItems: 'center'}}>
     <Button mode="outlined" onPress={() => router.push('products/images?id=1')}>Go</Button>
     </View>
  )
}