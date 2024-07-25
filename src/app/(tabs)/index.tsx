import Categories from "@/src/components/Categories";
import FloatingButton from "@/src/components/FloatingButton";
import UserCard from "@/src/components/UserCard";
import { useUsersStore } from "@/src/state/store";
import { Link, useNavigation, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import {
  SegmentedButtons,
  FAB,
  Portal,
  Text,
  ActivityIndicator,
  MD2Colors,
} from "react-native-paper";

const Home = () => {
 

  const { users } = useUsersStore();

  const [value, setValue] = useState("all");




  return (
    <SafeAreaView style={styles.container}>
      <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "all",
            label: "All Jobs",
          },
          {
            value: "categories",
            label: "Categories",
          },
        ]}
      />
      {value === "all" ? (
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
      ) : (
        <Categories />
      )}
      <FloatingButton />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
});

export default Home;
