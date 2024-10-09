import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import {
  useCategoryStore,
  useLocationStore,
  useUserStore,
} from "@/src/state/store";
import { Colors } from "../constants/Colors";
import { CustomToast, getBlobFroUri } from "../utils/data";
import { firestoreDB, storage } from "../utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getLoggedUser } from "../utils/userActions";

const EditProfile = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();
  const { location } = useLocationStore();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const { user, storeUser } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const updateProfile = async () => {
    setSaving(true);

    const userRef = doc(firestoreDB, "users", user._id);

    const data = {
      firstName: firstName !== "" ? firstName : user?.firstName,
      lastName: lastName !== "" ? lastName : user?.lastName,
      phone: phone !== "" ? phone : user?.phone,
    };

    updateDoc(userRef, data)
      .then(async () => {
        const user = await getDoc(userRef);

        storeUser(user.data()!);
        router.push("/profile");
        CustomToast("Profile updated Successfully");
        setSaving(false);
      })
      .catch((error) => {
        console.log(error);
        setSaving(false);
      });
  };

  const updateLocation = () => {
    setLoading(true);

    const userRef = doc(firestoreDB, "users", user._id);

    const data = {
      location: location[0],
      coordinates: location[0].coordinates,
    };

    updateDoc(userRef, data)
      .then(async () => {
        const user = await getDoc(userRef);

        storeUser(user.data()!);
        router.push("/profile");
        CustomToast("Profile updated Successfully");
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, marginBottom: 10 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 22,
        }}
      >
        <ScrollView
          style={{ marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Personal Details
          </Text>
          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.firstName !== "" ? user?.firstName : "First Name"}
                placeholder={user?.firstName}
                onChangeText={(value) => setFirstName(value)}
                editable={true}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.lastName !== "" ? user?.lastName : "Last Name"}
                placeholder={user?.lastName}
                onChangeText={(value) => setLastName(value)}
                editable={true}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.phone !== "" ? user?.phone : "Phone Number"}
                placeholder={user?.phone}
                onChangeText={(value) => setPhone(value)}
                editable={true}
              />
            </View>
          </View>

          <Button
            mode="contained"
            style={{ marginTop: 10 }}
            onPress={() => updateProfile()}
          >
            {!saving ? "Save Change" : "Saving"}
          </Button>
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Location
          </Text>
          <View>
            <TextInput
              disabled
              value={
                user?.location?.regionName?.city +
                ", " +
                user?.location?.regionName?.country
              }
            />
          </View>
          <Button
            mode="contained"
            style={{ marginTop: 10 }}
            onPress={() => updateLocation()}
          >
            {!loading ? "Update Location " : "Updating"}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
