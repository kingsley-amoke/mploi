import Profile from "@/src/components/Profile";
import { useUsersStore } from "@/src/state/store";
import { useLocalSearchParams } from "expo-router";
import React, { useMemo } from "react";

const UserProfile = () => {
  const { users } = useUsersStore();

  const { id } = useLocalSearchParams();

  const user = useMemo(() => users.find((user) => user._id === id)!, [id]);

  return <Profile user={user} />;
};

export default UserProfile;
