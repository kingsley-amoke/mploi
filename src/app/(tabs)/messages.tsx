import { View, TouchableOpacity, FlatList } from "react-native";
import { Avatar, Button, Text, TextInput } from "react-native-paper";
import React, { useEffect, useMemo, useState } from "react";
import { Link, useRouter } from "expo-router";
import { useChatStore, useUsersStore } from "@/src/state/store";
import { Ionicons, Octicons } from "@expo/vector-icons";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  or,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

import { Colors } from "@/src/constants/Colors";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { noAvatar } from "@/src/utils/data";
import FancyHeader from "@/src/components/FancyHeader";
import moment from "moment";

const index = () => {
  const router = useRouter();
  const { chats, storeChats } = useChatStore();
  const { users } = useUsersStore();

  const [search, setSearch] = useState("");

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestoreDB, "chats"),
        or(
          where("clientId", "==", auth.currentUser?.uid),
          where("serviceProviderId", "==", auth.currentUser?.uid)
        )
      ),
      (snapshot) => {
        const chats = snapshot.docs.map((doc) => doc.data());
        storeChats(chats);
      }
    );
    return () => unsubscribe();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title={chats.length > 0 ? "Chats" : "Waiting for network"} />
      {auth.currentUser ? (
        <View>
          <View style={{ paddingHorizontal: 20, paddingVertical: 20 }}>
            <View>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text style={{ fontWeight: "bold" }}>Recent Messages</Text>

                <TouchableOpacity>
                  <Ionicons name="chatbox" size={20} color={Colors.grey} />
                </TouchableOpacity>
              </View>
              <View style={{ marginVertical: 20 }}>
                <TextInput
                  mode="outlined"
                  placeholder="Search messages"
                  style={{
                    height: 40,
                    fontSize: 14,
                  }}
                  onChangeText={(value) => setSearch(value)}
                />
              </View>

              {chats.length < 1 ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Text>No Messages</Text>
                </View>
              ) : (
                <View style={{ marginBottom: 40 }}>
                  <FlatList
                    showsVerticalScrollIndicator={false}
                    data={chats}
                    renderItem={({ item, index }) => {
                      const chatProfileId =
                        auth.currentUser?.uid === item.clientId
                          ? item.serviceProviderId
                          : item.clientId;

                      const chatProfile = users.find(
                        (user) => user._id == chatProfileId
                      );

                      const chatName =
                        chatProfile?.firstName + " " + chatProfile?.lastName ||
                        "";
                      const chatImage = chatProfile?.image || noAvatar;

                      return (
                        <View key={index}>
                          {chatName
                            .toLowerCase()
                            .includes(search.toLowerCase()) && (
                            <TouchableOpacity
                              style={{
                                flexDirection: "row",
                                alignItems: "flex-end",
                                justifyContent: "space-between",
                                marginBottom: 20,
                              }}
                              onPress={() => {
                                if (
                                  auth.currentUser?.uid ==
                                    item.serviceProviderId &&
                                  !item.isRead
                                ) {
                                  updateDoc(
                                    doc(firestoreDB, "chats", item._id),
                                    {
                                      isRead: true,
                                    }
                                  ).then(() => {
                                    router.push(`/rooms/${item._id}`);
                                  });
                                }
                              }}
                            >
                              <View style={{ flexDirection: "row", gap: 20 }}>
                                <View style={{ position: "relative" }}>
                                  <Avatar.Image
                                    source={{ uri: chatImage }}
                                    size={50}
                                  />
                                </View>

                                <View
                                  style={{
                                    alignItems: "flex-start",
                                    justifyContent: "center",
                                  }}
                                >
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
                                    {item.lastMessage.slice(0, 20) + "..."}
                                  </Text>
                                </View>
                              </View>
                              <View style={{ gap: 10, alignItems: "flex-end" }}>
                                {auth.currentUser?.uid ==
                                  item.serviceProviderId &&
                                  !item.isRead && (
                                    <Octicons
                                      name="dot-fill"
                                      color={Colors.primary}
                                      size={25}
                                    />
                                  )}

                                <Text
                                  style={{ fontSize: 12, fontStyle: "italic" }}
                                >
                                  {moment
                                    .utc(item.timeStamp)
                                    .local()
                                    .format("HH:mm")}
                                </Text>
                              </View>
                            </TouchableOpacity>
                          )}
                        </View>
                      );
                    }}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      ) : (
        <View style={{ marginTop: 40 }}>
          <Text style={{ textAlign: "center", fontSize: 20 }}>
            Please login to see your messages.
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
};

export default index;
