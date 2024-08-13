import Carousel from "@/src/components/Carousel";
import FloatingButton from "@/src/components/FloatingButton";
import UserCard from "@/src/components/UserCard";
import { Colors } from "@/src/constants/Colors";
import { useJobsStore, useUsersStore } from "@/src/state/store";
import { CustomToast } from "@/src/utils/data";
import { Link, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, ActivityIndicator, MD2Colors, Button } from "react-native-paper";

const Home = () => {
  const { users } = useUsersStore();
  const { jobs } = useJobsStore();
  const router = useRouter();

  const BannerRenderItem = ({ item }: { item: DocumentData }) => {
    const salary = new Intl.NumberFormat("currencr", {
      style: "currency",
      currency: "NGN",
    }).format(item.salary);

    return (
        <View
          style={{
            width: 150,
            marginLeft: 10,
            height: 130,
            borderBottomColor: Colors.dark.primary,
            borderBottomWidth: 1,
            backgroundColor: Colors.dark.backdrop,
            padding: 5,
            borderRadius: 10,
          }}
          key={item._id}
        >
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text>Position: </Text>
            <Text>{item.title}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              gap: 5,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <Text>Location: </Text>
            <Text style={{ fontSize: 12 }}>{item.location}</Text>
          </View>
          <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
            <Text>Salary: </Text>
            <Text style={{ fontSize: 12, fontStyle: "italic" }}>{salary}</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "flex-end",
            }}
          >
            <Text
              onPress={() => router.push(`/admin/jobs/${item._id}`)}
              style={{
                borderWidth: 1,
                borderColor: Colors.dark.primary,
                margin: 10,
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10,
              }}
            >
              Apply
            </Text>
          </View>
        </View>
    );
  };

  const weekAgo = Date.now() * 7;

  const newJobs = jobs.filter((job) => parseInt(job._id) < weekAgo);

  const showToast = () => {
    console.log("toasting");
    CustomToast("toasting", "#000", "#fff");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Button mode="contained" onPress={showToast}>
        click
      </Button>

      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        <View>
          <Text
            style={{
              textAlign: "left",
              fontSize: 20,
              fontWeight: "700",
              marginVertical: 10,
            }}
          >
            Latest Jobs
          </Text>
        </View>
        <FlatList
          data={newJobs}
          renderItem={(item) => BannerRenderItem(item)}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 10, maxHeight: 130 }}
        />

        <View>
          <Text style={{ textAlign: "left", fontSize: 20, fontWeight: "700" }}>
            Top Services
          </Text>
        </View>

        <View>
          {users.length > 0 ? (
            <View
              style={{
                width: "100%",
                marginVertical: 10,
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
                  <TouchableOpacity style={{ width: 150 }}>
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
        </View>

        <FloatingButton />
      </ScrollView>
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
