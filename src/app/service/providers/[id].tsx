import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import React, { useMemo } from "react";
import {
  useCategoryStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { useLocalSearchParams } from "expo-router";
import UserCard from "@/src/components/UserCard";
import FancyHeader from "@/src/components/FancyHeader";
import { FlatGrid } from "react-native-super-grid";

const ServiceProviders = () => {
  const { id: categoryID } = useLocalSearchParams();
  const { categories } = useCategoryStore();
  const { users } = useUsersStore();
  const { user: loggedUser } = useUserStore();

  const currentCategory = useMemo(
    () => categories.find((category) => category._id === categoryID),
    [categories.length, categoryID]
  );

  const serviceProviders = useMemo(
    () =>
      users.filter((user) => {
        return (
          user._id !== loggedUser?._id &&
          user.skills &&
          user.skills.includes(currentCategory?.name)
        );
      }),
    [users.length]
  );

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title={currentCategory?.name} backButton />
      {serviceProviders.length > 0 ? (
        <FlatGrid
          data={serviceProviders}
          itemDimension={130}
          renderItem={({ item, index }) => (
            <View key={index}>
              <UserCard user={item} />
            </View>
          )}
        />
      ) : (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            height: "80%",
          }}
        >
          <Text>No service provider here..</Text>
        </View>
      )}
    </View>
  );
};

export default ServiceProviders;

const styles = StyleSheet.create({});
