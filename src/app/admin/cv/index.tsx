import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "expo-router";
import { useCVStore } from "@/src/state/store";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { ExternalLink } from "@/src/components/ExternalLink";
import { Divider } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomToast } from "@/src/utils/data";
import { deleteObject, ref } from "firebase/storage";
import { firestoreDB, storage } from "@/src/utils/firebaseConfig";

const index = () => {
  const navigation = useNavigation();

  const { cvs } = useCVStore();

  const cvRenderItem = ({ item }: { item: DocumentData }) => {
    const onCheck = () => {
      CustomToast("Record deleted successfully");
      deleteDoc(doc(firestoreDB, "resume", item._id));
      deleteObject(ref(storage, "resume/" + item._id));
    };

    return (
      <>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ marginHorizontal: 10 }}>
            <Text>Email: {item.userEmail}</Text>
            <Text>Phone: {item.userPhone}</Text>
            <Text>Plan: {item.plan}</Text>
            <Text>Price: NGN{item.price}</Text>
            <Text>Status: {item.status}</Text>
            <ExternalLink
              href={item.resume}
              style={{ color: "blue", fontWeight: "bold" }}
            >
              Download CV
            </ExternalLink>
          </View>
          <MaterialCommunityIcons
            name="check-outline"
            size={40}
            onPress={onCheck}
          />
        </View>
        <Divider bold horizontalInset />
      </>
    );
  };

  useEffect(() => {
    navigation.setOptions({
      title: "CV Reviews",
    });
  });

  return (
    <SafeAreaView style={{ marginVertical: 10 }}>
      <FlatList
        data={cvs}
        renderItem={(item) => cvRenderItem(item)}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
