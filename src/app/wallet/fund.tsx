import { StyleSheet, Text, View } from "react-native";
import React, { useRef, useState } from "react";
import { verifyPayment } from "@/src/utils/paystack";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import { CustomToast } from "@/src/utils/data";
import { useTransactionsStore, useUserStore } from "@/src/state/store";
import { Button, TextInput } from "react-native-paper";

import { useRouter } from "expo-router";
import FancyHeader from "@/src/components/FancyHeader";

const fund = () => {
  const router = useRouter();
  const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY as string;
  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const { user } = useUserStore();

  const [paying, setPaying] = useState(false);
  const [amount, setAmount] = useState<number>(0);

  const makePayment = ({ data }) => {
    setPaying(true);

    const reference = data.transactionRef.trxref;

    verifyPayment(user, reference).then((data) => {
      if (data) {
        CustomToast("Successfull");
        setPaying(false);
        router.back();
      } else {
        CustomToast("Somethign went wrong");
        setPaying(false);
      }
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Fund Wallet" backButton />

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
            labelStyle={{ fontSize: 18, marginVertical: 10 }}
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
