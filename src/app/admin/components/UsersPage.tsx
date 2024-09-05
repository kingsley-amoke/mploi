import {
  FlatList,
  StyleSheet,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import { Avatar, Divider, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { useUsersStore, useUserStore } from "@/src/state/store";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { createChat, CustomToast, getUsers } from "@/src/utils/data";
import { useRouter } from "expo-router";
const UsersPage = () => {
  const colorScheme = useColorScheme();
  const { users, storeUsers } = useUsersStore();
  const { user } = useUserStore();
  const router = useRouter();

  const [search, setSearch] = useState("");

  const iconColor = colorScheme === "light" ? "#000" : "#fff";

  const allUsers = users.filter((item) => item._id !== user?._id);

  const filteredUsers = allUsers.filter(
    (p) =>
      p.firstName.toLowerCase().includes(search.toLowerCase()) ||
      p.lastName.toLowerCase().includes(search.toLowerCase()) ||
      p.bio.toLowerCase().includes(search.toLowerCase())
  );

  const UsersRenderItem = ({ item }: { item: DocumentData }) => {
    const handleSuspendUSer = () => {
      const userRef = doc(firestoreDB, "users", item._id);

      updateDoc(userRef, { suspended: !item.suspended }).then(async () => {
        const users = await getUsers();
        storeUsers(users);
        CustomToast("User suspended Successfully");
      });
    };

    const handleMessageUser = () => {
      const id = `${Date.now()}`;
      //create chat
      const data = {
        _id: id,
        client: user,
        serviceProvider: item,
      };

      createChat(data).then(() => {
        router.push(`/rooms/${data._id}`);
      });
    };

    return (
      <>
        <View
          style={{
            marginHorizontal: 20,
            marginVertical: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", gap: 20, alignItems: "center" }}>
            <Avatar.Image source={{ uri: item.image }} size={30} />
            <View style={{ justifyContent: "center" }}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                {item.firstName} {item.lastName}
              </Text>
              <Text style={{ fontSize: 10 }}>{item.skills[0]}</Text>
            </View>
          </View>

          <View style={{ flexDirection: "row", marginLeft: 30, gap: 20 }}>
            <TouchableOpacity
              style={{ justifyContent: "center" }}
              onPress={handleMessageUser}
            >
              <MaterialIcons name="message" size={20} color={iconColor} />
            </TouchableOpacity>
            {item.suspended ? (
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={handleSuspendUSer}
              >
                <FontAwesome6
                  name="person-circle-check"
                  size={20}
                  color={iconColor}
                />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={{ justifyContent: "center" }}
                onPress={handleSuspendUSer}
              >
                <FontAwesome6
                  name="person-circle-xmark"
                  size={20}
                  color={iconColor}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Divider bold horizontalInset />
      </>
    );
  };

  return (
    <View>
      <View
        style={{
          marginVertical: 10,
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Search services"
          style={{ width: 300, paddingLeft: 20, height: 40 }}
          outlineStyle={{ width: 1 }}
          onChangeText={(value) => setSearch(value)}
        />
        <MaterialIcons
          name="search"
          size={20}
          color={iconColor}
          style={{ position: "absolute", left: 35 }}
        />
      </View>
      <FlatList data={filteredUsers} renderItem={UsersRenderItem} />
    </View>
  );
};

export default UsersPage;
