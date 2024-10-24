import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { DocumentData } from "firebase/firestore";
import { useRouter } from "expo-router";

const Services = ({ service }: DocumentData) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={{ padding: 20 }}
      onPress={() => router.push(`/service/providers/${service._id}`)}
    >
      <Text style={{ fontSize: 18, fontWeight: "500" }}>{service?.name}</Text>
    </TouchableOpacity>
  );
};

export default Services;

const styles = StyleSheet.create({});
