import { ScrollView, StyleSheet, View } from "react-native";
import React, { useMemo, useState } from "react";
import { Button, SegmentedButtons, Surface, Text } from "react-native-paper";
import { useTransactionsStore, useUsersStore } from "@/src/state/store";

import TransactionsPage from "@/src/components/TransactionsPage";
import { useRouter } from "expo-router";
import { formatPrice } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { auth } from "@/src/utils/firebaseConfig";

export default function Wallet() {
  // const [value, setValue] = useState("completed");

  const router = useRouter();

  // const { transactions } = useTransactionsStore();

  // const { users } = useUsersStore();

  // const user = useMemo(
  //   () => users.find((usr) => usr._id === auth.currentUser?.uid)!,
  //   [users.length]
  // );

  // const completedTransaction = transactions.filter(
  //   (trans) =>
  //     trans.status === "success" && trans.userId === auth.currentUser?.uid
  // );
  // const pendingTransaction = transactions.filter(
  //   (trans) =>
  //     trans.status === "pending" && trans.userId === auth.currentUser?.uid
  // );
  // const failedTransaction = transactions.filter(
  //   (trans) =>
  //     trans.status === "failed" && trans.userId === auth.currentUser?.uid
  // );

  // const balance = formatPrice(parseFloat(user?.walletBalance || 0));
  const balance = 0;

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
      {auth.currentUser ? (
        <>
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
              <Surface
                style={{
                  padding: 8,
                  paddingTop: 10,
                  height: 120,
                  width: 300,
                  gap: 10,
                  borderRadius: 10,
                }}
                elevation={4}
              >
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

          {/* <View style={{ paddingHorizontal: 10 }}>
            <Text
              variant="bodyLarge"
              style={{ marginVertical: 10, marginLeft: 5 }}
            >
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
          </View> */}
          {/* <ScrollView scrollEnabled showsVerticalScrollIndicator={false}>
            {value === "completed" ? (
              <TransactionsPage transactions={completedTransaction} />
            ) : value === "pending" ? (
              <TransactionsPage transactions={pendingTransaction} />
            ) : (
              <TransactionsPage transactions={failedTransaction} />
            )}
          </ScrollView> */}
        </>
      ) : (
        <View style={{ marginTop: 40 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Please login to see your wallet.
          </Text>
          <Button
            mode="contained"
            labelStyle={{ fontSize: 20 }}
            style={{
              marginTop: 20,
              marginLeft: 10,
              borderRadius: 15,
              width: "50%",
            }}
            onPress={() => router.push("/login")}
          >
            Login
          </Button>
        </View>
      )}
    </View>
  );
}
