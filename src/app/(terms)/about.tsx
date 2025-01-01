import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { socialLinks } from "@/src/utils/data";
import FancyHeader from "@/src/components/FancyHeader";
import { object } from "zod";
import { Entypo } from "@expo/vector-icons";

const About = () => {
  const values = [
    "Quality: We're committed to providing high-quality services that meet our customers' needs",
    "Reliability: We're dedicated to building a platform that's reliable and trustworthy",
    "Convenience: We're passionate about making it easy and convenient for customers to find and book services",
    "Community: We believe in building a community of customers and service providers who support and trust each other",
  ];
  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="About" backButton />
      <ScrollView
        style={{ paddingVertical: 10, marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ marginVertical: 10 }}>Welcome to MyPlug</Text>
        <Text>
          MyPlug is a revolutionary service provider and marketplace app that
          connects customers with trusted and reliable professionals for various
          services. Our mission is to make it easy and convenient for people to
          find and book quality services, while also providing a platform for
          service providers to grow their businesses.
        </Text>
        <Text style={{ marginVertical: 10 }}>Our Story</Text>
        <Text>
          We founded MyPlug with the goal of bridging the gap between customers
          and service providers. We saw an opportunity to create a platform that
          would make it easy for people to find and book services, while also
          providing a way for service providers to reach new customers and grow
          their businesses.
        </Text>
        <Text style={{ marginVertical: 10 }}>How it Works</Text>
        <Text>
          Our app allows customers to browse and book services from a variety of
          categories, including [list categories, e.g. home cleaning, automobile
          repairs, errand services, etc..] Customers can read reviews, check
          prices, and book services with just a few taps.
        </Text>
        <Text>
          For service providers, our app provides a platform to showcase their
          services, set their own prices, and manage their bookings. We also
          offer tools and resources to help service providers grow their
          businesses and improve their services.
        </Text>
        <Text style={{ marginVertical: 10 }}>Our Values</Text>
        <Text style={{ marginVertical: 10 }}>At MyPlug, we value:</Text>
        {values.map((item, index) => (
          <View
            key={index}
            style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
          >
            <Entypo name="dot-single" size={20} />
            <Text>{item}</Text>
          </View>
        ))}
        <Text style={{ marginVertical: 10 }}>Join Our Community</Text>
        <Text>
          Download our app today and experience the convenience of booking
          quality services at your fingertips. Whether you're a customer or a
          service provider, we invite you to join our community and start
          benefiting from our platform.
        </Text>
        <Text style={{ marginVertical: 10 }}>Contact Us</Text>
        <Text style={{ marginBottom: 10 }}>
          If you have any questions or feedback, please don't hesitate to
          contact us. We're always here to help.
        </Text>
        <Text>Email: {socialLinks.email}</Text>
        <Text>Phone: {socialLinks.phone}</Text>
        <Text>Address: {socialLinks.address}</Text>
        <Text style={{ marginVertical: 10 }}>
          Thank you for choosing MyPlug!
        </Text>
      </ScrollView>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({});
