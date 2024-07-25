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

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { AuthRequestPromptOptions, AuthSessionResult } from "expo-auth-session";
import { useUserStore } from "@/src/state/store";
import { fetchUser } from "@/src/utils/userActions";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";
import { doc, getDoc } from "firebase/firestore";
import { firestoreDB } from "../utils/firebaseConfig";

const Login = ({
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

  const { storeUser } = useUserStore();

  const [isPasswordShown, setIsPasswordShown] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;

        const userRef = doc(firestoreDB, "users", user.uid);

        getDoc(userRef).then((doc) => {
          storeUser(doc.data()!);

          setLoading(false);
          AsyncStorage.setItem("@user", JSON.stringify(doc.data()));
          router.replace("/");
        });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        setError(errorCode);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, marginHorizontal: 22 }}>
        {error && (
          <Text style={{ color: "red", fontSize: 18 }}>
            Invalid Email or password
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
            Hi Welcome Back ! 👋
          </Text>

          <Text
            style={{
              fontSize: 16,
            }}
          >
            Login to start working
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

        <View style={{ marginBottom: 12 }}>
          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter your password"
            placeholderTextColor={placeholderColor}
            onChangeText={(value) => setPassword(value)}
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
          <Text>Remenber Me</Text>
        </View>

        <Button
          title={loading ? "Please wait..." : "Login"}
          filled
          disabled={loading}
          style={{
            marginTop: 18,
            marginBottom: 4,
            borderColor: borderColor,
          }}
          onPress={(e: GestureResponderEvent) => handleLogin(e)}
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
          <Text style={{ fontSize: 14 }}>Or Login with</Text>
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
          <Text style={{ fontSize: 16 }}>Don't have an account ? </Text>
          <Pressable onPress={() => router.replace("/register")}>
            <Text
              style={{
                fontSize: 16,

                fontWeight: "bold",
                marginLeft: 6,
              }}
            >
              Register
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
