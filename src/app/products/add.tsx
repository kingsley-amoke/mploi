import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import { useProductsStore, useShopsStore, useUserStore } from "@/src/state/store";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { ProductTypes } from "@/src/utils/types";
import { useRouter } from "expo-router";

const add = () => {

  const router = useRouter();
  const { user } = useUserStore();
  const { shops } = useShopsStore();
  const {addProduct} = useProductsStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [category, setCategory] = useState("Select category");

  const [posting, setPosting] = useState(false);


  const handleSubmitProduct = () => {
    
    setPosting(true);

    const id = `${Date.now()}`;

    const data: ProductTypes = {
      _id: id,
      name,
      description,
      location,
      price: parseFloat(price),
      negotiable,
      category,
      images: [],
      sellerID: user?._id!,
    };


    const productRef = doc(firestoreDB, "products", data._id);
    setDoc(productRef, data).then(() => {
      addProduct(data)
      router.push(`/products/images?id=${data._id}`)
      setPosting(false);
    });
  };

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 30, marginVertical:20 }}>
      <View style={{ margin: 10, gap: 30, paddingTop: 20 }}>
        <TextInput
          label="Name"
          mode="outlined"
          onChangeText={(value) => setName(value)}
        />
        <TextInput
          label="Description"
          mode="outlined"
          multiline
          numberOfLines={5}
          onChangeText={(value) => setDescription(value)}
        />
        <TextInput
          label="Location"
          mode="outlined"
          onChangeText={(value) => setLocation(value)}
        />
        <TextInput
          label="Price"
          keyboardType="numeric"
          mode="outlined"
          onChangeText={(value) => setPrice(value)}
        />
        <View>

        <Text style={{marginBottom:10, marginLeft:10}}>Negotiable?</Text>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="Yes"
              status={negotiable ? "checked" : "unchecked"}
              onPress={() => setNegotiable(true)}
            />
            <Text>Yes</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <RadioButton
              value="No"
              status={!negotiable ? "checked" : "unchecked"}
              onPress={() => setNegotiable(false)}
            />
            <Text>No</Text>
          </View>
        </View>

        </View>
        <View
          style={{
            borderBottomWidth: 1,
          }}
        >
          <SectionedMultiSelect
            items={shops}
            IconRenderer={MaterialIcons}
            uniqueKey="name"
            single
            subKey="subshops"
            selectText={category}
            onSelectedItemsChange={(item) => setCategory(item[0])}
          />
        </View>
      </View>
      <Button icon="cart" mode="contained" disabled={posting} style={{marginHorizontal:20, marginVertical:10}} onPress={handleSubmitProduct}>
        {posting ? "Please wait..." : "Post"}
      </Button>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({});
