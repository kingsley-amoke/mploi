import Profile from "@/src/components/Profile";
import { useUsersStore } from "@/src/state/store";
import { fetchUserById } from "@/src/utils/data";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";

const UserProfile = () => {
  const { users } = useUsersStore();
  const navigation = useNavigation();

  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<DocumentData | null>(null);

  useLayoutEffect(() => {
    if (!id) {
      navigation.goBack();
    } else {
      const user = fetchUserById(users, id.toLocaleString());
      if (!user) {
        navigation.goBack();
      } else {
        navigation.setOptions({
          title: user?.firstName + " " + user?.lastName,
        });
        setUser(user);
      }
    }
  }, [id]);

  return <Profile user={user} />;
};

export default UserProfile;
