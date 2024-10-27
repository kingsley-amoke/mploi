import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUsersStore } from "@/src/state/store";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { Button, TextInput } from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";

const index = () => {
  const router = useRouter();

  const { users } = useUsersStore();

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const user = users.find((usr) => usr._id === auth.currentUser?.uid)!;

  const handleUpdatePortfolio = () => {
    setLoading(true);

    const newPortfolio = {
      image: "",
      description: description,
    };

    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, { portfolio: [...user?.portfolio, newPortfolio] }).then(
      () => {
        // router.back();
        setLoading(false);
      }
    );
  };

  return (
    <ScrollView>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
            textTransform: "capitalize",
          }}
        >
          Update Portfolio
        </Text>
      </LinearGradient>
      {user?.portfolio?.length > 0 && (
        <View>
          {user?.portfolio.map((portfolio, index) => (
            <View key={index}>
              <Text>{portfolio.description}</Text>
            </View>
          ))}
        </View>
      )}
      <View>
        <TextInput onChangeText={(value) => setDescription(value)} />
        <Button mode="contained" onPress={handleUpdatePortfolio}>
          {loading ? "Please wait..." : "Update"}
        </Button>
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
