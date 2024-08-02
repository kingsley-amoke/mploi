import UserCard from "@/src/components/UserCard";
import { useUsersStore } from "@/src/state/store";
import { Link } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ActivityIndicator, Button, MD2Colors, Text } from "react-native-paper";



export default function Shop() {

  const {users} = useUsersStore();
  const [loading, setLoading] = useState(false);


  const addShop = () => {
  console.log('nothing')
      
  };

  return (
    <View style={styles.container}>
     <ScrollView>
        {users.length > 0 ? (
          <View
            style={{
              width: "100%",
              marginVertical: 20,
              flexDirection: "row",
              marginHorizontal: "auto",
              flexWrap: "wrap",
              gap: 10,
            }}
          >
            {users.map((user) => (
              <Link
                href={{
                  pathname: `/profile/[id]`,
                  params: { id: user._id },
                }}
                key={user._id}
                asChild
              >
                <TouchableOpacity style={{ width: 200 }}>
                  <UserCard user={user} />
                </TouchableOpacity>
              </Link>

            ))}
          </View>
        ) : (
          <ActivityIndicator
            animating={true}
            color={MD2Colors.teal900}
            style={{ marginVertical: 200 }}
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
