import { View, TouchableOpacity, Image} from "react-native";
import {TextInput } from 'react-native-paper';
import React, { useState } from "react";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { useRouter } from "expo-router";
import { useUserStore } from "@/src/state/store";

const AddToChatScreen = () => {
  const router = useRouter();
  const [addChat, setAddChat] = useState("");
  const {user} = useUserStore()

  const createNewChat = async () => {
    if (user) {
      let id = `${Date.now()}`;

      const _doc = {
        _id: id,
        user: user,
        chatName: addChat,
      };

      if (addChat !== "") {
       await setDoc(doc(firestoreDB, "chats", id), _doc).then((doc)=>{
        console.log(doc);
       })
         
      }
    }
  };


  return (
    <View style={{ flex: 1 }}>
      <View >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* go back */}
          <TouchableOpacity onPress={() => router.back()}>
            <MaterialIcons name="chevron-left" size={32} color={"#fbfbfb"} />
          </TouchableOpacity>
          {/* middle */}

          {/* last section */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: user?.image }}
              style={{ width: 100, height: 100 }}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>

      {/* bottom section */}
      <View style={{ flex: 1, backgroundColor: "#fff", marginTop: -10 }}>
        <View style={{ paddingHorizontal: 10, paddingVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              paddingHorizontal: 5,
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* icons */}
            <Ionicons name="chatbubbles" size={24} color={"#777"} />
            {/* textinput */}
            <TextInput
              style={{ flex: 1 }}
              placeholder="Create a chat"
              placeholderTextColor={"#999"}
              value={addChat}
              onChangeText={(text) => setAddChat(text)}
            />

            {/* icon */}
            <TouchableOpacity onPress={() => createNewChat()}>
              <FontAwesome name="send" size={24} color="#777" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AddToChatScreen;
