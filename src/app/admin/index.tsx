import { FlatList, TouchableOpacity, useColorScheme, View } from "react-native";
import { Avatar, Divider, Text, TextInput } from "react-native-paper";
import React, { useEffect, useState } from "react";
import { useUsersStore } from "@/src/state/store";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { createChat, CustomToast } from "@/src/utils/data";
import { useRouter } from "expo-router";
const UsersPage = () => {
  const { users } = useUsersStore();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const allUsers = users.filter((item) => item._id !== auth.currentUser?.uid!);

  const filteredUsers = allUsers.filter(
    (p) =>
      p.firstName.toLowerCase().includes(search.toLowerCase()) ||
      p.lastName.toLowerCase().includes(search.toLowerCase()) ||
      p.bio.toLowerCase().includes(search.toLowerCase())
  );

  const UsersRenderItem = ({ item }: { item: DocumentData }) => {
    const handleSuspendUSer = () => {
      const userRef = doc(firestoreDB, "users", item._id);

      updateDoc(userRef, { suspended: !item.suspended }).then(() => {
        CustomToast("User suspended Successfully");
      });
    };

    const handleMessageUser = () => {
      createChat(auth.currentUser?.uid!, item._id);
      router.push("/");
    };

    return (
      <View>
        <View
          style={{
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Avatar.Image source={{ uri: item.image }} size={40} />
            <View style={{ justifyContent: "center" }}>
              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 20,
                  textTransform: "capitalize",
                }}
              >
                {item.firstName} {item.lastName.slice(0, 5) + "..."}
              </Text>
              <Text style={{ fontSize: 18 }}>
                {item.skills ? item.skills[0] : "Client"}
              </Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 30, gap: 20 }}>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={handleMessageUser}
            >
              <MaterialIcons name="message" size={30} />
            </TouchableOpacity>
            {item.suspended ? (
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={handleSuspendUSer}
              >
                <FontAwesome6
                  name="person-circle-check"
                  size={30}
                  color="grey"
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={handleSuspendUSer}
              >
                <FontAwesome6
                  name="person-circle-xmark"
                  size={30}
                  color="maroon"
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Divider bold horizontalInset />
      </View>
    );
  };

  return (
    <View style={{ width: "100%", paddingHorizontal: 10 }}>
      <View
        style={{
          marginVertical: 10,

          position: "relative",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Search users"
          style={{ width: "95%", height: 40 }}
          outlineStyle={{ width: 1 }}
          onChangeText={(value) => setSearch(value)}
        />
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={UsersRenderItem}
        style={{
          marginBottom: 90,
        }}
      />
    </View>
  );
};

export default UsersPage;
