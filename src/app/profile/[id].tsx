import Profile from "@/src/components/Profile";
import { Colors } from "@/src/constants/Colors";
import { useUsersStore } from "@/src/state/store";
import { fetchUserById } from "@/src/utils/data";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";

const UserProfile = () => {
  const { users } = useUsersStore();

  const { id } = useLocalSearchParams();

  const user = fetchUserById(users, id.toLocaleString())!;

  return <Profile user={user} />;
};

export default UserProfile;
