import { FlatList, StyleSheet, View } from "react-native";
import React, { useMemo } from "react";
import { useCategoryStore } from "@/src/state/store";
import Services from "@/src/components/Services";
import FancyHeader from "@/src/components/FancyHeader";
import { Divider } from "react-native-paper";

const index = () => {
  const { categories } = useCategoryStore();

  const filteredCategories = useMemo(
    () =>
      categories.sort(function (a, b) {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      }),
    [categories.length]
  );

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="All Services" backButton />
      <FlatList
        data={filteredCategories}
        renderItem={({ item, index }) => (
          <View key={index}>
            <Services service={item} />
            <Divider bold />
          </View>
        )}
      />
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
