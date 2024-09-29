import { useColorScheme, View } from "react-native";
import { Button, Text } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
  uploadBytesResumable,
} from "firebase/storage";
import {
  collection,
  doc,
  DocumentData,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { extractImagePath, getBlobFroUri } from "../utils/data";
import { PhotosCard } from "./PhotosCard";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useUserStore } from "../state/store";
import { Video } from "expo-av";
import { Uploading } from "./BlurView";
import ProgressBar from "./ProgressBar";

export default function UserPhotos({ user }: { user: DocumentData | null }) {
  const { user: loggedUser, storeUser } = useUserStore();

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  // const [loading, setLoading] = useState(false);
  const [photos, setPhotos] = useState<string[]>([""]);
  const [userVideo, setUserVideo] = useState("");
  const [video, setVideo] = useState("");
  const [image, setImage] = useState("");
  const [progress, setProgress] = useState(0);

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
      setImage(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
      // setImages([...images, result.assets[0].uri]);
    }
  };

  const uploadImage = async (uri: string) => {
    const filename = new Date().getTime() + ".jpg";

    const response = await fetch(uri);
    const blob = await response.blob();

    const storageRef = ref(storage, `images/${filename}`);
    const userRef = doc(firestoreDB, "users", loggedUser?._id);

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

          await updateDoc(userRef, {
            photos: photos ? [...photos, downloadURL] : [downloadURL],
          });
          setImage("");
        });
      }
    );
  };

  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // here it is where we specify the allow format
      allowsEditing: true,
      aspect: [3, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setVideo(result.assets[0].uri);
      // to upload image see the next function
      await uploadVideo(result.assets[0].uri);
    }
  };

  const uploadVideo = async (uri: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, "video/" + new Date().getTime());
    const userRef = doc(firestoreDB, "users", loggedUser?._id);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    // listen for events
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
          await updateDoc(userRef, {
            video: downloadURL,
          });

          setVideo("");
        });
      }
    );
  };

  const handleDeleteFile = (image: string) => {
    const userRef = doc(firestoreDB, "users", loggedUser?._id);

    // updates user images array
    updateDoc(userRef, {
      photos: photos?.filter((img: string) => img !== image),
    });

    //delete from storage

    const filename = extractImagePath(image);

    const storageRef = ref(storage, `images/${filename}`);
    deleteObject(storageRef);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(firestoreDB, "users/" + user?._id),
      (snapshot) => {
        setPhotos(snapshot.data()?.photos);
        setUserVideo(snapshot.data()?.video);
      }
    );

    return () => unsubscribe();
  }, []);

  return (
    <View style={{ marginVertical: 10, width: "100%", flex: 1 }}>
      <View
        style={{
          backgroundColor: "grey",
          justifyContent: "center",
          alignItems: "center",
          height: 200,
          borderRadius: 10,
        }}
      >
        {video ? (
          <View
            style={{
              backgroundColor: "grey",
              width: 120,
              height: 120,
              padding: 0,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.7,
              borderRadius: 10,
            }}
          >
            <ProgressBar progress={progress} barWidth={100} />
          </View>
        ) : userVideo ? (
          <Video
            source={{
              uri: userVideo,
            }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            isLooping
            resizeMode="cover"
            shouldPlay
            style={{ width: "100%", height: "100%" }}
            useNativeControls
          />
        ) : user?._id === loggedUser?._id ? (
          <MaterialCommunityIcons
            name="video-plus"
            size={40}
            onPress={() => pickVideo()}
          />
        ) : (
          <Text style={{ color: "silver" }}>No video</Text>
        )}
      </View>
      {user?._id === loggedUser?._id && (
        <Button
          mode="contained"
          style={{ marginVertical: 10, marginHorizontal: 20, marginTop: 10 }}
          onPress={() => {
            pickVideo();
            const filename = extractImagePath(userVideo);

            const storageRef = ref(storage, `images/${filename}`);
            deleteObject(storageRef);
          }}
        >
          Change Video
        </Button>
      )}
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
        {photos &&
          photos?.map((item: string, index: number) => (
            <View key={index} style={{ position: "relative" }}>
              <PhotosCard item={item} />
              <View style={{ position: "absolute", right: 5 }}>
                {user?._id === loggedUser?._id && (
                  <MaterialCommunityIcons
                    name="cancel"
                    size={20}
                    color="red"
                    onPress={() => handleDeleteFile(item)}
                  />
                )}
              </View>
            </View>
          ))}
        {user?._id === loggedUser?._id &&
          (image ? (
            <View
              style={{
                backgroundColor: "grey",
                width: 120,
                height: 120,
                padding: 0,
                justifyContent: "center",
                alignItems: "center",
                opacity: 0.7,
                borderRadius: 10,
              }}
            >
              <ProgressBar progress={progress} barWidth={100} />
            </View>
          ) : (
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
              <MaterialCommunityIcons
                name="plus"
                size={25}
                color={iconColor}
                style={{ margin: 0 }}
              />
            </Button>
          ))}
      </View>
    </View>
  );
}
