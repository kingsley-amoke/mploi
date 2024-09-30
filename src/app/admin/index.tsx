import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, SegmentedButtons } from "react-native-paper";
import UsersPage from "./components/UsersPage";
import CareerPage from "./components/CareerPage";
import ProductsPage from "./components/ProductsPage";
import { useRouter } from "expo-router";

const index = () => {
  const [value, setValue] = useState("users");

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Button
          mode="outlined"
          style={{ marginVertical: 20 }}
          onPress={() => router.push("/admin/cv")}
        >
          CV Reviews
        </Button>
      </View>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "users",
            label: "All Users",
          },
          {
            value: "career",
            label: "Career Jobs",
          },
          {
            value: "shop",
            label: "Shop",
          },
        ]}
      />
      {value === "users" ? (
        <View>
          <View>
            <UsersPage />
          </View>
        </View>
      ) : value === "career" ? (
        <CareerPage />
      ) : (
        <ProductsPage />
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});
