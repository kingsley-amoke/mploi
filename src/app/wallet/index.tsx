import { ScrollView, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { Button, SegmentedButtons, Surface, Text } from "react-native-paper";
import { useTransactionsStore, useUserStore } from "@/src/state/store";

import TransactionsPage from "@/src/components/TransactionsPage";
import { useRouter } from "expo-router";
import { formatPrice } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const index = () => {
  const [value, setValue] = useState("completed");

  const router = useRouter();

  const { transactions } = useTransactionsStore();

  const { user } = useUserStore();

  const completedTransaction = transactions.filter(
    (trans) => trans.status === "success" && trans.userId === user._id
  );
  const pendingTransaction = transactions.filter(
    (trans) => trans.status === "pending" && trans.userId === user._id
  );
  const failedTransaction = transactions.filter(
    (trans) => trans.status === "failed" && trans.userId === user._id
  );

  const balance = formatPrice(parseFloat(user?.walletBalance || 0));

  return (
    <View style={{ flex: 1 }}>
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
          Wallet
        </Text>
      </LinearGradient>
      <View
        style={{
          width: "100%",
          padding: 10,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap: 20,
          marginVertical: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Surface style={styles.surface} elevation={4}>
            <Text disabled variant="titleLarge">
              Balance
            </Text>
            <Text>{balance}</Text>
          </Surface>
        </View>

        <Button
          mode="outlined"
          icon="plus"
          onPress={() => router.push("/wallet/fund")}
        >
          Fund Wallet
        </Button>
      </View>

      <View style={{ paddingHorizontal: 10 }}>
        <Text variant="bodyLarge" style={{ marginVertical: 10, marginLeft: 5 }}>
          Payment History
        </Text>
        <SegmentedButtons
          value={value}
          onValueChange={setValue}
          buttons={[
            {
              label: "Completed",
              value: "completed",
            },
            {
              label: "Pending",
              value: "pending",
            },
            {
              label: "Failed",
              value: "failed",
            },
          ]}
        />
      </View>
      <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
        {value === "completed" ? (
          <TransactionsPage transactions={completedTransaction} />
        ) : value === "pending" ? (
          <TransactionsPage transactions={pendingTransaction} />
        ) : (
          <TransactionsPage transactions={failedTransaction} />
        )}
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    paddingTop: 10,
    height: 120,
    width: 300,
    gap: 10,
    borderRadius: 10,
  },
});
