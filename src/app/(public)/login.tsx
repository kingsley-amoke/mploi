import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import Login from "@/src/components/Login";

const LoginPage = () => {
  return (
    <ScrollView style={{ minHeight: 1000 }}>
      <Login />
    </ScrollView>
  );
};

export default LoginPage;

const styles = StyleSheet.create({});
