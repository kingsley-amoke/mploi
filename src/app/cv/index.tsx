import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Button } from "react-native-paper";

import * as MailComposer from "expo-mail-composer";
import Plans from "./components/plans";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import FancyHeader from "@/src/components/FancyHeader";
import { socialLinks } from "@/src/utils/data";

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

  const CVServices = [
    "Increase your chances of getting hired by 80%",
    "Stand out from the competition with a tailored CV that highlghts your strengths ",
    "Showcase your achievements and skills in a clear and concise manner",
    "Improve your online presence with a linkedin profile optimization",
  ];
  const HRServices = [
    "Content and structure",
    "Keyword optimization",
    "Formatting and design",
    "Relevance to the job market",
  ];

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="CV Review" backButton />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingVertical: 20, marginHorizontal: 20 }}>
          <View>
            <Text>Get Noticed by Emoloyers with a Professional CV!</Text>
            <Text style={{ marginVertical: 10 }}>
              Are you struggling to get noticed by employers despite having the
              right skills and experience? A well-crafted CV can make all the
              difference in getting your foot in the door.
            </Text>
            <Text>Our expert CV review services can help you:</Text>
          </View>
          {CVServices.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Entypo name="dot-single" size={20} />
              <Text>{item}</Text>
            </View>
          ))}
          <Text style={{ marginVertical: 10 }}>
            Our team of experienced recruiters and HR professionals will review
            your CV and provide personalized feedback on:
          </Text>
          {HRServices.map((item, index) => (
            <View
              key={index}
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
              <Entypo name="dot-single" size={20} />
              <Text>{item}</Text>
            </View>
          ))}
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
          <View>
            <Text>
              Don't miss out on opportunities due to a poorly written CV. Let us
              help you create a CV that gets you noticed.
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Order now and get a free cover letter review!
            </Text>
            <Text>
              Contact us at {socialLinks.email} or {socialLinks.phone} to learn
              more and schedule your CV review today.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
