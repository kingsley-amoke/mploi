import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Button, Card, Dialog, Portal } from "react-native-paper";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firestoreDB, storage } from "@/src/utils/firebaseConfig";
import {
  deleteDoc,
  doc,
  DocumentReference,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import * as DocumentPicker from "expo-document-picker";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useUserStore } from "@/src/state/store";
import ProgressBar from "@/src/components/ProgressBar";
import { CustomToast, deduct } from "@/src/utils/data";

const Plans = ({
  title,
  description,
  price,
  details = [],
}: {
  title: string;
  description: string;
  price: number;
  details: string[];
}) => {
  const { user: loggedUser } = useUserStore();

  const [visible, setVisible] = useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const [progress, setProgress] = useState(0);
  const [currentCV, setCurrentCV] = useState("");

  async function pickCV() {
    DocumentPicker.getDocumentAsync().then(async (document) => {
      if (!document.canceled) {
        const file = document.assets[0].uri;
        uploadCV(file);
      }
    });
  }

  async function uploadCV(file: string) {
    const docID = `${Date.now()}`;

    const response = await fetch(file);
    const blob = await response.blob();
    const storageRef = ref(storage, "resume/" + docID);
    const cvRef = doc(firestoreDB, "resume", docID);

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setProgress(Math.floor(progress));
      },
      (error) => {
        // handle error
        CustomToast("Something went wrong!!");
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          // save record

          await setDoc(cvRef, {
            _id: docID,
            userID: loggedUser?._id,
            userEmail: loggedUser?.email,
            userPhone: loggedUser?.phone,
            resume: downloadURL,
            plan: title,
            price: price,
            status: "pending",
          });
          setCurrentCV(docID);
          setProgress(0);
        });
      }
    );
  }

  const onCancel = () => {
    if (!currentCV) {
      hideModal();
      CustomToast("Canceled");
    } else {
      hideModal();
      CustomToast("Canceled");
      deleteDoc(doc(firestoreDB, "resume", currentCV));
      deleteObject(ref(storage, "resume/" + currentCV));
    }
  };

  const onProceed = async () => {
    if (!currentCV) {
      hideModal();
    } else {
      await deduct(loggedUser, price);
      hideModal();
      CustomToast("CV submitted successfully");
      updateDoc(doc(firestoreDB, "resume", currentCV), { status: "paid" });
    }
  };

  return (
    <Card>
      <Card.Content>
        <Card.Title
          title={title}
          titleStyle={{ textAlign: "center", fontWeight: "bold" }}
        />
        <Text style={{ textAlign: "center", marginVertical: 10 }}>
          {description}
        </Text>
        <Text
          style={{
            textAlign: "center",
            marginVertical: 20,
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          {new Intl.NumberFormat("en-UK", {
            currency: "NGN",
            style: "currency",
          }).format(price)}
        </Text>
        <Portal>
          <Dialog
            visible={visible}
            onDismiss={hideModal}
            style={{
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <View
              style={{
                width: "100%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>
                This service is going to cost{" "}
                {new Intl.NumberFormat("en-UK", {
                  style: "currency",
                  currency: "NGN",
                }).format(price)}
                .
              </Text>
              <TouchableOpacity
                style={{
                  width: "80%",
                  height: 200,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "silver",
                  borderRadius: 10,
                  margin: 20,
                }}
                onPress={pickCV}
              >
                {progress > 0 ? (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text style={{ marginBottom: 10 }}>
                      {progress === 100 ? "Done" : "Uploading..."}
                    </Text>
                    <ProgressBar progress={progress} barWidth={300} />
                  </View>
                ) : (
                  <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <Text>Upload CV here</Text>
                    <MaterialCommunityIcons
                      name="file-upload"
                      size={40}
                      style={{ marginTop: 10 }}
                    />
                  </View>
                )}
              </TouchableOpacity>
              <View
                style={{
                  width: "70%",
                  marginBottom: 10,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Button mode="outlined" onPress={onCancel}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={onProceed}>
                  Proceed
                </Button>
              </View>
            </View>
          </Dialog>
        </Portal>
        <Button
          mode="contained"
          labelStyle={{ paddingVertical: 10 }}
          onPress={showModal}
        >
          Checkout
        </Button>

        <Card.Content
          style={{ marginVertical: 20, flexDirection: "column", gap: 10 }}
        >
          {details.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 20 }}
            >
              <MaterialCommunityIcons name="check" />
              <Text>{item}</Text>
            </View>
          ))}
        </Card.Content>
      </Card.Content>
    </Card>
  );
};

export default Plans;

const styles = StyleSheet.create({});
