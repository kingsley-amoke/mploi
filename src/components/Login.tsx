import {
  View,
  Pressable,
  GestureResponderEvent,
  ScrollView,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Checkbox from "expo-checkbox";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "expo-router";
import { CustomToast } from "../utils/data";
import FancyHeader from "./FancyHeader";

const Login = () => {
  const auth = getAuth();
  const router = useRouter();

  const [isChecked, setIsChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [show, setShow] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: GestureResponderEvent) => {
    e.preventDefault();
    setLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        router.replace("/");
        CustomToast("Logged in Successfully");

        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  };

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="MyPlug" backButton />
      <ScrollView
        style={{ marginHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ flex: 1, marginHorizontal: 10 }}>
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
              keyboardType="email-address"
              onChangeText={(value) => setEmail(value)}
            />
          </View>

          <View style={{ marginBottom: 12 }}>
            <TextInput
              mode="outlined"
              label="Password"
              placeholder="Enter your password"
              secureTextEntry={show}
              style={{ position: "relative" }}
              onChangeText={(value) => setPassword(value)}
            />
            <MaterialCommunityIcons
              name={!show ? "eye" : "eye-off"}
              size={20}
              style={{ position: "absolute", right: 20, top: 20 }}
              onPress={() => setShow(!show)}
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
            <Text>Remember Me</Text>
          </View>

          <Button
            mode="contained"
            disabled={loading}
            style={{
              marginTop: 18,
              marginBottom: 4,
              paddingVertical: 10,
            }}
            labelStyle={{ fontSize: 20 }}
            onPress={(e: GestureResponderEvent) => handleLogin(e)}
          >
            {loading ? (
              <Text style={{ color: "#ffffff" }}>Please wait...</Text>
            ) : (
              <Text style={{ color: "#ffffff", fontWeight: "800" }}>Login</Text>
            )}
          </Button>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginVertical: 22,
            }}
          >
            <Text style={{ fontSize: 16 }}>Don't have an account ? </Text>
            <Pressable onPress={() => router.push("/register")}>
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
      </ScrollView>
    </View>
  );
};

export default Login;
