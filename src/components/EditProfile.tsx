import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import { Button, Card, Text, TextInput } from "react-native-paper";
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
import { auth, firestoreDB, storage } from "../utils/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import ProgressBar from "./ProgressBar";

const EditProfile = () => {
  const router = useRouter();

  const { location } = useLocationStore();

  const { user } = useUserStore();

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");

  const [progress, setProgress] = useState(0);

  const handleProfileImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const filename = result.assets[0].uri.split("/").pop();
      const response = await fetch(result.assets[0].uri);
      const blob = await response.blob();

      const storageRef = ref(storage, `images/${filename}`);
      const userRef = doc(firestoreDB, "users", user?._id.toString()!);
      setLoading(true);

      const uploadTask = uploadBytesResumable(storageRef, blob);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(Math.floor(progress));
        },
        (error) => {
          // handle error
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            updateDoc(userRef, { image: downloadURL }).then(async () => {
              setProgress(0);
              setLoading(false);
            });
          });
        }
      );
    }
  };

  const updateProfile = () => {
    setSaving(true);

    const userRef = doc(firestoreDB, "users", user._id);

    const data = {
      firstName: firstName !== "" ? firstName : user?.firstName,
      lastName: lastName !== "" ? lastName : user?.lastName,
      phone: phone !== "" ? phone : user?.phone,
    };

    updateDoc(userRef, data)
      .then(() => {
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
      .then(() => {
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
      style={{ flex: 1 }}
    >
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
          Edit Profile
        </Text>
      </LinearGradient>
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 22,
        }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Profile Photo
          </Text>
          <View>
            {progress > 0 ? (
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <ProgressBar progress={progress} barWidth={100} />
                <Text>{progress + "%"}</Text>
              </View>
            ) : (
              <Card.Cover source={{ uri: user?.image }}></Card.Cover>
            )}
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginVertical: 10,
              }}
            >
              <LinearGradient
                colors={[Colors.primary, Colors.secondary]}
                start={{ x: 0, y: 0.75 }}
                end={{ x: 1, y: 0.25 }}
                style={{
                  borderRadius: 15,
                  paddingHorizontal: 20,

                  paddingVertical: 7,
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <MaterialCommunityIcons
                  name={loading ? "loading" : "shuffle-variant"}
                  size={20}
                  color="white"
                  onPress={handleProfileImageSelection}
                />
              </LinearGradient>
            </View>
          </View>
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
            contentStyle={{ marginVertical: 10 }}
            labelStyle={{ fontSize: 18 }}
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
            style={{ marginVertical: 10 }}
            contentStyle={{ marginVertical: 10 }}
            labelStyle={{ fontSize: 18 }}
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
