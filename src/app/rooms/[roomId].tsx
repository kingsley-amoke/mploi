import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { TextInput, Text, Avatar } from "react-native-paper";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Entypo,
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";
import { auth, realtimeDB } from "@/src/utils/firebaseConfig";
import { useLocalSearchParams, useNavigation } from "expo-router";

import { useChatStore, useUserStore } from "@/src/state/store";
import { onValue, ref, set, serverTimestamp } from "firebase/database";
import useTheme from "@/src/hooks/useTheme";
import { Colors } from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const Room = () => {
  const { roomId } = useLocalSearchParams();

  const navigation = useNavigation();

  const colorScheme = useColorScheme();

  const textColor = colorScheme === "dark" ? "#fff" : "#000";

  const { chats } = useChatStore();

  const room = chats.find((chat) => chat._id === roomId);

  if (!room) return;

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<DocumentData[]>([]);

  const sendMessage = async () => {
    if (message === "") return;
    const id = `${Date.now()}`;
    const timeStamp = serverTimestamp();

    const data = {
      _id: id,
      roomId: roomId,
      text: message,
      senderId: auth.currentUser?.uid,
      timeStamp: timeStamp,
    };
    setMessage("");
    set(ref(realtimeDB, "chats/" + roomId + "/messages/" + id), data);
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
    auth.currentUser?.uid === room.client._id
      ? room.serviceProvider.firstName + " " + room.serviceProvider.lastName
      : room.client.firstName + " " + room.client.lastName;

  const chatImage =
    auth.currentUser?.uid === room.client._id
      ? room.serviceProvider.image
      : room.client.image;

  const ChatHeader = () => {
    return (
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => navigation.goBack()}
        />

        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
            textTransform: "capitalize",
          }}
        >
          {chatName}
        </Text>
        <Avatar.Image source={{ uri: chatImage }} size={30} />
      </LinearGradient>
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
                                fontSize: 20,
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
                          backgroundColor: Colors.secondary,
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
                                fontSize: 20,
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
            {!!room?.client?.isAdmin && (
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
                  onPress={sendMessage}
                >
                  <FontAwesome name="send" size={24} color={textColor} />
                </TouchableOpacity>
              </View>
            )}
          </>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({});
