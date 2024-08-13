import Profile from "@/src/components/Profile";
import { Colors } from "@/src/constants/Colors";
import { useUsersStore } from "@/src/state/store";
import { fetchUserById } from "@/src/utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";
import { useColorScheme } from "react-native";

const UserProfile = () => {
  const { users } = useUsersStore();
  const navigation = useNavigation();
  const router= useRouter();

  const { id } = useLocalSearchParams();

  const [user, setUser] = useState<DocumentData | null>(null);

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === 'dark' ? '#fff' : '#000';


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
          headerLeft:null,
          headerRight: () => (
            <MaterialIcons
            name="home"
            color={iconColor}
            size={20}
              style={{ paddingRight: 10 }}
              onPress={() => router.replace('/')}
           />
          )
        });
        setUser(user);
      }
    }
  }, [id]);

  return <Profile user={user} />;
};

export default UserProfile;
