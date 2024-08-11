import { SafeAreaView, StyleSheet, useColorScheme, View } from "react-native";
import React, { useRef, useState } from "react";
import { Button, Modal, Portal, SegmentedButtons, Surface, Text, TextInput, useTheme } from "react-native-paper";
import { useUserStore } from "@/src/state/store";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { CustomToast } from "@/src/utils/data";
import { verifyPayment } from "@/src/utils/paystack";
import { Paystack, paystackProps } from "react-native-paystack-webview";

const index = () => {


  const [value, setValue] = useState('all');


  const router = useRouter();

  const paystackKey = process.env.EXPO_PUBLIC_PAYSTACK_PUBLIC_KEY as string;

  const { user, increaseUserBalance } = useUserStore();
  const colorScheme = useColorScheme();

  const paystackWebViewRef = useRef<paystackProps.PayStackRef>(); 

  
  const [paying, setPaying] = useState(false);

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);


  const errorBgColor = colorScheme === "dark" ? Colors.dark.error : Colors.light.error;
  const errorTextColor = colorScheme === "dark"? Colors.dark.onError : Colors.light.onError;

  const balance = new Intl.NumberFormat('en-UK', {style:'currency', currency: 'NGN'}).format(parseFloat(user?.walletBalance || 0));




  const HandlePayment = () => {

    const [amount, setAmount] = useState<number>(0);

    const makePayment = ({data}) => {

      
      setPaying(true)
      hideModal();
      
      const reference = data.transactionRef.trxref;
      const rechargeAmount = (amount - 50)
      
      verifyPayment(user!, reference).then(() => {
      CustomToast("Successfull", 'green', 'white')
      increaseUserBalance(rechargeAmount)
      setPaying(false)
    })
  }

    return(
      <Modal 
       visible={visible}
      onDismiss={hideModal}
      contentContainerStyle={{
        backgroundColor: "gray",
        padding: 20,
        height: "70%",
      }}>
      <Paystack 
      paystackKey={paystackKey}
      amount={amount}
      channels={['bank_transfer', 'card', 'bank', 'qr', 'mobile_money', 'ussd']}
    
      billingEmail={user?.email!}
      activityIndicatorColor="teal"
      onCancel={(e) => {
        CustomToast("Payment cancelled", errorBgColor, errorTextColor)
      }}
      onSuccess={(res) => {
        makePayment(res)
      }}
      ref={paystackWebViewRef}
/>
<View style={{gap:20, marginHorizontal:20}}>

      <TextInput mode="outlined" label="Amount" onChangeText={(value) => setAmount(parseFloat(value))} />
<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Button mode="outlined" onPress={() => hideModal()}>Cancel</Button>
      <Button mode="contained" onPress={()=> paystackWebViewRef.current.startTransaction()}>Continue</Button>
</View>
</View>
      </Modal>
    )

  }

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          padding: 10,
          justifyContent: "flex-end",
          alignItems: "flex-end",
          gap:20,
          marginVertical:20
        }}
      >
       
        <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>

        <Surface style={styles.surface} elevation={4}>
          <Text disabled variant="titleLarge">Balance</Text>
          <Text>{balance}</Text>
        </Surface>
        </View>
        <Portal>

        <HandlePayment />
        </Portal>
        <Button mode="outlined" icon="plus"  onPress={showModal}>Fund Wallet</Button>
      </View>

      <View style={{paddingHorizontal:10}}>
        <Text variant="bodyLarge" style={{marginVertical:10, marginLeft:5}}>Payment History</Text>
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
         buttons={[
          {
            label:'All',
            value: 'all'
          },
          {
            label:'Pending',
            value:'pending'
          },
          {
            label: 'Completed',
            value:'completed'
          }

        ]} />
      </View>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  surface: {
    padding: 8,
    paddingTop:10,
    height: 120,
    width: 300,
    gap:10,
    borderRadius:10
  },
});
