import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import ViewImage from "@/src/components/ViewImage";
import { useUserStore } from "@/src/state/store";
import { Button, Text } from "react-native-paper";
import { ref } from "firebase/storage";
import { collection, doc, setDoc } from "firebase/firestore";console.log("Document successfully written!");
import { firestoreDB } from "@/src/utils/firebaseConfig";




interface subShopTypes {
    
  name:string
}
interface shopTypes {
  _id:string,
  name:string,
  subshops?: subShopTypes[]
}
export default function Shop() {

  const [loading, setLoading] = useState(false);


  const addShop = () => {
  console.log('nothing')
      
  };

  return (
    <View style={styles.container}>
      <Button mode="outlined" disabled={loading} onPress={addShop}>Add</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
