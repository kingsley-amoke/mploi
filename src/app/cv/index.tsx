import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { Button } from "react-native-paper";

import * as DocumentPicker from "expo-document-picker";
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

  const firstTierDetails = [
    "Career Questionnaire",
    "Uploading Existing CV",

    "Scrutinizing CV Draft",

    "CV",
  ];

  const secondTierDetails = [
    "Personalized Cover Letter",
    "Career Questionnaire",
    "Uploading Existing CV",

    "Scrutinizing CV Draft",

    "Final CV",
  ];

  const thirdTierDetails = [
    "Cover Letter",
    "A LinkedIn Profile",
    "Career Questionnaire",
    "Uploading Existing CV",

    "Scrutinizing CV Draft",

    "Final CV",
  ];
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
            Get your desired job Leave your employer with no options than to
            hire you Our CV experts can make you employable Click on the link
            below to get started
          </Text>
        </View>
        <View style={{ marginVertical: 20 }}>
          <Text>For journals and publications, let us be your plug.</Text>
          <Text>
            We offer comprehensive academic content analysis services to help
            you .
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
            Pricing
          </Text>
        </View>
        <View style={{ paddingHorizontal: 20 }}>
          <Plans
            title="First Tier"
            description="A well crafted curricullum vitae that makes you outstanding in a very
          competitive labour market."
            price="46,000"
            details={firstTierDetails}
          />
          <View style={{ marginVertical: 10 }} />
          <Plans
            title="Second Tier"
            description="A well crafted curricullum vitae that makes you outstanding in a very
          competitive labour market. Required for a more successful job applications, including a personalized cover letter."
            price="66,000"
            details={secondTierDetails}
          />
          <View style={{ marginVertical: 10 }} />
          <Plans
            title="Third Tier"
            description="A well crafted curricullum vitae that makes you outstanding in a very
          competitive labour market. An ATS-verified CV, LinkedIn profile and personalized cover letter."
            price="96,000"
            details={thirdTierDetails}
          />
          <View style={{ marginVertical: 10 }} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({});
