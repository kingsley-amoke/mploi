import { StyleSheet, View } from "react-native";
import React from "react";
import  Login  from "@/src/components/Login";


const LoginPage = () => {


  return (
    <View style={{ minHeight: 1000, marginTop: 200 }}>
      <Login />
    </View>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
