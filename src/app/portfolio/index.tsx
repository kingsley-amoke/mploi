import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useUsersStore } from "@/src/state/store";
import { auth, firestoreDB, storage } from "@/src/utils/firebaseConfig";
import {
  Button,
  Card,
  Dialog,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { doc, updateDoc } from "firebase/firestore";

import * as ImagePicker from "expo-image-picker";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import ProgressBar from "@/src/components/ProgressBar";
import { Image } from "expo-image";
import { extractImagePath } from "@/src/utils/data";

const index = () => {
  const router = useRouter();

  const { users } = useUsersStore();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const [progress, setProgress] = useState(0);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const user = users.find((usr) => usr._id === auth.currentUser?.uid)!;

  const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);

  const handleUpdatePortfolio = () => {
    setLoading(true);

    const newPortfolio = {
      image: image,
      description: description,
    };

    updateDoc(userRef, { portfolio: [...user?.portfolio, newPortfolio] }).then(
      () => {
        // router.back();
        setLoading(false);
        hideDialog();
      }
    );
  };

  const uploadImage = async (url: string) => {
    const filename = new Date().getTime() + ".jpg";

    const response = await fetch(url);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${filename}`);

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
          console.log("File available at", downloadURL);
          // save record

          setImage(downloadURL);
        });
      }
    );
  };

  const selectImage = async (useLibrary: boolean) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    };

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
      // setImages([...images, result.assets[0].uri]);
    }
  };

  const handleDeletePortfolio = (
    index: number,
    item: { image: string; description: string }
  ) => {
    setLoading(true);
    if (index > -1) {
      // only splice array when item is found
      user?.portfolio.splice(index, 1); // 2nd parameter means remove one item only
    }
    updateDoc(userRef, { portfolio: user?.portfolio }).then(() => {
      const filename = extractImagePath(item.image);

      const storageRef = ref(storage, `images/${filename}`);
      deleteObject(storageRef);
      setLoading(false);
    });
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
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", margin: 10 }}
      >
        <Button mode="outlined" onPress={showDialog}>
          Add Portfolio
        </Button>
      </View>
      {user?.portfolio?.length > 0 && (
        <View style={{ width: "100%" }}>
          {user?.portfolio.map((portfolio, index) => (
            <View
              key={index}
              style={{
                flexDirection: "row",
                gap: 15,
                marginHorizontal: 10,
                marginBottom: 15,
              }}
            >
              <Card style={{ width: 150, height: 150 }}>
                <Card.Cover
                  source={{ uri: portfolio.image }}
                  style={{ height: "100%" }}
                />
              </Card>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flex: 1,
                }}
              >
                <View style={{ flexDirection: "row", flexShrink: 1 }}>
                  <Text style={{ flexShrink: 1 }}>{portfolio.description}</Text>
                </View>
                <View
                  style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
                >
                  <MaterialCommunityIcons
                    name="trash-can"
                    size={30}
                    color="red"
                    onPress={() => handleDeletePortfolio(index, portfolio)}
                  />
                </View>
              </View>
            </View>
          ))}
        </View>
      )}

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Content
            style={{
              justifyContent: "center",
              alignItems: "center",
              gap: 30,
            }}
          >
            {progress > 0 && (
              <View
                style={{ flexDirection: "row", gap: 10, alignItems: "center" }}
              >
                <ProgressBar progress={progress} barWidth={100} />
                <Text>{progress + "%"}</Text>
              </View>
            )}
            <TouchableOpacity
              style={{
                width: 100,
                height: 100,
                borderWidth: 1,
                borderRadius: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => selectImage(true)}
            >
              {image ? (
                <Card style={{ width: 150, height: 150 }}>
                  <Card.Cover
                    source={{ uri: image }}
                    style={{ height: "100%" }}
                  />
                </Card>
              ) : (
                <MaterialCommunityIcons name="upload" size={40} color="grey" />
              )}
            </TouchableOpacity>
            <TextInput
              multiline
              onChangeText={(value) => setDescription(value)}
              style={{ width: "90%" }}
              label="Description here.."
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode="contained"
              onPress={handleUpdatePortfolio}
              style={{ paddingHorizontal: 10, paddingVertical: 8 }}
              labelStyle={{ fontSize: 20 }}
            >
              {loading ? "Please wait..." : "Add"}
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
