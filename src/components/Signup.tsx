import {
  View,
  Image,
  Pressable,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";
import Button from "@/src/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { fetchUser, syncUser } from "@/src/utils/userActions";
import { useRouter } from "expo-router";
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";
// import { SuccessToast } from "@/src/utils/data";
import { useUserStore } from "@/src/state/store";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";
import { DBUser } from "../utils/types";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { ref } from "firebase/database";
import { firestoreDB } from "../utils/firebaseConfig";

const Signup = ({
  promptAsync,
}: {
  promptAsync: (
    options?: AuthRequestPromptOptions | undefined
  ) => Promise<AuthSessionResult>;
}) => {
  const auth = getAuth();
  const router = useRouter();

  const { colorScheme } = useTheme();

  const placeholderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const textColor =
    colorScheme === "dark"
      ? Colors.dark.onBackground
      : Colors.light.onBackground;

  const { storeUser } = useUserStore();

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [password, setPassword] = useState("");
  const [referee, setReferee] = useState("");

  const handleSignup = async (e: GestureResponderEvent) => {
    e.preventDefault();
    if (!isChecked) {
      setError(true);
      return;
    }

    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed up

        const user = userCredential.user;           

            const userPhone = countryCode + phone

            const newUser: DBUser = {
              _id: user.uid,
              email: user.email!,
              firstName: "",
              lastName: "",
              image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
              address:"",
              nin: "",
              status: {isVIP: false, isVerified: false},
              referee: referee || "",
              phone: userPhone,
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

            const userRef = doc(firestoreDB, "users", newUser._id)

            setDoc(userRef, newUser).then(async() => {

             
              const docSnap = await getDoc(userRef);

              storeUser(docSnap.data()!)

              setLoading(false);
              AsyncStorage.setItem("@user", JSON.stringify(docSnap.data()))
              router.push('profile/edit');
            })

          })}
  

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        {!isChecked && error && (
          <Text style={{ color: "red", fontSize: 16 }}>
            Please accept the terms and conditions
          </Text>
        )}
        <View style={{ marginVertical: 22 }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: "bold",
              marginVertical: 12,
            }}
          >
            Create Account
          </Text>

          <Text
            style={{
              fontSize: 16,
            }}
          >
            Start working today
          </Text>
        </View>

        <View style={{ marginBottom: 12 }}>
          <TextInput
            mode="outlined"
            label="Email address"
            placeholder="Enter your email address"
            placeholderTextColor={placeholderColor}
            keyboardType="email-address"
            onChangeText={(value) => setEmail(value)}
          />
        </View>

        <View style={{ marginBottom: 12, flexDirection: "row", gap: 10 }}>
          <TextInput
            mode="outlined"
            label={countryCode ? countryCode : "+1"}
            placeholder="+1"
            placeholderTextColor={placeholderColor}
            keyboardType="phone-pad"
            style={{
              width: 60,
            }}
            onChangeText={(value) => setCountryCode(value)}
          />

          <TextInput
            mode="outlined"
            label="Phone Number"
            placeholder="Enter your phone number"
            placeholderTextColor={placeholderColor}
            keyboardType="numeric"
            style={{
              width: 300,
            }}
            onChangeText={(value) => setPhone(value)}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor={placeholderColor}
            
           
            onChangeText={(value) => setPassword(value)}
          />
        </View>

        <View style={{ marginBottom: 12 }}>
         
            <TextInput
            mode="outlined"
            label="Referee (optional)"
              placeholder="Your referee's email address"
              placeholderTextColor={placeholderColor}
              keyboardType="email-address"
              onChangeText={(value) => setReferee(value)}
            />
         
        </View>
        <View
          style={{
            flexDirection: "row",
            marginVertical: 6,
          }}
        >
          <Checkbox
            style={{ marginRight: 8 }}
            value={isChecked}
            onValueChange={setIsChecked}
          />

          <Text>I agree to the terms and conditions</Text>
        </View>

        <Button
          title={loading ? "Please wait..." : "Sign Up"}
          filled
          style={{
            marginTop: 18,
            marginBottom: 4,
            borderColor: borderColor,
          }}
          disabled={loading}
          onPress={(e: GestureResponderEvent) => handleSignup(e)}
        />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,

              marginHorizontal: 10,
            }}
          />
          <Text style={{ fontSize: 14 }}>Or Sign up with</Text>
          <View
            style={{
              flex: 1,
              height: 1,

              marginHorizontal: 10,
            }}
          />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => console.log("Pressed")}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: borderColor,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/images/facebook.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Facebook</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => promptAsync()}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "row",
              height: 52,
              borderWidth: 1,
              borderColor: borderColor,
              marginRight: 4,
              borderRadius: 10,
            }}
          >
            <Image
              source={require("@/assets/images/google.png")}
              style={{
                height: 36,
                width: 36,
                marginRight: 8,
              }}
              resizeMode="contain"
            />

            <Text>Google</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16 }}>Already have an account?</Text>
          <Pressable onPress={() => router.replace("/login")}>
            <Text
              style={{
                fontSize: 16,

                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Signup;
