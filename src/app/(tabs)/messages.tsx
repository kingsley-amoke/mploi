import { View, SafeAreaView, TouchableOpacity, ScrollView } from "react-native";
import { Avatar, Badge, Divider, Text } from "react-native-paper";
import React from "react";
import { Link, useRouter } from "expo-router";
import { useChatStore, useRequestStore, useUserStore } from "@/src/state/store";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";

const index = () => {
  const router = useRouter();

  const { chats } = useChatStore();
  const { requests } = useRequestStore();
  const {user} = useUserStore();

  const myRequests = requests.filter(req => req._id === user?._id)

  return (
    <View style={{ flex: 1 }}>
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
              <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                Service requests{" "}
              </Text>
              <Badge style={{ color: "#000", fontWeight: "bold" }}>
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

              <TouchableOpacity onPress={() => router.replace("/rooms/")}>
                <Ionicons name="chatbox" size={28} color="#555" />
              </TouchableOpacity>
            </View>

            {chats.length === 0 ? (
              <>
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>No Messages</Text>
                </View>
              </>
            ) : (
              <>
                {chats && chats?.length > 0 ? (
                  <>
                    {chats?.map((room) => (
                      <View key={room._id}>
                        <MessageCard room={room} />
                      </View>
                    ))}
                  </>
                ) : null}
              </>
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const MessageCard = ({ room }: { room: DocumentData }) => {
  const { user } = useUserStore();

  const chatName =
    user?._id === room.client._id
      ? room.serviceProvider.firstName + " " + room.serviceProvider.lastName
      : room.client.firstName + " " + room.client.lastName;

  const chatImage =
    user?._id === room.client._id
      ? room.serviceProvider.image
      : room.client.image;

  const lastMessageId = Object.keys(room?.messages).pop()!;

  const lastMessage = room?.messages[lastMessageId];

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
          <Avatar.Image source={{ uri: chatImage }} size={60} />
          <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
            <Text
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: 20,
              }}
            >
              {chatName}
            </Text>
            <Text>{lastMessage?.text}</Text>
          </View>
        </View>
        <View>
          <Text>
            {new Date(lastMessage?.timeStamp).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default index;
