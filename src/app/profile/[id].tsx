import Profile from "@/src/components/Profile";
import { Colors } from "@/src/constants/Colors";
import { useUsersStore } from "@/src/state/store";
import { fetchUserById } from "@/src/utils/data";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useLayoutEffect, useState } from "react";

const UserProfile = () => {
  const { users } = useUsersStore();
  const navigation = useNavigation();
  const router= useRouter();

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
           headerStyle:{backgroundColor:Colors.light.primary},
             headerTintColor:'white',
          headerRight: () => (
            <MaterialIcons
            name="home"
            color='white'
            size={30}
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
