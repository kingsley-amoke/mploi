import { StyleSheet, Text, View } from "react-native";
import React, { ReactElement } from "react";
import { useRootNavigation, useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const FancyHeader = ({
  title,
  subtitle,
  backButton,
  rightComponent,
}: {
  title: string;
  subtitle?: string;
  backButton?: boolean;
  rightComponent?: ReactElement;
}) => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      style={{
        height: "12%",
        paddingHorizontal: 20,
        paddingBottom: 30,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "flex-end",
      }}
    >
      {backButton && (
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
      )}
      <View style={{ flex: 1 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            textTransform: "capitalize",
          }}
        >
          {title}
        </Text>
        {subtitle && (
          <Text style={{ textAlign: "center", color: Colors.lightgrey }}>
            {subtitle}
          </Text>
        )}
      </View>
      {rightComponent && rightComponent}
    </LinearGradient>
  );
};

export default FancyHeader;
