import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { extractImagePath, getBlobFroUri } from "../utils/data";
import { PhotosCard } from "./PhotosCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "../state/store";

export default function UserPhotos({ user }: { user: DocumentData | null }) {
  const { user: loggedUser, updateUserImage, removeUserImage } = useUserStore();

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const [images, setImages] = useState<string[]>([""]);
  const [loading, setLoading] = useState(false);

  const photos =
    loggedUser._id === user?._id ? loggedUser.photos : user?.photos;

  const loadImages = () => {
    setImages(photos);
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
      setImages([...images, result.assets[0].uri]);
    }
  };

  const uploadImage = async (uri: string) => {
    const filename = new Date().getTime() + ".jpg";

    setLoading(true);

    const imageBlob = await getBlobFroUri(uri);
    if (!imageBlob) return;

    const storageRef = ref(storage, `images/${filename}`);

    uploadBytes(storageRef, imageBlob)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          updateUserImage(url);

          const userRef = doc(firestoreDB, "users", loggedUser?._id);

          // updates user images array
          updateDoc(userRef, {
            photos: [...photos, url],
          });
        });
      })
      .catch((error) => {
        console.log("Upload failed!", error);
        setLoading(false);
      });

    setLoading(false);
  };

  const handleDeleteFile = (image: string) => {
    const index = images.indexOf(image);

    if (index > -1) {
      const updatedArray = images
        .slice(0, index)
        .concat(images.slice(index + 1));

      setImages(updatedArray);

      removeUserImage(image);

      const userRef = doc(firestoreDB, "users", loggedUser?._id);

      // updates user images array
      updateDoc(userRef, {
        photos: photos.filter((img: string) => img !== image),
      });

      //delete from storage

      const filename = extractImagePath(image);

      const storageRef = ref(storage, `images/${filename}`);
      deleteObject(storageRef);
    }
  };

  // const url =
  // "https://firebasestorage.googleapis.com/v0/b/mploi247.appspot.com/o/images%2F1724512496224`.jpg?alt=media&token=18367db0-dd5a-4d14-bb89-844f2c67ff11";

  useEffect(() => {
    loadImages();
  }, photos);

  return (
    <View style={{ marginVertical: 10, width: "100%" }}>
      <View
        style={{
          width: "100%",
          height: "100%",
          marginVertical: 20,
          flexDirection: "row",
          marginHorizontal: "auto",
          flexWrap: "wrap",
          gap: 20,
        }}
      >
        {images.map((image) => (
          <View key={image} style={{ position: "relative" }}>
            <PhotosCard item={image} />
            <View style={{ position: "absolute", right: 5 }}>
              {user?._id === loggedUser?._id && (
                <MaterialCommunityIcons
                  name="cancel"
                  size={20}
                  color="red"
                  onPress={() => handleDeleteFile(image)}
                />
              )}
            </View>
          </View>
        ))}
        {user?._id === loggedUser?._id && (
          <Button
            onPress={() => selectImage(true)}
            style={{
              backgroundColor: "grey",
              width: 100,
              height: 100,
              padding: 0,
              justifyContent: "center",
            }}
          >
            <Ionicons
              name="add"
              size={25}
              color={iconColor}
              style={{ margin: 0 }}
            />
          </Button>
        )}
      </View>
      {loading && (
        <View
          style={[
            StyleSheet.absoluteFill,
            {
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              justifyContent: "center",
              alignItems: "center",
            },
          ]}
        >
          <ActivityIndicator animating size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}
