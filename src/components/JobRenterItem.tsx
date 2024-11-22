import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { useColorScheme, View } from "react-native";
import DropShadow from "react-native-drop-shadow";

import { Button, Card, Divider, Text, useTheme } from "react-native-paper";

export const JobRenderItem = ({ item }: { item: DocumentData }) => {
  const router = useRouter();

  // const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  // const date = parseInt(item._id);

  // const jobDate = new Date(date).getTime();

  // const today = new Date(Date.now()).getTime();

  // const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

  // const salary = new Intl.NumberFormat("en-UK", {
  //   style: "currency",
  //   currency: "NGN",
  // }).format(item.salary);

  return (
    <View style={{ width: "100%", alignItems: "center" }}>
      <Card
        style={{
          width: "90%",
          marginVertical: 10,
          padding: 10,
          borderRadius: 5,
        }}
      >
        <View style={{ gap: 30 }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              textTransform: "capitalize",
            }}
          >
            {item.title}
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                {item.company}
              </Text>
              <Text style={{ textTransform: "capitalize" }}>
                {item.location}
              </Text>
            </View>
            <View
              style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
            >
              <Button
                mode="contained"
                onPress={() => router.push(`/jobs/${item._id}`)}
              >
                Apply
              </Button>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
};
