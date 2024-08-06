import { useProductsStore } from "@/src/state/store";
import React, { useState } from "react";
import { FlatList, SafeAreaView, ScrollView, useColorScheme, View } from "react-native";
import {
  ActivityIndicator,
  Card,
  MD2Colors,
  Text,
  TextInput,
} from "react-native-paper";

import ProductsPage from "../admin/components/ProductsPage";
import { DocumentData } from "firebase/firestore";
import { Colors } from "@/src/constants/Colors";
import { formatPrice } from "@/src/utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";


export default function Shop() {
  const { products } = useProductsStore();

  const router = useRouter();
  const colorScheme = useColorScheme()

  const [search, setSearch] = useState('');

  const textColor = colorScheme === 'light' ? '#000': '#fff'

  const ShopItem = ({ item }: { item: DocumentData }) => {
    return (
    
        <Card style={{ width:150, marginLeft:10 }} onPress={() => router.push(`products/${item._id}`)}>
          <Card.Cover
            source={{ uri: item.images[0] }}
            style={{ height:150 }}
          />
          <Card.Content style={{ marginVertical: 5,}}>
            <Text style={{ fontWeight: "bold"}}>
              {item.name}
            </Text>
            <Text style={{ fontSize: 10 }}>{formatPrice(item.price)}</Text>
          </Card.Content>
       
        </Card>
 
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const addShop = () => {
    console.log("nothing");
  };

  return (
    
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
      }}
    >
      
      <View
        style={{
          marginVertical: 10,
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Search services"
         style={{width:300, paddingLeft:20, height:40}}
         
          outlineStyle={{width:1,}}
          onChangeText={(value) => setSearch(value)}
        />
        <MaterialIcons
          name="search"
          size={20}
          color={textColor}
          style={{ position: "absolute", left: 35 }}
        />
      </View>
      <ScrollView>

      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text
          style={{
            textAlign: "left",
            fontSize: 18,
            fontWeight: "700",
            marginVertical: 10,
          }}
        >
          Best Selling Deals
        </Text>
      </View>
      <FlatList
        data={products}
        renderItem={(item) => ShopItem(item)}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 10, height:200}}
      />


      {products.length > 0 ? (
        <ProductsPage products={filteredProducts}/>
      ) : (
        <ActivityIndicator
        animating={true}
        color={MD2Colors.teal900}
        style={{ marginVertical: 200 }}
        />
      )}
      </ScrollView>
    </SafeAreaView>
  );
}
