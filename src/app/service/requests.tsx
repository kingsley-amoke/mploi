import { FlatList, SafeAreaView, StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";
import React from "react";
import { useRequestStore } from "@/src/state/store";
import { DocumentData } from "firebase/firestore";
import { ref, remove } from "firebase/database";
import { realtimeDB } from "@/src/utils/firebaseConfig";
import { createChat } from "@/src/utils/data";

const requests = () => {

  const router = useRouter();
  const { requests, deleteRequest } = useRequestStore();

  const RequestRenderItem = ({ item }: { item: DocumentData }) => {
    const handleDecline = () => {
      const requestRef = ref(realtimeDB, "requests/");

      remove(requestRef).then(() => {
        deleteRequest(item);
      });
    };

    const handleAcceptRequest = () => {
      const requestRef = ref(realtimeDB, "requests/");
      createChat(item).then(() => {
        remove(requestRef).then(() => {
          deleteRequest(item);
          router.push(`/rooms/${item._id}`)
        });
      });
    };

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
            {item.client.firstName} {item.client.lastName}{" "}
          </Text>
          <Text>booked for your service</Text>
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
          <Button mode="contained" onPress={handleAcceptRequest}>
            Accept
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

const styles = StyleSheet.create({});
