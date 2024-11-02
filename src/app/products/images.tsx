import { TouchableOpacity, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useLayoutEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import {
  collection,
  doc,
  DocumentData,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { PhotosCard } from "@/src/components/PhotosCard";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useProductsStore, useUserStore } from "@/src/state/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import ProgressBar from "@/src/components/ProgressBar";

const images = () => {
  const { id } = useLocalSearchParams();

  const router = useRouter();

  const [products, setProducts] = useState<DocumentData[]>([]);
  const [product, setProduct] = useState<DocumentData>();
  const [progress, setProgress] = useState(0);

  const loadProduct = () => {
    const product = products.find((product) => product._id === id)!;
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
    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `products/${filename}`);
    const productRef = doc(firestoreDB, "products", id?.toString()!);

    const uploadTask = uploadBytesResumable(storageRef, blob);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(Math.floor(progress));
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          console.log(downloadURL);
          updateDoc(productRef, {
            images: [...product?.images, downloadURL],
          }).then(async () => {
            setProgress(0);
          });
        });
      }
    );
  };

  const productPrice = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "NGN",
  }).format(product?.price);

  useLayoutEffect(() => {
    const productsRef = query(collection(firestoreDB, "products"));
    onSnapshot(productsRef, (querySnapshot) => {
      const products: DocumentData[] = [];
      querySnapshot.forEach((doc) => {
        products.push(doc.data());
      });

      setProducts(products);
      loadProduct();
    });
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View style={{ marginVertical: 20 }}>
        <Button
          mode="outlined"
          contentStyle={{ marginVertical: 10 }}
          labelStyle={{ fontSize: 18 }}
          onPress={() => router.replace("/")}
        >
          Continue to shop
        </Button>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text>Name: {product?.name}</Text>
        <Text>Location: {product?.location}</Text>
        <Text>Price: {productPrice}</Text>
        <Text>Category: {product?.category}</Text>
      </View>
      <View style={{ marginVertical: 5 }}>
        <Text>Select images for this product (Max: 4)</Text>
      </View>
      {progress < 1 ? (
        <TouchableOpacity
          style={{
            padding: 30,
            backgroundColor: Colors.dark.primary,
            borderWidth: 1,
            borderRadius: 10,
          }}
          onPress={() => selectImage(true)}
        >
          <MaterialCommunityIcons name="plus" size={100} color="grey" />
        </TouchableOpacity>
      ) : (
        <View style={{ flexDirection: "row", gap: 10, alignItems: "center" }}>
          <ProgressBar progress={progress} barWidth={100} />
          <Text>{progress + "%"}</Text>
        </View>
      )}
      <View
        style={{
          marginVertical: 20,

          flexDirection: "row",
          gap: 5,
          flexWrap: "wrap",
        }}
      >
        {product?.images?.length > 0 &&
          product?.images?.map((image, index) => (
            <View style={{ marginHorizontal: 10 }} key={index}>
              <PhotosCard item={image} />
            </View>
          ))}
      </View>
    </View>
  );
};

export default images;
