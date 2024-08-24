import { Pressable, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { Button, RadioButton, Text, TextInput } from "react-native-paper";
import {
  useProductsStore,
  useShopsStore,
  useUserStore,
} from "@/src/state/store";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { ProductTypes } from "@/src/utils/types";
import { useRouter } from "expo-router";
import { CustomModal } from "@/src/components/CustomModal";
import { Colors } from "@/src/constants/Colors";
import { CustomToast, deduct } from "@/src/utils/data";

const add = () => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { user, decreaseUserBalance } = useUserStore();
  const { shops } = useShopsStore();
  const { addProduct, addPromoted } = useProductsStore();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [negotiable, setNegotiable] = useState(true);
  const [category, setCategory] = useState("Select category");

  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);

  const textColor = colorScheme === 'dark' ? '#fff' : '#000';

  const handleSubmitProduct = () => {

    const promo = active === 2 ?  '7 days' : active === 3 ? '30 days' : active === 4 ? '3 months' : 'free';

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
      promo: promo,
    };

    const productRef = doc(firestoreDB, "products", data._id);
    setDoc(productRef, data).then(() => {
      addProduct(data);
      if (active !== 1) {

      addPromoted(data);

      router.push(`/products/images?id=${data._id}`);
      CustomToast("Please upload images and continue");
      setVisible(false);
      setPosting(false);
      }else{
        router.push(`/products/images?id=${data._id}`);
        CustomToast("Please upload images and continue");
        setVisible(false);
        setPosting(false);
      }
    });
  };

  const handleProcessPayment = (active: number) => {
    console.log('here')
    setPosting(true);
    if(active > parseInt(user?.walletBalance)) {
      console.log('yes')
      CustomToast('Insufficiant balance');
      setPosting(false)
    }else{
      decreaseUserBalance(active);
      deduct(user, active).then(() => {
        handleSubmitProduct();
      });
    }
  };

  const payment = () => {
    switch (active) {
      case 1:
        handleSubmitProduct();

        break;
      case 2:
        
        handleProcessPayment(600);
        
        break;
      case 3:
        handleProcessPayment(5000);
        break;
      case 4:
        handleProcessPayment(10000);
        break;
      default:
        handleSubmitProduct();
        break;
    }
  };

  const modalContent = (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontWeight: "bold" }}>
        How would you like to post this product?
      </Text>
      <View style={{ width: 300, marginVertical: 20, gap: 10 }}>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 1 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(1)}
        >
          <Text
            style={{
              color: active === 1 ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            No Promo
          </Text>
          <Text style={{ color: active === 1 ? "white" : "black" }}>Free</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 2 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(2)}
        >
          <View>
            <Text
              style={{
                color: active === 2 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Promo Lite
            </Text>
            <Text
              style={{
                color: active === 2 ? "white" : "black",
              }}
            >
              7 days
            </Text>
          </View>
          <Text style={{ color: active === 2 ? "white" : "black" }}>#600</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 3 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(3)}
        >
          <View>
            <Text
              style={{
                color: active === 3 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Top Promo
            </Text>
            <Text
              style={{
                color: active === 3 ? "white" : "black",
              }}
            >
              30 days
            </Text>
          </View>
          <Text style={{ color: active === 3 ? "white" : "black" }}>#5000</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderWidth: 1,
            borderColor: Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: active === 4 ? Colors.light.primary : "white",
          }}
          onPress={() => setActive(4)}
        >
          <View>
            <Text
              style={{
                color: active === 4 ? "white" : "black",
                fontWeight: "bold",
              }}
            >
              Boost Premium Promo
            </Text>
            <Text
              style={{
                color: active === 4 ? "white" : "black",
              }}
            >
              3 months
            </Text>
          </View>
          <Text style={{ color: active === 4 ? "white" : "black" }}>
            #10000
          </Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          marginBottom: 10,
        }}
      >
        <Button mode="outlined" onPress={() => setVisible(false)}>
          Cancel
        </Button>
        <Button mode="contained" onPress={payment}>
          {posting ? "Please wait..." : "Proceed"}
        </Button>
      </View>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, paddingBottom: 30, marginVertical: 20 }}>
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
          <Text style={{ marginBottom: 10, marginLeft: 10 }}>Negotiable?</Text>
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
            borderColor: textColor,
          }}
        >
          <SectionedMultiSelect
            items={shops}
            IconRenderer={MaterialIcons}
            uniqueKey="name"
            single
            subKey="subshops"
            selectText={category}
            colors={{selectToggleTextColor: textColor}}
            onSelectedItemsChange={(item) => setCategory(item[0])}
          />
        </View>
      </View>

      <View style={{ marginVertical: 10 }}>
        <CustomModal
          content={modalContent}
          triggerText="Post"
          visible={visible}
          setVisible={setVisible}
          icon="cart"
        />
      </View>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({});
