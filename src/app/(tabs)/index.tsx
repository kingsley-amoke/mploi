import Carousel from "@/src/components/Carousel";
import FloatingButton from "@/src/components/FloatingButton";
import UserCard from "@/src/components/UserCard";
import { useJobsStore, useUsersStore } from "@/src/state/store";
import { Link, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Text, ActivityIndicator, MD2Colors, Banner } from "react-native-paper";

const Home = () => {
  const { users } = useUsersStore();
  const { jobs } = useJobsStore();
  const router = useRouter();

  const BannerRenderItem = ({ item }: { item: DocumentData }) => {
    return (
      <View style={{ width: 150, height: 30, marginLeft: 10 }} key={item._id}>
        <Banner
          visible
          style={{
            borderBottomColor: "teal",
            borderBottomWidth: 1,
            marginBottom: 0,
            minHeight: 130,
            maxHeight: 200,
          }}
          actions={[
            {
              label: "Apply",
              onPress: () => router.push(`/admin/jobs/${item._id}`),
            },
          ]}
        >
          {item.title}
        </Banner>
      </View>
    );
  };

  const weekAgo = Date.now() * 7;

  const newJobs = jobs.filter((job) => parseInt(job._id) < weekAgo);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
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
      />

     
      <View style={{ width: "100%", paddingHorizontal: 20 }}>
        <Text style={{ textAlign: "left", fontSize: 20, fontWeight: "700" }}>
          Top Services
        </Text>
      </View>

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
