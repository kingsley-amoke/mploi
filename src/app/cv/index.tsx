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

  // const imageLink =
  //   "https://firebasestorage.googleapis.com/v0/b/mploi247.appspot.com/o/others%2Freviewcv.jpeg?alt=media&token=bb825d77-d980-49a1-9ad9-4edf4604efd7";

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <View>
        <Text>
          Get your desired job Leave your employer with no options than to hire
          you Our CV experts can make you employable Click on the link below to
          get started
        </Text>
      </View>
      <View style={{ marginVertical: 20 }}>
        <Text>For journals and publications, let us be your plug.</Text>
        <Text>
          We offer comprehensive academic content analysis services to help you
          .
        </Text>
        <View style={{ marginVertical: 10 }}>
          <Text>1. Develop a robust research methodology.</Text>
          <Text>2. Analyse data with confidence.</Text>
          <Text>3. Interpret results with clarity.</Text>
          <Text>4. Write publishabe papers.</Text>
        </View>
        <View style={{ marginVertical: 10 }}>
          <Text>
            Whether you're working on a thesis, dissertation, or research
            article.
          </Text>
          <Text>Our experts got you covered.</Text>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text
          style={{
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 16,
            marginVertical: 10,
          }}
        >
          Our charges
        </Text>
      </View>
      <View>
        <Text>BSc: NGN170,000</Text>
        <Text>MSc: NGN300,000</Text>
        <Text>PhD: NGN480,000</Text>
      </View>
      <Button mode="contained">Submit</Button>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
