import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { socialLinks } from "@/src/utils/data";

const About = () => {
  return (
    <ScrollView
      style={{ paddingVertical: 10, marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text>
        MyPlug APP is an online service rendering platform with a wide patronage
        from unemployed/part-time job seekers who are willing to earn income and
        extra income per hourly/daily basis. MyPlug APP encourages skills
        acquisition and provides a rare opportunity for these skills to thrive
        through it's open market structure.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        In MyPlug APP Clients (job owners/employers) are free to order for
        services of any Service Provider (job seekers/employee) as it is
        structured in our mobile app and our Service Providers can select jobs
        based on his/her acquired skills.
      </Text>
      <Text>
        Irrespective of how simple a job may seem, it can be paid for when
        completed under the provisions of MyPlug APP. Take advantage of our
        in-app purchases, product and services, loans and credits and our mobile
        wallet, in-app calls and chat. These options are provided to satisfy the
        desires our users and subscribers.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Myplug Mobile APP also provides a unique market platform where all kinds
        of goods can be posted and displayed to attract potential buyers. Users
        can also take advantage of our in-app chats for easy communication
        between buyers and sellers.
      </Text>
      <Text>
        MyPlug APP is user friendly, MyPlug promos and bonuses makes it possible
        for our lucky users and subscribers to win prizes just by using our app.
      </Text>
      <Text>
        In order to support the Education sector especially in Nigeria, students
        of higher institutions across Nigeria can take advantage of our MyPlug
        student scholarship programs which provides fundings for school fees and
        other Educational needs.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        For more information about our website, MyPlug APP and our businesses,
        please contact us on {socialLinks.email} or call 07017663503
      </Text>
      <Text style={{ marginVertical: 10 }}>MyPlug</Text>
      <Text style={{ marginVertical: 10, paddingBottom: 10 }}>
        work now, earn now now
      </Text>
    </ScrollView>
  );
};

export default About;

const styles = StyleSheet.create({});
