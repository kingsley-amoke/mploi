import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput, Text, Avatar } from "react-native-paper";
import React, { useLayoutEffect, useRef, useState } from "react";
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";
import { realtimeDB } from "@/src/utils/firebaseConfig";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useChatStore, useUserStore } from "@/src/state/store";
import { onValue, ref, set, serverTimestamp } from "firebase/database";
import useTheme from "@/src/hooks/useTheme";
import { Colors } from "@/src/constants/Colors";

const Room = () => {
  const { roomId } = useLocalSearchParams();

  const navigation = useNavigation();

  const { colorScheme } = useTheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const placeholderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const bgColor =
    colorScheme === "dark" ? Colors.dark.backdrop : Colors.light.backdrop;

  const userChatBg = Colors.light.primary;
  const clientChatBg = Colors.light.secondary;

  const { user } = useUserStore();
  const { chats } = useChatStore();

  const room = chats.filter((chat) => chat._id === roomId)[0];

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const sendMessage = async () => {
    const id = `${Date.now()}`;
    const timeStamp = serverTimestamp();

    const data = {
      _id: id,
      roomId: roomId,
      text: message,
      senderId: user?._id,
      timeStamp: timeStamp,
    };
    set(ref(realtimeDB, "chats/" + roomId + "/messages/" + id), data).then(() =>
      setMessage("")
    );
  };

  const fetchRoomMessages = () => {
    const chatRef = ref(realtimeDB, "chats/" + roomId + "/messages");
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) return;
      const myData = Object.keys(data).map((key) => {
        return data[key];
      });

      setMessages(myData);
    });
  };

  const chatName =
    user?._id === room.client._id
      ? room.serviceProvider.firstName + " " + room.serviceProvider.lastName
      : room.client.firstName + " " + room.client.lastName;

  const chatImage =
    user?._id === room.client._id
      ? room.serviceProvider.image
      : room.client.image;

  const ChatHeader = () => {
    return (
      <View
        style={{
          backgroundColor: bgColor,
          flexDirection: "row",
          height: 100,
          alignItems: "flex-end",
          gap: 40,
          paddingBottom: 15,
          paddingLeft: 10,
        }}
      >
        <Ionicons
          name="chevron-back"
          size={30}
          color={iconColor}
          onPress={() => navigation.goBack()}
        />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
          <Avatar.Image source={{ uri: chatImage }} size={35} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>{chatName}</Text>
        </View>
      </View>
    );
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <ChatHeader />,
    });

    fetchRoomMessages();
  }, [roomId]);

  return (
    <View style={{ flex: 1 }}>
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
                  msg.senderId === user?._id ? (
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
                          marginBottom: 20,
                          backgroundColor: userChatBg,
                          borderRadius: 20,
                          borderBottomRightRadius: 1,
                        }}
                        key={index}
                      >
                        <View
                          style={{
                            margin: 1,
                            alignSelf: "flex-end",
                            paddingHorizontal: 10,
                            paddingVertical: 5,

                            position: "relative",
                          }}
                        >
                          <View>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 20,
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
                                  fontSize: 10,
                                }}
                              >
                                {new Date(msg?.timeStamp).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
                              </Text>
                            )}
                            <Text>
                              <Ionicons
                                name="checkmark-done-outline"
                                size={15}
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
                          marginBottom: 20,
                          backgroundColor: clientChatBg,
                          borderRadius: 20,
                          borderBottomLeftRadius: 1,
                        }}
                      >
                        <View
                          style={{
                            margin: 1,
                            paddingHorizontal: 20,
                            paddingVertical: 5,

                            position: "relative",
                          }}
                        >
                          <View>
                            <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                              {msg.text}
                            </Text>
                          </View>
                          <View style={{ alignSelf: "flex-end" }}>
                            {msg?.timeStamp && (
                              <Text style={{ fontWeight: "300", fontSize: 10 }}>
                                {new Date(msg?.timeStamp).toLocaleTimeString(
                                  "en-US",
                                  {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  }
                                )}
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
                marginHorizontal: 20,
                marginBottom: 20,
                marginTop: 20,
              }}
            >
              <TextInput
                mode="outlined"
                style={{
                  flex: 1,
                  fontWeight: "bold",
                  paddingLeft: 10,
                  borderRadius: 50,
                }}
                placeholder="Type here..."
                placeholderTextColor={placeholderColor}
                value={message}
                onChangeText={(text) => setMessage(text)}
              />

              <TouchableOpacity
                style={{ paddingHorizontal: 10 }}
                onPress={sendMessage}
              >
                <FontAwesome name="send" size={24} color="#555" />
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
