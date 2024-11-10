import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useShopsStore } from "@/src/state/store";
import Services from "@/src/components/Services";
import Shop from "@/src/components/Shops";

const index = () => {
  const { shops } = useShopsStore();

  const router = useRouter();

  const sortedShops = shops.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
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
          All Shops
        </Text>
      </LinearGradient>
      <ScrollView showsVerticalScrollIndicator={false}>
        {sortedShops.map((shop, index) => (
          <Shop shop={shop} key={index} />
        ))}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
