import {
  View,
  Pressable,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import Button from "@/src/components/Button";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as Location from "expo-location";

import { useUserStore } from "@/src/state/store";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";
import { DBUser } from "../utils/types";
import { firestoreDB } from "../utils/firebaseConfig";

const Signup = () => {
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
  const [errorMsg, setErrorMsg] = useState("");
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

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password).then(
      async (userCredential) => {
        // Signed up

        const user = userCredential.user;

        const userPhone = countryCode + phone;

        const newUser: DBUser = {
          _id: user.uid,
          email: user.email!,
          firstName: "",
          lastName: "",
          image:
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
          address: "",
          nin: "",
          status: { isVIP: false, isVerified: false },
          referee: referee || "",
          phone: userPhone,
          phoneVerified: false,
          createdAt: Date.now(),
          bio: "",
          location: { country: "", state: "", lga: "" },
          walletBalance: "",
          referralBalance: "",
          referral: [""],
          bankDetails: { accountName: "", accountNumber: "", bank: "" },
          isAdmin: false,
          coordinates: coords,
        };

        const userRef = doc(firestoreDB, "users", newUser._id);

        setDoc(userRef, newUser).then(async () => {
          const docSnap = await getDoc(userRef);

          storeUser(docSnap.data()!);

          setLoading(false);
          AsyncStorage.setItem("@user", JSON.stringify(docSnap.data()));
          router.push("profile/edit");
        });
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1, marginHorizontal: 22 }}>
        {!isChecked && error && (
          <Text style={{ color: "red", fontSize: 16 }}>
            Please accept the terms and conditions
          </Text>
        )}
        <Text style={{ color: "red", fontSize: 16 }}>{errorMsg}</Text>
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
            label="First Name"
            placeholder="First Name"
            placeholderTextColor={placeholderColor}
            keyboardType="default"
            onChangeText={(value) => setEmail(value)}
          />
        </View>
        
        <View style={{ marginBottom: 12 }}>
          <TextInput
            mode="outlined"
            label="Last Name"
            placeholder="Last Name"
            placeholderTextColor={placeholderColor}
            keyboardType="default"
            onChangeText={(value) => setEmail(value)}
          />
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
      </ScrollView>
    </SafeAreaView>
  );
};

export default Signup;
