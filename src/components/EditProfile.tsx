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
// import * as ImagePicker from "expo-image-picker";
// import SectionedMultiSelect from "react-native-sectioned-multi-select";
// import { MaterialIcons as Icon, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCategoryStore, useUserStore } from "@/src/state/store";
import { Colors } from "../constants/Colors";
import { CustomToast, getBlobFroUri } from "../utils/data";
import { firestoreDB, storage } from "../utils/firebaseConfig";
import { ref } from "firebase/storage";
// import { getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getLoggedUser } from "../utils/userActions";

const EditProfile = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const { user, storeUser } = useUserStore();
  // const { categories } = useCategoryStore();

  // const [selectedItems, setSelectedItems] = useState([""]);
  const [loading, setLoading] = useState(false);

  // const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  // const [bio, setBio] = useState("");

  // const handleProfileImageSelection = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 4],
  //     quality: 1,
  //   });

  //   if (!result.canceled) {
  //     const imageBlob = await getBlobFroUri(result.assets[0].uri);

  //     if (!imageBlob) return;

  //     const filename = result.assets[0].uri.split("/").pop();

  //     const storageRef = ref(storage, `images/${filename}`);

  //     uploadBytes(storageRef, imageBlob)
  //       .then((snapshot) => {
  //         getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
  //           (url) => {
  //             setProfileImage(url);
  //           }
  //         );
  //       })
  //       .catch((error) => {
  //         console.log("Upload failed!", error);
  //         setLoading(false);
  //       });
  //   }
  // };

  const updateProfile = async () => {
    // selectedItems.shift();
    // const updatedSkills = [...selectedItems];

    // const uniqueSkills = [...new Set([...updatedSkills, ...user?.skills])];

    setLoading(true);
    const loggedUser = await getLoggedUser();

    const userRef = doc(firestoreDB, "users", loggedUser._id);

    const data = {
      firstName: firstName !== "" ? firstName : user?.firstName,
      lastName: lastName !== "" ? lastName : user?.lastName,
      phone: phone !== "" ? phone : user?.phone,
      // image: profileImage !== "" ? profileImage : user?.image,
      // bio: bio !== "" ? bio : user?.bio,
      // skills: uniqueSkills,
    };

    updateDoc(userRef, data).then(async () => {
      const user = await getDoc(userRef);

      storeUser(user.data()!);
      router.push("/profile");
      CustomToast("Profile updated Successfully");
      setLoading(false);
    });

    setLoading(false);
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
          {/* <View
            style={{
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={handleProfileImageSelection}>
              <Image
                source={{ uri: profileImage ? profileImage : user?.image }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: borderColor,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={32}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View> */}
          <View>
            <Text>Please update your profile to continue!</Text>
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
            onPress={() => updateProfile()}
          >
            {!loading ? "Save Change" : "Saving"}
          </Button>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
