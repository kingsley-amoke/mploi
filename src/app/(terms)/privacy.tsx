import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import FancyHeader from "@/src/components/FancyHeader";

const privacy = () => {
  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Privacy Policy" backButton />
      <ScrollView
        style={{ paddingVertical: 10, marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ marginVertical: 10 }}>
          MyPlug ("we," "us," or "our") provides a marketplace and service
          provider app (the "App") that connects customers with service
          providers. This Privacy Policy explains how we collect, use, share,
          and protect personal information through the App.
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          INFORMATION WE COLLECT
        </Text>
        <Text style={{ marginVertical: 10 }}>
          We collect the following types of information:
        </Text>

        <Text style={{ marginVertical: 10 }}>
          1. Personal Information: name, email address, phone number, and
          physical address.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          2. Device Information: device type, operating system, and location
          data.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          3. Service Provider Information: business name, address, phone number,
          and services offered.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          4. Transaction Information: payment information, service details, and
          transaction history.
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          HOW WE COLLECT INFORMATION
        </Text>
        <Text style={{ marginVertical: 10 }}>We collect information:</Text>
        <Text style={{ marginVertical: 10 }}>
          1. Directly from users through the App, website, or customer support.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          2. Automatically through the App, including device and location data.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          3. From third-party partners, such as payment processors and social
          media platforms.
        </Text>

        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          HOW WE USE INFORMATION
        </Text>
        <Text style={{ marginVertical: 10 }}>We use information to:</Text>
        <Text style={{ marginVertical: 10 }}>
          1. Provide and improve the App's services.
        </Text>
        <Text style={{ marginVertical: 2 }}>2. Enhance user experience.</Text>
        <Text style={{ marginVertical: 2 }}>3. Offer customer support.</Text>
        <Text style={{ marginVertical: 2 }}>
          4. Conduct research and analytics
        </Text>
        <Text style={{ marginVertical: 2 }}>
          5. Comply with legal obligations.
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          SHARING INFORMATION
        </Text>
        <Text style={{ marginVertical: 10 }}>We share information with:</Text>
        <Text style={{ marginVertical: 10 }}>
          1. Authorized service providers.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          2. Law enforcement agencies (with valid legal requests).
        </Text>
        <Text style={{ marginVertical: 2 }}>
          3. Third-party partners (for research or analytics).
        </Text>
        <Text style={{ marginVertical: 2 }}>
          4. Service Providers (to facilitate transactions).
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          SHARING INFORMATION
        </Text>
        <Text style={{ marginVertical: 10 }}>
          We implement industry-standard security measures to protect
          information, including:
        </Text>
        <Text style={{ marginVertical: 10 }}>1. Encryption.</Text>
        <Text style={{ marginVertical: 2 }}>2. Sercure servers.</Text>
        <Text style={{ marginVertical: 2 }}>3. Firewalls.</Text>
        <Text style={{ marginVertical: 2 }}>4. Access controls.</Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          DATA RETENTION
        </Text>
        <Text style={{ marginVertical: 10 }}>We retain information for:</Text>
        <Text style={{ marginVertical: 10 }}>
          1. As long as necessary to provide services.
        </Text>
        <Text style={{ marginVertical: 2 }}>2. As required by law.</Text>

        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          USE RIGHTS
        </Text>
        <Text style={{ marginVertical: 10 }}>You have the right to:</Text>

        <Text style={{ marginVertical: 10 }}>
          1. Access and correct personal information.
        </Text>
        <Text style={{ marginVertical: 2 }}>2. Request data deletion.</Text>
        <Text style={{ marginVertical: 2 }}>3. Opt-out of data sharing.</Text>
        <Text style={{ marginVertical: 2 }}>4. Access controls.</Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          CHANGES TO THIS POLICY
        </Text>
        <Text style={{ marginVertical: 10 }}>
          We reserve the right to update this policy at any time.
        </Text>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          CONTACT US
        </Text>
        <Text style={{ marginVertical: 10 }}>
          For questions or concerns, please contact:
        </Text>
        <Text style={{ marginVertical: 10 }}>MyPlug Mobile App</Text>
        <Text style={{ marginVertical: 2 }}>
          81 Agwangede Extension, Kuje, Abuja.
        </Text>
        <Text style={{ marginVertical: 2 }}>connect@myplugmobile.com.</Text>
        <Text style={{ marginVertical: 2 }}>+2347017663503</Text>

        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          ADDITIONAL DISCLOSURES
        </Text>
        <Text style={{ marginVertical: 10 }}>
          - California Residents: We comply with California Consumer Privacy Act
          (CCPA) requirements.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          - EU Residents: We comply with General Data Protection Regulation
          (GDPR) requirements.
        </Text>
        <Text style={{ marginVertical: 2 }}>
          - Nigeria Residents: We comply with Federal Competition and Consumer
          Protection Commission (FCCPC)
        </Text>
        <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
          ACKNOLEDGEMENT
        </Text>
        <Text style={{ marginVertical: 10 }}>
          By using the App, you acknowledge that you have read, understood, and
          agree to this Privacy Policy.
        </Text>
        <Text style={{ marginVertical: 10 }}>Last Updated:</Text>
        <Text style={{ marginVertical: 10 }}>31 December 2024</Text>
      </ScrollView>
    </View>
  );
};

export default privacy;

const styles = StyleSheet.create({});
