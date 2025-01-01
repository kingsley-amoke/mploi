import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Portal, Text } from "react-native-paper";
import React, { useState } from "react";
import { useRequestStore, useUserStore } from "@/src/state/store";
import { DocumentData } from "firebase/firestore";
import { ref, remove } from "firebase/database";
import { realtimeDB } from "@/src/utils/firebaseConfig";
import { createChat } from "@/src/utils/data";
import { useRouter } from "expo-router";

const requests = () => {
  const router = useRouter();
  const { requests, deleteRequest } = useRequestStore();
  const [loading, setLoading] = useState(false);

  const RequestRenderItem = ({ item }: { item: DocumentData }) => {
    const handleDecline = () => {
      const requestRef = ref(realtimeDB, `requests/${item._id}`);

      deleteRequest(item);
      router.push("/");
      remove(requestRef);
    };

    const handleAcceptRequest = () => {
      setLoading(true);
      const requestRef = ref(realtimeDB, "requests/");
      createChat(item).then(() => {
        router.push(`/rooms/${item._id}`);

        remove(requestRef).then(() => {
          deleteRequest(item);
        });
      });
      setLoading(false);
    };

    // const modalContent = (
    //   <View style={{ marginBottom: 10 }}>
    //     <MaterialIcons name="info" size={30} style={{ textAlign: "center" }} />
    //     <Text style={{ fontWeight: "bold", marginVertical: 10 }}>
    //       This action will cost you NGN 500.
    //     </Text>
    //     <View
    //       style={{
    //         flexDirection: "row",
    //         justifyContent: "space-between",
    //         alignItems: "center",
    //         gap: 20,
    //       }}
    //     >
    //       <Button mode="outlined" onPress={() => setVisible(false)}>
    //         Cancel
    //       </Button>
    //       <Button mode="contained" onPress={() => handleAcceptRequest()}>
    //         {loading ? "PLease wait " : "Continue"}
    //       </Button>
    //     </View>
    //   </View>
    // );

    return (
      <View
        style={{
          marginVertical: 10,
          borderWidth: 1,
          borderColor: "grey",
          borderRadius: 10,
          paddingHorizontal: 20,
          paddingVertical: 10,
          gap: 20,
        }}
      >
        <View>
          <Text style={{ fontWeight: "bold", fontSize: 20 }}>
            {item.client?.firstName} {item.client?.lastName}{" "}
          </Text>
          <Text>booked for service</Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button mode="outlined" onPress={handleDecline}>
            Decline
          </Button>
          <Button mode="contained" onPress={() => handleAcceptRequest()}>
            {loading ? "PLease wait " : "Continue"}
          </Button>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, marginHorizontal: 10 }}>
      <FlatList
        data={requests}
        renderItem={(item) => RequestRenderItem(item)}
      />
    </SafeAreaView>
  );
};

export default requests;
