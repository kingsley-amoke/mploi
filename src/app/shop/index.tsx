import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import { useShopsStore } from "@/src/state/store";
import Shop from "@/src/components/Shops";
import FancyHeader from "@/src/components/FancyHeader";
import { Divider } from "react-native-paper";

const index = () => {
  const { shops } = useShopsStore();

  const sortedShops = useMemo(
    () =>
      shops.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    [shops.length]
  );
  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="All Shops" backButton />
      <FlatList
        data={sortedShops}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Shop shop={item} />
            <Divider bold />
          </View>
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
