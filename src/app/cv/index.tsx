import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Button } from "react-native-paper";

import * as MailComposer from "expo-mail-composer";
import Plans from "./components/plans";

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

  const firstTier = {
    title: "First Tier",
    description:
      "A well crafted curricullum vitae that makes you outstanding in a very competitive labour market.",
    price: 46000,
    details: [
      "Career Questionnaire",
      "Uploading Existing CV",

      "Scrutinizing CV Draft",

      "CV",
    ],
  };

  const secondTier = {
    title: "Second Tier",
    description:
      "A well crafted curricullum vitae that makes you outstanding in a very competitive labour market. Required for a more successful job applications, including a personalized cover letter.",
    price: 66000,
    details: [
      "Personalized Cover Letter",
      "Career Questionnaire",
      "Uploading Existing CV",

      "Scrutinizing CV Draft",

      "Final CV",
    ],
  };

  const thirdTier = {
    title: "Third Tier",
    description:
      "A well crafted curricullum vitae that makes you outstanding in a very competitive labour market. An ATS-verified CV, LinkedIn profile and personalized cover letter.",
    price: 96000,
    details: [
      "Cover Letter",
      "A LinkedIn Profile",
      "Career Questionnaire",
      "Uploading Existing CV",

      "Scrutinizing CV Draft",

      "Final CV",
    ],
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        margin: 20,
      }}
    >
      <ScrollView
        style={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View>
          <Text>
            Get your desired job, leave your employer with no options than to
            hire you.
          </Text>
          <Text style={{ marginVertical: 10 }}>
            Our CV experts can make you employable.
          </Text>
          <Text>Click on the link below to get started.</Text>
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
            Pricing
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Plans
            title={firstTier.title}
            description={firstTier.description}
            price={firstTier.price}
            details={firstTier.details}
          />
          <View style={{ marginVertical: 10 }} />
          <Plans
            title={secondTier.title}
            description={secondTier.description}
            price={secondTier.price}
            details={secondTier.details}
          />
          <View style={{ marginVertical: 10 }} />
          <Plans
            title={thirdTier.title}
            description={thirdTier.description}
            price={thirdTier.price}
            details={thirdTier.details}
          />
          <View style={{ marginVertical: 10 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
