import Profile from "@/src/components/Profile";
import { useUsersStore } from "@/src/state/store";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";

const UserProfile = () => {
  const { id } = useLocalSearchParams();

  return <Profile userId={id.toString()} />;
};

export default UserProfile;
