
import FloatingButton from "@/src/components/FloatingButton";
import UserCard from "@/src/components/UserCard";
import {
  useProductsStore,
  useUsersStore,
  useUserStore,
} from "@/src/state/store";
import { CustomToast, formatPrice, shopAvatar } from "@/src/utils/data";
import { Link, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React, { useEffect } from "react";
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Text,
  ActivityIndicator,
  Card,
  Button,
} from "react-native-paper";
import Toast from "react-native-root-toast";

const Home = () => {
  const { users } = useUsersStore();
  const { user } = useUserStore();
  const { promoted } = useProductsStore();
  const router = useRouter();

  const ShopItem = ({ item }: { item: DocumentData }) => {
    return (
      <Card
        style={{ width: 150, marginLeft: 10 }}
        onPress={() => router.push(`/products/${item._id}`)}
      >
        <Card.Cover source={{ uri: item.images[0] || shopAvatar }} style={{ height: 150 }} />
        <Card.Content style={{ marginVertical: 5 }}>
          <Text style={{ fontWeight: "bold" }}>
            {item.name.length > 20
              ? item.name.substring(0, 14) + "..."
              : item.name}
          </Text>
          <Text style={{ fontSize: 10 }}>{formatPrice(item.price)}</Text>
        </Card.Content>
      </Card>
    );
  };


  useEffect(() => {
    if (user.suspended) {
      router.replace("/suspended");
    }
  }, [user]);


  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{ width: "100%", paddingHorizontal: 20 }}>
        {promoted.length > 0 && (
          <>
            <View>
              <Text
                style={{
                  textAlign: "left",
                  fontSize: 18,
                  fontWeight: "700",
                  marginVertical: 10,
                }}
              >
                Best Selling Deals
              </Text>
            </View>
            <FlatList
              data={promoted}
              renderItem={(item) => ShopItem(item)}
              horizontal
              showsHorizontalScrollIndicator={false}
              style={{ marginBottom: 10, height: 200 }}
            />
          </>
        )}

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
              color='teal'
              style={{ marginVertical: 200 }}
            />
          )}
        </View>

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
