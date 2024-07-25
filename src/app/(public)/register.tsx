import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import  Signup from "@/src/components/Signup";
import { useNavigation, useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  GoogleAuthProvider,
  User,
  onAuthStateChanged,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "@/src/utils/firebaseConfig";
import { fetchUser, syncUser } from "@/src/utils/userActions";
import { useUserStore } from "@/src/state/store";

const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID as string;
const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID as string;
const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string;

const register = () => {
  const router = useRouter();

  const {storeUser} = useUserStore()

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: androidClientId, iosClientId:iosClientId, webClientId:webClientId
  });

  useLayoutEffect(() => {
    if (response?.type == "success") {
      const { id_token } = response.params;
      const credentials = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credentials).then(async (userCredentials) => {
        const user = userCredentials.user;

        await AsyncStorage.setItem("@user", JSON.stringify(user)).then(
          async () => {
            const syncedUser = await fetchUser(user.email!);
            if (syncedUser.email) {
              storeUser(syncedUser);
              router.replace("/");
            } else {
              const userData = {
                firstName: user.displayName?.split(" ")[0]!,
                lastName: user.displayName?.split(" ")[1]!,
                image: user.photoURL!,
                email: user.email!,
                phone: user.phoneNumber!,
                password: "",
                referee: "",
              };

              await syncUser(userData);
              
            }
          }
        );
      });
    }
  }, [response]);

  return (
    <View style={{ minHeight: 1000, marginTop: 120 }}>
      <Signup promptAsync={promptAsync} />
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});
