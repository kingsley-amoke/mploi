import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { getBlobFroUri } from "../utils/data";
import { PhotosCard } from "./PhotosCard";
import { Ionicons } from "@expo/vector-icons";
import { useUserStore } from "../state/store";
import useTheme from "../hooks/useTheme";

export default function UserPhotos({ user }: { user: DocumentData | null }) {
  const { user: loggedUser } = useUserStore();

  const { colorScheme } = useTheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    const files: string[] = user?.photos;

    if (files?.length > 0) {
      setImages(files);
    }
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

  const uploadImage = async (uri: string) => {
    const filename = new Date().getTime() + ".jpg";

    setLoading(true);

    const imageBlob = await getBlobFroUri(uri);
    if (!imageBlob) return;

    const storageRef = ref(storage, `images/${filename}`);

    uploadBytes(storageRef, imageBlob)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          setImages([...images, url]);

          const userRef = doc(firestoreDB, "users", loggedUser?._id);

          // updates user images array
          updateDoc(userRef, {
            photos: [...images, url],
          });
        });
      })
      .catch((error) => {
        console.log("Upload failed!", error);
        setLoading(false);
      });

    setLoading(false);
  };

  useEffect(() => {
    loadImages();
  }, []);

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
          gap: 30,
        }}
      >
        {images.map((image) => (
          <PhotosCard item={image} key={image} />
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
