import { SafeAreaView, ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import React, { useRef, useState } from "react";
import {
  Button,
  Dialog,
  Modal,
  Portal,
  SegmentedButtons,
  Surface,
  Text,
  TextInput,
} from "react-native-paper";
import { useTransactionsStore, useUserStore } from "@/src/state/store";
import { CustomToast } from "@/src/utils/data";
import { verifyPayment } from "@/src/utils/paystack";
import { Paystack, paystackProps } from "react-native-paystack-webview";
import TransactionsPage from "@/src/components/TransactionsPage";


const index = () => {
  const [value, setValue] = useState("completed");

  const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

  const { user, increaseUserBalance } = useUserStore();
  const {transactions, addTransaction} = useTransactionsStore();

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>();

  const [paying, setPaying] = useState(false);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const completedTransaction = transactions.filter(trans => trans.status === 'success')
  const pendingTransaction = transactions.filter(trans => trans.status === 'pending')
  const failedTransaction = transactions.filter(trans => trans.status === 'failed')

  const balance = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "NGN",
  }).format(parseFloat(user?.walletBalance || 0));

  const HandlePayment = () => {
    const [amount, setAmount] = useState<number>(0);

    const makePayment = ({ data }) => {
      setPaying(true);
      hideModal();

      const reference = data.transactionRef.trxref;
      const rechargeAmount = amount - 50;

      verifyPayment(user!, reference).then((trans) => {
      if(trans){
        CustomToast("Successfull");
        addTransaction(trans)
        increaseUserBalance(rechargeAmount);
        setPaying(false);
      }else{
        CustomToast("Failed");
        addTransaction(trans)
      }
      });
    };

    return (
      <Dialog
        visible={visible}
        onDismiss={hideModal}
        style={{ padding: 5, justifyContent: "center", alignItems: "center" }}
      >
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
            gap: 20,
            marginVertical: 10,
            marginHorizontal: 5,
            width: "90%",
          }}
        >
          <TextInput
            mode="outlined"
            label="Amount"
            keyboardType="numeric"
            style={{ width: "100%" }}
            onChangeText={(value) => setAmount(parseFloat(value))}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Button mode="outlined" onPress={() => hideModal()}>
              Cancel
            </Button>
            <Button
              mode="contained"
              onPress={() => paystackWebViewRef.current.startTransaction()}
            >
              Continue
            </Button>
          </View>
        </View>
      </Dialog>
    );
  };



  return (
    <SafeAreaView > 
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
        <Portal>
          <HandlePayment />
        </Portal>
        <Button mode="outlined" icon="plus" onPress={showModal}>
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
            <ScrollView scrollEnabled showsVerticalScrollIndicator={false} >
      {value === "completed" ? (
        
        <TransactionsPage transactions={completedTransaction}/>
        
      ) : value === "pending" ? (
        
        <TransactionsPage transactions={pendingTransaction}/>
      ) : (
        
        <TransactionsPage transactions={failedTransaction}/>
      )}
      
      </ScrollView>
    </SafeAreaView>
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
