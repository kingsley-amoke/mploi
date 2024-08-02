import { StyleSheet, Text, View } from 'react-native'
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { getBlobFroUri } from "@/src/utils/data";
import { PhotosCard } from "@/src/components/PhotosCard";
import { Ionicons } from "@expo/vector-icons";
import { useProductsStore, useUserStore } from "@/src/state/store";
import useTheme from "@/src/hooks/useTheme";
import { useLocalSearchParams } from 'expo-router';

const images = () => {

    const {id} = useLocalSearchParams();

    const {products} = useProductsStore();

  const { colorScheme } = useTheme();


  const iconColor = colorScheme === "dark" ? "white" : "black";

  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const loadImages = async () => {
    const product = products.find((product) => product._id === id);
    const files: string[] = product?.images;

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

    const storageRef = ref(storage, `products/${filename}`);

    uploadBytes(storageRef, imageBlob)
      .then((snapshot) => {
        getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then((url) => {
          setImages([...images, url]);

          const productRef = doc(firestoreDB, "products", id?.toString()!);

          // updates user images array
          updateDoc(productRef, {
            images: [...images, url],
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
  }, [products]);

  return (
    <View>
      <Text>images</Text>
    </View>
  )
}

export default images

const styles = StyleSheet.create({})