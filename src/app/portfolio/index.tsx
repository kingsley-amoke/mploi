import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";

import { Colors } from "../../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useUserStore } from "@/src/state/store";
import { auth, firestoreDB, storage } from "@/src/utils/firebaseConfig";
import {
  Button,
  Card,
  Dialog,
  Divider,
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

import { extractImagePath } from "@/src/utils/data";
import FancyHeader from "@/src/components/FancyHeader";

import { UIActivityIndicator } from "react-native-indicators";

const index = () => {
  const { user } = useUserStore();

  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [visible, setVisible] = useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);

  const handleUpdatePortfolio = () => {
    setLoading(true);

    const newPortfolio = {
      image: image,
      description: description,
    };

    updateDoc(userRef, { portfolio: [...user?.portfolio, newPortfolio] }).then(
      () => {
        setLoading(false);
        hideDialog();
      }
    );
  };

  const uploadImage = async (url: string) => {
    setUploading(true);
    const filename = new Date().getTime() + ".jpg";

    const response = await fetch(url);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${filename}`);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      setImage(downloadURL);
    });

    setUploading(false);
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
    <View style={{ flex: 1 }}>
      <FancyHeader title="Update Portfolio" backButton />
      <View
        style={{ flexDirection: "row", justifyContent: "flex-end", margin: 10 }}
      >
        <Button mode="outlined" onPress={showDialog}>
          Add Portfolio
        </Button>
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginHorizontal: 10,
          marginVertical: 10,

          color: Colors.grey,
        }}
      >
        Current Portfolio
      </Text>
      {user?.portfolio?.length > 0 && (
        <FlatList
          data={user?.portfolio}
          renderItem={({ item, index }) => (
            <View key={index} style={{ marginVertical: 15, gap: 15 }}>
              <View
                style={{
                  flexDirection: "row",
                  gap: 15,
                  marginHorizontal: 10,
                }}
              >
                <Card style={{ width: 100, height: 100 }}>
                  <Card.Cover
                    source={{ uri: item.image }}
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
                    <Text style={{ flexShrink: 1 }}>{item.description}</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      alignItems: "flex-end",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="trash-can"
                      size={30}
                      color="red"
                      onPress={() => handleDeletePortfolio(index, item)}
                    />
                  </View>
                </View>
              </View>
              <Divider bold />
            </View>
          )}
        />
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
            <Text style={{ fontSize: 16 }}>Show off your previous jobs</Text>

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
              ) : uploading ? (
                <UIActivityIndicator color={Colors.primary} />
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
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
