import { TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { getBlobFroUri } from "@/src/utils/data";
import { PhotosCard } from "@/src/components/PhotosCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useProductsStore, useUserStore } from "@/src/state/store";
import useTheme from "@/src/hooks/useTheme";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";

const images = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const { products, updateProductImages } = useProductsStore();

  const [images, setImages] = useState<string[]>([]);
  const [product, setProduct] = useState<DocumentData | undefined>()
  const [loading, setLoading] = useState(false);


  const loadImages = async () => {
    const product = products.find(product => product._id === id);
    const files: string[] = product?.images;

    if (files?.length > 0) {
      setImages(files);
    }

    setProduct(product);
  };

  const selectImage = async (useLibrary: boolean) => {
    let result;

    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
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
          updateProductImages(product!, url);

          const productRef = doc(firestoreDB, "products", id?.toString()!);

          // updates user images array
          updateDoc(productRef, {
            images: [...images, url],
          });
        });
        setLoading(false);
      })
      .catch((error) => {
        console.log("Upload failed!", error);
        setLoading(false);
      });

    setLoading(false);
  };


  const productPrice = new Intl.NumberFormat('en-UK', {style: 'currency', currency: 'NGN'}).format(product?.price);

  useEffect(() => {

    loadImages();
  },[id])


  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginVertical: 20 }}>
        <Button mode="outlined" onPress={() => router.push("/shop")}>
          Continue to shop
        </Button>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Name: {product?.name}</Text>
        <Text>Location: {product?.location}</Text>
        <Text>Price: {productPrice}</Text>
        <Text>Category: {product?.category}</Text>
      </View>
      <View style={{marginVertical:5}}>
        <Text>Select images for this product (Max: 4)</Text>
      </View>
      {!loading ? (
        <TouchableOpacity
          style={{
            padding: 30,
            backgroundColor: Colors.dark.primary,
            borderWidth: 1,
            borderRadius:10
          }}
          onPress={() => selectImage(true)}
        >
          <MaterialCommunityIcons name="plus" size={100} color="grey" />
        </TouchableOpacity>
      ) : (
        <ActivityIndicator size="large" color="grey" />
      )}
      <View
        style={{
          marginVertical: 20,

          flexDirection: "row",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {images.length > 0 && images.map((image, index) => (
          <View style={{ marginHorizontal: 10 }} key={index}>
            <PhotosCard item={image} />
          </View>
        ))}
      </View>
    </View>
  );
};

export default images;

