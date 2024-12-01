import { StyleSheet, Text, View } from "react-native";
import React from "react";
import EditProfile from "@/src/components/EditProfile";
import { useNavigation } from "expo-router";

const edit = () => {
  const navigation = useNavigation();
  return <EditProfile />;
};

export default edit;

const styles = StyleSheet.create({});
