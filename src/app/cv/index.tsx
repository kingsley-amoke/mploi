import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Button } from "react-native-paper";

import * as MailComposer from "expo-mail-composer";
import Plans from "./components/plans";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          CV Review
        </Text>
      </LinearGradient>
      <View style={{ paddingBottom: 20, marginHorizontal: 20 }}>
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
      </View>
    </ScrollView>
  );
};

export default index;

const styles = StyleSheet.create({});
