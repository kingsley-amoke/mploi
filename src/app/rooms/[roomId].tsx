import {
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { TextInput, Text } from "react-native-paper";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  Entypo,
  FontAwesome,
} from "@expo/vector-icons";
import {
  DocumentData,
} from "firebase/firestore";
import { realtimeDB } from "@/src/utils/firebaseConfig";
import { useLocalSearchParams} from "expo-router";

import { useChatStore, useUserStore } from "@/src/state/store";
import { onValue, ref, set, serverTimestamp } from "firebase/database";


const Room = () => {
  const { roomId } = useLocalSearchParams();

  const {user} = useUserStore();
  const {chats} = useChatStore();

  const room = chats.filter((chat) => chat._id === roomId)[0]

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
        timeStamp: timeStamp
        
      }
      set(ref(realtimeDB, "chats/" + roomId + "/messages/" + id), data).then(() => setMessage(''))
  
  };

  const fetchRoomMessages = ( ) => {
    const chatRef = ref(realtimeDB, 'chats/' + roomId + '/messages');
    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();

      if(!data) return
      const myData = Object.keys(data).map(key => {
        return data[key];
    })
    
    setMessages(myData)
    
    });
  }



  useLayoutEffect(() => {

    fetchRoomMessages()
  
    
  }, [roomId]);

  return (

    <View style={{ flex: 1 }}>
      <View
        style={{
         
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 10,
            paddingVertical: 15,
          }}
        >
         

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            
            <View>
              <Text
                style={{
                  color: "#ddd",
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "capitalize",
                }}
              >
                {room && room.name.length > 36
                  ? `${room.chatName.slice(0, 36)}..`
                  : room?.name}
                  
              </Text>
              <Text
                style={{
                  color: "#ddd",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {room?.employerName}
              </Text>
            </View>
          </View>

        </View>
      </View>
      <View
        style={{
          backgroundColor: "#fff",
          paddingHorizontal: 5,
          paddingVertical: 8,
          borderRadius: 30,
          flex: 1,
          borderTopEndRadius: 20,
          marginTop: 10,
        }}
      >
        <KeyboardAvoidingView
          style={{ flex: 1, marginBottom:20 }}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          
        >
          <>
             <ScrollView showsVerticalScrollIndicator={false}  style={{paddingBottom:100}}>
                  {messages?.length > 0 && messages?.map((msg: DocumentData, index: number) =>
                  
                    msg.senderId === user?._id ? (
                      <View
                        style={{
                          margin: 1,
                          alignSelf: "flex-end",
                          paddingHorizontal: 10,
                          paddingVertical: 5,
                          borderTopRightRadius: 20,
                          borderBottomRightRadius: 1,
                          borderTopLeftRadius: 20,
                          borderBottomLeftRadius: 20,
                         
                          position: "relative",
                          marginBottom:20
                        }}
                        key={index}
                      >
                        <View>
                          <Text
                            style={{
                              fontWeight: "bold",
                              fontSize: 20,
                              color: "#fff",
                            }}
                          >
                            {msg.text}
                            
                          </Text>
                        </View>
                        <View style={{ alignSelf: "flex-end" }}>
                          {msg?.timeStamp&& (
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 10,
                                color: "#fff",
                              }}
                            >
                              {new Date(msg?.timeStamp).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}

                              
                            </Text>
                          )}
                         
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
                          }}
                        >
                          
                           <View
                            style={{
                              margin: 1,
                              paddingHorizontal: 20,
                              paddingVertical: 5,
                              borderTopLeftRadius: 20,
                              borderBottomLeftRadius: 1,
                              borderTopRightRadius: 20,
                              borderBottomRightRadius: 20,
                              backgroundColor: "#ddd",
                              position: "relative",
                            }}
                          >
                            <View>
                              <Text
                                style={{ fontWeight: "bold", fontSize: 20 }}
                              >
                                {msg.text}
                                
                              </Text>
                            </View>
                            <View style={{ alignSelf: "flex-end" }}>
                              {msg?.timeStamp && (
                                <Text
                                  style={{ fontWeight: "300", fontSize: 10 }}
                                >
                                  {new Date(msg?.timeStamp).toLocaleTimeString("en-US", {
                                    hour: "numeric",
                                    minute: "numeric",
                                    hour12: true,
                                  })}
                                  
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
                marginTop:20
              }}
            >
              <View
                style={{
                  backgroundColor: "#ddd",
                  borderRadius: 20,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity >
                  <Entypo name="emoji-happy" size={24} color="#555" />
                </TouchableOpacity>

                <TextInput
                  style={{ flex: 1, fontWeight: "bold", paddingLeft: 10 }}
                  placeholder="Type here..."
                  placeholderTextColor={"#999"}
                  value={message}
                  onChangeText={(text) => setMessage(text)}
                  
                />
              </View>
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
  ) 

};

export default Room;

const styles = StyleSheet.create({});
