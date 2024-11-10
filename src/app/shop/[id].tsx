import { ScrollView, StyleSheet, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useShopsStore } from "@/src/state/store";
import SubShop from "@/src/components/SubShop";
import { Divider, Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const { id: shopID } = useLocalSearchParams();
  const { shops } = useShopsStore();

  const router = useRouter();

  const currentShop = shops.find((shop) => shop._id === shopID);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
          paddingHorizontal: 20,

          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          {currentShop?.name}
        </Text>
      </LinearGradient>
      <ScrollView>
        {currentShop?.subshops.map((sub: { name: string }) => (
          <View key={sub.name}>
            <SubShop subshop={sub} />
            <Divider bold />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
