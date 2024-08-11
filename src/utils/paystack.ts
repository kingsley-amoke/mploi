//env variables

import { doc, DocumentData, setDoc, updateDoc } from "firebase/firestore"
import { firestoreDB } from "./firebaseConfig"

const url = process.env.EXPO_PUBLIC_PAYSTACK_URL!
const secretKey = process.env.EXPO_PUBLIC_PAYSTACK_KEY!



//fetch all banks

export const fetchAllBanks = async() => {
    const banks = await fetch(`${url}/bank`)
    const data = await banks.json()

  return data.data
}


//bank names

export const getBankByCode = async(code:string) => {
    const response = await fetchAllBanks().then((res) => {
        const banks = res.filter((bank: any) => (bank.code === code))
        return banks
    });

    return response
}

//validate account number 

export const validateAccountNumber = async(accountNumber:string, bankCode:string) => {

    const options = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + secretKey
        },
        
    }

    const res = await fetch(`${url}/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, options)

    const data = await res.json()

    return data
}

//payment paystack

const getPaystackHeaders = () => ({
  Authorization: `Bearer ${secretKey}`,
  "Content-Type": "application/json",
});


export const verifyPaystackTransaction = async (reference: string) => {
    try {
      const response = await fetch(
        `https://api.paystack.co/transaction/verify/${reference}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer sk_test_f00d49b65c08bc9a3478a679118bdb1042c148e2`,
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      return error;
    }
  };


export const verifyPayment = async (user: DocumentData, reference: string) => {
    const response = await verifyPaystackTransaction(reference);
    if (response.data.status === "success") {
      const trans: DocumentData = {
        email: user.email,
        purpose: "wallet",
        amount: (response.data.amount / 100).toString(),
        status: response.data.status,
        channel: response.data.channel,
        currency: response.data.currency,
        previousBalance: user?.balance,
        newBalance: (
          response.data.amount / 100 +
          parseInt(user?.balance)
        ).toString(),
        reference: reference,
        transactionId: response.data.id,
      };
  
      const rechargeAmount = (parseInt(trans.amount) - 50).toString();
  
      recharge(user?._id, rechargeAmount);
  
      setTransaction(trans);
    }
  
    return "finished";
  };

  const recharge = (id: string, rechargeAmount: string) => {

    const userRef = doc(firestoreDB, "users", id?.toString()!);

    updateDoc(userRef, {
      walletBalance: rechargeAmount,
    });
  }

  const setTransaction = (transaction: DocumentData) => {


    const transRef = doc(firestoreDB, "transactions", transaction.transactionId)
    
    setDoc(transRef, transaction)
  }