import {
  View,
  Pressable,
  ScrollView,
} from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as Location from "expo-location";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useUserStore } from "@/src/state/store";
import { DBUser } from "../utils/types";
import { firestoreDB } from "../utils/firebaseConfig";
import { useForm } from "react-hook-form";
import ValidatedInput from "./ValidatedInput";

const Signup = () => {
  const auth = getAuth();
  const router = useRouter();

  const { storeUser } = useUserStore();

  const [isChecked, setIsChecked] = useState(false);
  const [error, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const formSchema = z
    .object({
      firstname: z
        .string()
        .toLowerCase()
        .min(3, "FirstName must be more than 3 letters"),
      lastname: z
        .string()
        .toLowerCase()
        .min(3, "LastName must be more than 3 letters"),
      email: z.string().email("Please enter a valid email"),
      phone: z.string().min(11, "Please enter a valid phone number"),
      referee: z.string().optional(),
      password: z.string().min(6, "Password must be at least 6 characters"),
      passwordConfirm: z.string(),
    })
    .refine(
      (data) => {
        return data.password === data.passwordConfirm;
      },
      {
        message: "Passwords do not match",
        path: ["passwordConfirm"],
      }
    );

  const { control, handleSubmit } = useForm({
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
      passwordConfirm: "",
  
    },
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data:z.infer<typeof formSchema>) => {

    if (!isChecked) {
      setError(true);
      return;
    }

    setLoading(true);

    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    console.log(status);

    let location = await Location.getCurrentPositionAsync({});

    const coords = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };

    let regionName = await Location.reverseGeocodeAsync(coords);

    createUserWithEmailAndPassword(auth, data.email, data.password).then(async({user})=>{

      const newUser = {
        _id: user.uid,
        email: user.email!,
        firstName: data.firstname,
        lastName: data.lastname,
        image:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
        address: regionName[0].formattedAddress,
        nin: "",
        status: { isVIP: false, isVerified: true },
        referee: data.referee || "",
        phone: data.phone,
        phoneVerified: false,
        createdAt: Date.now(),
        bio: "",
        location: regionName[0],
        walletBalance: "0",
        referralBalance: "0",
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
          router.push("/profile/edit");
        });

    })
 
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
          <ValidatedInput
            control={control}
            name="firstname"
            label="First Name"
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <ValidatedInput control={control} name="lastname" label="Last Name" />
        </View>

        <View style={{ marginBottom: 12 }}>
          <ValidatedInput
            control={control}
            name="email"
            label="Email Address"
            keyboardType="email-address"
          />
        </View>

        <View style={{ marginBottom: 12 }}>
        
        <ValidatedInput
            control={control}
            name="phone"
            label="Phone Number"
            keyboardType="numeric"
          />
        </View>

        <View style={{ marginBottom: 12 }}>
          <ValidatedInput control={control} name="password" label="Password"/>
        </View>
        <View style={{ marginBottom: 12 }}>
          <ValidatedInput
            control={control}
            name="passwordConfirm"
            label="Confirm Password"
          />
        </View>
        <View style={{ marginBottom: 12 }}>
          <ValidatedInput
            control={control}
            name="referee"
            label="Referee (Optional)"
            keyboardType="email-address"
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
          mode="contained"
          style={{
            marginTop: 18,
            marginBottom: 4,
          }}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </Button>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 20,
          }}
        ></View>

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
