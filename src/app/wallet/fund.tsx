import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { verifyPayment } from "@/src/utils/paystack";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { CustomToast } from "@/src/utils/data";
import { useTransactionsStore, useUserStore } from "@/src/state/store";
import { Button, TextInput } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const fund = () => {
  const router = useRouter();
  const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const { user, increaseUserBalance } = useUserStore();
  const { addTransaction } = useTransactionsStore();

  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  const makePayment = ({ data }) => {
    setPaying(true);

    const reference = data.transactionRef.trxref;
    const rechargeAmount = amount - 50;

    verifyPayment(user!, reference).then((trans) => {
      if (trans) {
        CustomToast("Successfull");
        addTransaction(trans);
        increaseUserBalance(rechargeAmount);
        setPaying(false);
        router.back();
      } else {
        CustomToast("Failed");
        addTransaction(trans);
        setPaying(false);
      }
    });
  };

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
          Fund Wallet
        </Text>
      </LinearGradient>

      <Paystack
        paystackKey={paystackKey}
        amount={amount}
        channels={[
          "bank_transfer",
          "card",
          "bank",
          "qr",
          "mobile_money",
          "ussd",
        ]}
        billingEmail={user?.email!}
        activityIndicatorColor="teal"
        onCancel={(e) => {
          CustomToast("Payment cancelled");
        }}
        onSuccess={(res) => {
          makePayment(res);
        }}
        ref={paystackWebViewRef}
      />
      <View
        style={{
          width: "100%",
          height: "70%",
          alignItems: "center",
          padding: 10,
        }}
      >
        <View
          style={{
            borderWidth: 1,
            borderRadius: 10,
            width: "90%",
            height: "70%",
            gap: 50,
          }}
        >
          <Text>
            To fund your wallet, enter the amount and press the button below.
          </Text>
          <TextInput
            onChangeText={(value) => setAmount(parseFloat(value))}
            style={{ borderWidth: 1, borderRadius: 5 }}
            placeholder="Enter amount"
          />
          <Button
            mode="contained"
            style={{ width: "60%" }}
            onPress={() => paystackWebViewRef?.current?.startTransaction()}
          >
            {paying ? "Please wait..." : "Make Payment"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default fund;

const styles = StyleSheet.create({});
