import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import Categories from "@/src/components/Categories";
import { useCategoryStore } from "@/src/state/store";
import SubShop from "@/src/components/SubShop";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import Services from "@/src/components/Services";

const index = () => {
  const { categories } = useCategoryStore();

  const router = useRouter();

  const filteredCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  return (
    <ScrollView style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          All Services
        </Text>
      </LinearGradient>

      {filteredCategories.map((category, index) => (
        <Services service={category} key={index} />
      ))}
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
