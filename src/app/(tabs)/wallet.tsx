import { Pressable, SectionList, View } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Button, Surface, Text } from "react-native-paper";
import { useTransactionsStore, useUsersStore } from "@/src/state/store";
import { useRouter } from "expo-router";
import { formatPrice, groupDataByDate } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { collection, DocumentData, onSnapshot } from "firebase/firestore";
import moment from "moment";
import FancyHeader from "@/src/components/FancyHeader";

export default function Wallet() {
  const router = useRouter();

  const { transactions, storeTransactions } = useTransactionsStore();
  const { users } = useUsersStore();

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const user = useMemo(
    () => users.find((usr) => usr._id === auth.currentUser?.uid)!,
    [users.length]
  );

  const balance = formatPrice(parseFloat(user?.walletBalance || 0));

  const myFunc = useCallback(
    (data) => groupDataByDate(data),
    [transactions.length]
  );
  const groupedTransactions = myFunc(transactions);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(firestoreDB, "transactions"),
      (snapshot) => {
        const transArray = snapshot.docs.map((document) => {
          return document.data();
        });
        storeTransactions(transArray);
      }
    );

    return () => unsubscribe();
  }, [auth.currentUser?.uid]);

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Wallet" />
      {auth.currentUser ? (
        <View
          style={{
            width: "100%",
            padding: 20,
            gap: 20,
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
                padding: 12,
                paddingTop: 10,
                height: 100,
                width: 300,
                gap: 10,
                borderRadius: 10,
                backgroundColor: Colors.grey,
              }}
              elevation={4}
            >
              <Text
                disabled
                variant="titleLarge"
                style={{
                  color: Colors.lightgrey,
                  fontSize: 22,
                  fontWeight: "bold",
                }}
              >
                Wallet Balance
              </Text>
              <Text
                style={{
                  color: Colors.lightgrey,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {balance}
              </Text>
            </Surface>
          </View>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-evenly",
              alignItems: "center",
            }}
          >
            <Pressable onPress={() => router.push("/wallet/fund")}>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",

                  borderRadius: 10,
                  elevation: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-bottom-left"
                  color="#fff"
                  size={20}
                />
                <Text style={{ color: "#fff", fontSize: 18 }}>Deposit</Text>
              </LinearGradient>
            </Pressable>
            <Pressable>
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  flexDirection: "row",
                  gap: 10,
                  alignItems: "center",

                  borderRadius: 10,
                  elevation: 1,
                }}
              >
                <MaterialCommunityIcons
                  name="arrow-top-right"
                  color="#fff"
                  size={20}
                />
                <Text style={{ color: "#fff", fontSize: 18 }}>Withdraw</Text>
              </LinearGradient>
            </Pressable>
          </View>

          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {show && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  onChange={onChange}
                />
              )}
              <Text
                style={{
                  color: Colors.grey,
                  fontSize: 20,
                  fontWeight: "bold",
                }}
              >
                Recent Activities
              </Text>
              <Pressable
                style={{
                  flexDirection: "row",
                  justifyContent: "center",

                  alignItems: "flex-start",
                }}
                onPress={showDatepicker}
              >
                <MaterialCommunityIcons
                  name="calendar"
                  size={30}
                  color={Colors.grey}
                />
                <MaterialCommunityIcons
                  name="arrow-down-bold"
                  size={20}
                  color={Colors.primary}
                />
              </Pressable>
            </View>
          </View>

          <SectionList
            showsVerticalScrollIndicator={false}
            sections={groupedTransactions}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => RenderItem(item)}
            renderSectionHeader={({ section: { title } }) => (
              <Text
                style={{
                  marginVertical: 10,
                  fontSize: 18,
                  color: Colors.grey,
                }}
              >
                {title}
              </Text>
            )}
          />
        </View>
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

const RenderItem = (item: DocumentData) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginVertical: 7,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10,
      }}
    >
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",

          backgroundColor: Colors.lightgrey,
          padding: 10,
          borderRadius: 10,
          elevation: 1,
        }}
      >
        <MaterialCommunityIcons
          name={
            item.type == "deposit" ? "arrow-bottom-left" : "arrow-top-right"
          }
          size={20}
          color={item.type == "deposit" ? Colors.success : Colors.primary}
        />
      </View>
      <View>
        <Text style={{ fontSize: 18, textTransform: "capitalize" }}>
          {item.type}
        </Text>
        <Text style={{ fontSize: 14, textTransform: "capitalize" }}>17:30</Text>
      </View>
    </View>
    <Text
      style={{
        fontSize: 16,
        fontWeight: "bold",
        color: Colors.grey,
        flexShrink: 1,
      }}
    >
      {formatPrice(parseFloat(item.amount))}
    </Text>
  </View>
);
