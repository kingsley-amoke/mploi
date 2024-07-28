import { StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import  Login  from "@/src/components/Login";
import { useRouter } from "expo-router";
import * as Google from "expo-auth-session/providers/google";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { fetchUser, syncUser } from "@/src/utils/userActions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useUserStore } from "@/src/state/store";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { DBUser } from "@/src/utils/types";

const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID as string;
const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID as string;
const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string;

const LoginPage = () => {
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

        const userRef = doc(firestoreDB, "users", user.uid);

        getDoc(userRef).then((doc) => {
          if(doc.data()){

            storeUser(doc.data()!);
            AsyncStorage.setItem("@user", JSON.stringify(doc.data()));
            router.replace("/");
          }else{

            const newUser: DBUser = {
              _id: user.uid,
              email: user.email!,
              firstName: "",
              lastName: "",
              image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              address:"",
              nin: "",
              status: {isVIP: false, isVerified: false},
              referee: "",
              phone: "",
              phoneVerified: false,
              createdAt: Date.now(),
              bio: "",
              location: {country: "",
                state: "",
                lga: "",},
              walletBalance: "",
              referralBalance: "",
              referral: [""],
              bankDetails: {accountName: "", accountNumber: "", bank:""},
              isAdmin: false,
              
            }

            // const userRef = doc(firestoreDB, "users", newUser._id)

            setDoc(userRef, newUser).then(async() => {

             
              const docSnap = await getDoc(userRef);

              storeUser(docSnap.data()!)
              AsyncStorage.setItem("@user", JSON.stringify(docSnap.data()))
              router.push('profile/edit');
            })
          }
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error)

     
      });
    }
  }, [response]);

  return (
    <View style={{ minHeight: 1000, marginTop: 200 }}>
      <Login promptAsync={promptAsync} />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
