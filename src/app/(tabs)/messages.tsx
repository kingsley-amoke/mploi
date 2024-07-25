import {
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {Text} from 'react-native-paper';
import React from "react";
import { Link, useRouter } from "expo-router";
import { useChatStore} from "@/src/state/store";
import { Ionicons } from "@expo/vector-icons";
import { DocumentData } from "firebase/firestore";

const index = () => {
  
  const router = useRouter();

  const {chats} = useChatStore()

  return (
    <View style={{ flex: 1, marginTop: 60 }}>
      <SafeAreaView>
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

const MessageCard = ({ room }: {room: DocumentData}) => {


  return (
    <Link
      href={{ pathname: `/rooms/${room._id}` }}
      asChild
    >
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 20,
        }}
      >
        <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
          <Text style={{ fontWeight: "bold", textTransform: "capitalize" }}>
            {room.serviceProvider.firstName}
          </Text>
          {/* <Text>test</Text> */}
          <Text>{room.serviceProvider.firstName}</Text>
        </View>
        <Text style={{ fontWeight: "bold" }}>{room.serviceProvider.location.lga}</Text>
      </TouchableOpacity>
    </Link>
  );
};

export default index;
