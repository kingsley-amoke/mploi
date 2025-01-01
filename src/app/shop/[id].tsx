import { FlatList, ScrollView, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { useLocalSearchParams } from "expo-router";
import { useShopsStore } from "@/src/state/store";
import SubShop from "@/src/components/SubShop";
import { Divider } from "react-native-paper";
import FancyHeader from "@/src/components/FancyHeader";

const index = () => {
  const { id: shopID } = useLocalSearchParams();
  const { shops } = useShopsStore();

  const currentShop = useMemo(
    () => shops.find((shop) => shop._id == shopID),
    [shops, shopID]
  );

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title={currentShop?.name} backButton />
      <FlatList
        data={currentShop?.subshops}
        renderItem={({ item, index }) => (
          <View key={index}>
            <SubShop subshop={item} />
            <Divider bold />
          </View>
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
