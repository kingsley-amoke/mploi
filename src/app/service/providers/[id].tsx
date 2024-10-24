import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import React from "react";
import {
  useCategoryStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { Divider } from "react-native-paper";
import UserCard from "@/src/components/UserCard";

const ServiceProviders = () => {
  const { id: categoryID } = useLocalSearchParams();
  const { categories } = useCategoryStore();
  const { users } = useUsersStore();
  const { user: loggedUser } = useUserStore();

  const router = useRouter();

  const currentCategory = categories.find(
    (category) => category._id === categoryID
  );

  const serviceProviders = users.filter((user) => {
    return (
      user._id !== loggedUser?._id &&
      user.skills &&
      user.skills.includes(currentCategory?.name)
    );
  });

  return (
    <SafeAreaView>
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
          {currentCategory?.name}
        </Text>
      </LinearGradient>
      {serviceProviders.map((provider, index) => (
        <View key={index}>
          <UserCard user={provider} />
        </View>
      ))}
    </SafeAreaView>
  );
};

export default ServiceProviders;

const styles = StyleSheet.create({});
