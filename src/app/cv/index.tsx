import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Button } from "react-native-paper";

import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";

const index = () => {
  //   const handleSelectCV = async (isResume: boolean) => {
  //     setLoading(true);
  //     DocumentPicker.getDocumentAsync().then(async (document) => {
  //       if (!document.canceled) {
  //         const file = document.assets[0].uri;

  //         if (isResume) {
  //           setResume(file);
  //         } else {
  //           setCoverLetter(file);
  //         }
  //       }
  //     });
  //   };

  const imageLink =
    "https://firebasestorage.googleapis.com/v0/b/mploi247.appspot.com/o/others%2Freviewcv.jpeg?alt=media&token=bb825d77-d980-49a1-9ad9-4edf4604efd7";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: "center",
        margin: 20,
      }}
    >
      <View>
        <Image
          source={{
            uri: imageLink,
          }}
          style={{ width: 300, height: 300, resizeMode: "contain" }}
        />
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text>
          Get your desired job Leave your employer with no options than to hire
          you Our CV experts can make you employable Click on the link below to
          get started
        </Text>
      </View>
      <Button mode="contained">Submit</Button>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
