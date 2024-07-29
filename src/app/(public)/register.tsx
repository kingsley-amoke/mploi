import { StyleSheet, Text, View } from "react-native";
import React from "react";
import  Signup from "@/src/components/Signup";

// const androidClientId = process.env.EXPO_PUBLIC_ANDROID_CLIENT_ID as string;
// const iosClientId = process.env.EXPO_PUBLIC_IOS_CLIENT_ID as string;
// const webClientId = process.env.EXPO_PUBLIC_WEB_CLIENT_ID as string;

const register = () => {


  return (
    <View style={{ minHeight: 1000, marginTop: 120 }}>
      <Signup  />
    </View>
  );
};

export default register;

const styles = StyleSheet.create({});
