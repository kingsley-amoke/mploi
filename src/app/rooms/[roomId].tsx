import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import { TextInput, Text, Avatar } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import {
  collection,
  DocumentData,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useChatStore, useUsersStore } from "@/src/state/store";
import { Colors } from "@/src/constants/Colors";
import FancyHeader from "@/src/components/FancyHeader";
import { sendMessage } from "@/src/utils/data";
import moment from "moment";

const Room = () => {
  const { roomId } = useLocalSearchParams();

  const router = useRouter();

  const { chats } = useChatStore();
  const { users } = useUsersStore();

  const room = useMemo(
    () => chats.find((chat) => chat._id === roomId),
    [chats.length, roomId]
  );

  if (!room) return;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const handleSendMessage = () => {
    sendMessage(roomId.toString(), message).then(() => {
      setMessage("");
    });
  };

  const fetchRoomMessages = () => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, "messages"),
        where("roomId", "==", roomId),
        orderBy("timeStamp", "asc")
      ),
      (snapshot) => {
        const messages = snapshot.docs.map((doc) => {
          return doc.data();
        });
        setMessages(messages);
      }
    );

    return () => unsubscribe();
  };

  const chatProfileId =
    auth.currentUser?.uid === room.clientId
      ? room.serviceProviderId
      : room.clientId;

  const chatProfile = useMemo(
    () => users.find((user) => user._id == chatProfileId)!,
    [roomId]
  );

  const chatName = chatProfile.firstName + " " + chatProfile.lastName;
  const chatImage = chatProfile.image;

  useEffect(() => {
    fetchRoomMessages();
  }, [roomId]);

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader
        title={chatName}
        subtitle={messages.length > 0 ? "" : "Connecting..."}
        backButton
        rightComponent={
          <Pressable onPress={() => router.push(`profile/${chatProfileId}`)}>
            <Avatar.Image source={{ uri: chatImage }} size={30} />
          </Pressable>
        }
      />
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 8,
          borderRadius: 30,
          flex: 1,
          borderTopEndRadius: 20,
          marginTop: 10,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom: 20 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ paddingBottom: 100 }}
            >
              {messages &&
                messages?.map((msg: DocumentData, index: number) =>
                  msg.senderId === auth.currentUser?.uid ? (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        alignSelf: "flex-end",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 10,
                          backgroundColor: Colors.primary,
                          borderRadius: 10,
                          borderBottomRightRadius: 1,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            margin: 1,
                            alignSelf: "flex-end",
                            paddingHorizontal: 10,
                            paddingVertical: 2,

                            position: "relative",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontWeight: "bold",

                                color: "white",
                              }}
                            >
                              {msg.text}
                            </Text>
                          </View>
                          <View
                            style={{
                              alignSelf: "flex-end",
                              flexDirection: "row",
                              alignItems: "center",
                              gap: 5,
                            }}
                          >
                            {msg?.timeStamp && (
                              <Text
                                style={{
                                  fontWeight: "bold",
                                  fontSize: 12,
                                  color: "white",
                                  fontStyle: "italic",
                                }}
                              >
                                {moment
                                  .utc(room.timeStamp)
                                  .local()
                                  .format("HH:mm")}
                              </Text>
                            )}
                            <Text>
                              <Ionicons
                                name="checkmark-done-outline"
                                size={17}
                                color="white"
                              />
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>
                  ) : (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        alignSelf: "flex-start",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: 10,
                          marginBottom: 10,
                          backgroundColor: Colors.grey,
                          borderRadius: 10,
                          borderBottomLeftRadius: 1,
                        }}
                      >
                        <View
                          style={{
                            margin: 1,
                            paddingHorizontal: 10,
                            paddingVertical: 5,

                            position: "relative",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontWeight: "bold",

                                color: "white",
                              }}
                            >
                              {msg.text}
                            </Text>
                          </View>
                          <View style={{ alignSelf: "flex-end" }}>
                            {msg?.timeStamp && (
                              <Text
                                style={{
                                  fontWeight: "300",
                                  fontSize: 12,
                                  color: "white",
                                  fontStyle: "italic",
                                }}
                              >
                                {moment
                                  .utc(room.timeStamp)
                                  .local()
                                  .format("HH:mm")}
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    </View>
                  )
                )}
            </ScrollView>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                paddingHorizontal: 10,
                marginHorizontal: 5,
                marginBottom: 10,
                marginTop: 20,
              }}
            >
              <TextInput
                mode="outlined"
                keyboardType="default"
                style={{
                  flex: 1,
                  fontWeight: "bold",
                }}
                placeholder="Type here..."
                placeholderTextColor="grey"
                value={message}
                onChangeText={(text) => setMessage(text)}
              />

              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={() => handleSendMessage()}
              >
                <FontAwesome name="send" size={24} color={Colors.primary} />
              </TouchableOpacity>
            </View>
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});
