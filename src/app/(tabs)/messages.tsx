import { View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Badge, Divider, Text } from "react-native-paper";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useChatStore, useRequestStore, useUserStore } from "@/src/state/store";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { auth } from "@/src/utils/firebaseConfig";

const index = () => {
  const { chats } = useChatStore();
  const { requests } = useRequestStore();

  const myRequests = requests.filter(
    (req) => req.serviceProvider?._id === auth.currentUser?.uid
  );
  const myChats = chats.filter(
    (c) =>
      c.serviceProvider._id === auth.currentUser?.uid ||
      c.client._id === auth.currentUser?.uid
  );

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
          Messages
        </Text>
      </LinearGradient>
      <SafeAreaView>
        {myRequests.length > 0 && (
          <Link href={"/service/requests"} asChild>
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingHorizontal: 20,
                marginVertical: 20,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                Service requests{" "}
              </Text>
              <Badge style={{ color: "#fff", fontWeight: "bold" }}>
                {myRequests.length}
              </Badge>
            </TouchableOpacity>
          </Link>
        )}
        <Divider bold horizontalInset />
        <ScrollView style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <Text style={{ fontWeight: "bold" }}>Recent Messages</Text>

              <TouchableOpacity>
                <Ionicons name="chatbox" size={20} color="#555" />
              </TouchableOpacity>
            </View>

            {myChats.length < 1 ? (
              <>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>No Messages</Text>
                </View>
              </>
            ) : (
              <>
                {myChats?.map((room) => (
                  <View key={room._id}>
                    <MessageCard room={room} />
                  </View>
                ))}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const MessageCard = ({ room }: { room: DocumentData }) => {
  const chatName =
    auth.currentUser?.uid === room.client._id
      ? room.serviceProvider.firstName + " " + room.serviceProvider.lastName
      : room.client.firstName + " " + room.client.lastName;

  const chatImage =
    auth.currentUser?.uid === room.client._id
      ? room.serviceProvider.image
      : room.client.image;

  let lastMessage = { text: "New message" };
  let lastMessageId = "1";
  let messageDate = "";

  if (room.messages) {
    lastMessageId = Object.keys(room.messages).pop()!;
    lastMessage = room.messages[lastMessageId];
    messageDate = new Date(lastMessage?.timeStamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  }

  return (
    <Link href={{ pathname: `/rooms/${room._id}` }} asChild>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={{ flexDirection: "row", gap: 20 }}>
          <Avatar.Image source={{ uri: chatImage }} size={50} />
          <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: 22,
              }}
            >
              {chatName}
            </Text>
            <Text style={{ fontSize: 16 }}>
              {lastMessage.text.slice(0, 20) + "..."}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{ fontSize: 12, fontStyle: "italic" }}>
            {messageDate}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default index;
