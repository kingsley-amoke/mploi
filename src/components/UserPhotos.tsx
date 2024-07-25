import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { Text, Button } from "react-native-paper";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { getBlobFroUri } from "../utils/data";
import { PhotosCard } from "./PhotosCard";
import { MaterialIcons } from "@expo/vector-icons";
import { useUserStore } from "../state/store";

const imgDir = FileSystem.documentDirectory + "images/";

const ensureDirExists = async () => {
  const dirInfo = await FileSystem.getInfoAsync(imgDir);

  if (!dirInfo.exists) {
    await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
  }
};
export default function UserPhotos({ user }: { user: DocumentData | null }) {
  const { user: loggedUser } = useUserStore();

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    await ensureDirExists();

    const files = await FileSystem.readDirectoryAsync(imgDir);

    if (files.length > 0) {
      setImages(files.map((f) => imgDir + f));
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
      saveImage(result.assets[0].uri);
    }
  };

  const saveImage = async (uri: string) => {
    await ensureDirExists();

    const fileName = new Date().getTime() + ".jpg";
    const dest = imgDir + fileName;

    await FileSystem.copyAsync({ from: uri, to: dest });
    setImages([...images, dest]);
    uploadImage(uri, fileName);
  };

  const uploadImage = async (uri: string, filename: string | undefined) => {
    setLoading(true);

    const imageBlob = await getBlobFroUri(uri);
    if (!imageBlob) return;

    const storageRef = ref(storage, `images/${filename}`);

    uploadBytes(storageRef, imageBlob)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          const userRef = doc(firestoreDB, "users", user?._id);

          //updates user images array
          //   updateDoc(userRef, {
          //     image: url,
          //   }).then(() => {
          //     setLoading(false);
          //   });
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
              justifyContent: "center",
            }}
          >
            <MaterialIcons name="add-a-photo" size={30} />
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
