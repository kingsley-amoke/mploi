import { Router } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { View } from "react-native";

import { Button, Card, Text } from "react-native-paper";

export const JobRenderItem = (data: DocumentData, router: Router) => {
  console.log(data);
  const { item } = data;
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
