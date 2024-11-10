import { View, Pressable, ScrollView } from "react-native";
import { Button, Text } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Checkbox from "expo-checkbox";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { doc, getDoc, setDoc } from "firebase/firestore";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useLocationStore, useUserStore } from "@/src/state/store";
import { firestoreDB } from "../utils/firebaseConfig";
import { useForm } from "react-hook-form";
import ValidatedInput from "./ValidatedInput";
import { CustomToast, noAvatar } from "../utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";

const Signup = () => {
  const auth = getAuth();
  const router = useRouter();

  const { storeUser } = useUserStore();
  const { location } = useLocationStore();

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

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    if (!isChecked) {
      setError(true);
      return;
    }

    setLoading(true);

    createUserWithEmailAndPassword(auth, data.email, data.password).then(
      async ({ user }) => {
        const newUser = {
          _id: user.uid,
          email: user.email!,
          firstName: data.firstname,
          lastName: data.lastname,
          image: noAvatar,
          address: location[0].regionName.formattedAddress,
          nin: "",
          status: { isVIP: false, isVerified: true },
          referee: data.referee || "",
          phone: data.phone,
          phoneVerified: false,
          createdAt: Date.now(),
          bio: "",
          location: location[0],
          walletBalance: "0",
          referralBalance: "0",
          referral: [""],
          bankDetails: { accountName: "", accountNumber: "", bank: "" },
          isAdmin: false,
          coordinates: location[0].coordinates,
          suspended: false,
          testimonials: [],
          portfolio: [],
        };

        const userRef = doc(firestoreDB, "users", newUser._id);

        setDoc(userRef, newUser).then(async () => {
          const docSnap = await getDoc(userRef);

          storeUser(docSnap.data()!);

          router.push("/");
          CustomToast("Please update profile to continue");
          setLoading(false);
        });
      }
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
          justifyContent: "flex-start",
          alignItems: "flex-end",

          flexDirection: "row",
          paddingBottom: 10,
        }}
      >
        <Button
          mode="outlined"
          style={{ borderRadius: 2, marginLeft: 10 }}
          labelStyle={{ color: "white", fontWeight: "bold" }}
          onPress={() => router.back()}
        >
          BACK
        </Button>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            color: "white",
            position: "absolute",
            left: "40%",
            bottom: "10%",
          }}
        >
          MyPlug
        </Text>
      </LinearGradient>
      <ScrollView
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        {!isChecked && error && (
          <Text style={{ color: "red", fontSize: 16 }}>
            Please accept the terms and conditions
          </Text>
        )}
        <Text style={{ color: "red", fontSize: 16 }}>{errorMsg}</Text>
        <View>
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
          <ValidatedInput control={control} name="password" label="Password" />
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
            padding: 12,
          }}
          labelStyle={{ fontSize: 20 }}
          disabled={loading}
          onPress={handleSubmit(onSubmit)}
        >
          {loading ? "Please wait..." : "Sign Up"}
        </Button>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginVertical: 22,
          }}
        >
          <Text style={{ fontSize: 16 }}>Already have an account?</Text>
          <Pressable onPress={() => router.push("/login")}>
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
    </View>
  );
};

export default Signup;
