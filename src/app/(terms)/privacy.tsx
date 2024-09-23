import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {Text } from 'react-native-paper'
import { socialLinks } from "@/src/utils/data";

const personalInformation = [
  "Full name",
  "Email adress",
  "Phone  number",
  "Gender",
  "Date of birth",
  "Occupation",
  "Photo",
];

const privacy = () => {

  return (
    <ScrollView
      style={{ paddingVertical: 10, marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ marginVertical: 10 }}>
        MyPlug companies are totally committed to
        protecting your privacy.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        MyPlug APP is designed solely to satisfy the desires of numerous job
        seekers in our global space. When you visit our website and MyPlug APP,
        when you sign up, you accept the terms as it is in this Privacy policy.
        Your personal information will not be shared or transferred. It remains
        confidencial within our website and MyPlug APP except as described in
        this Privacy policy. It is important to know your rights relating to
        your personal data at our disposal. As a valued customer, subscriber,
        Service Provider and Client, you can have access to your personal data
        to see the information that we have about you and how same information
        are being processed by MyPlug. You have the rights under our privacy
        policy to object to processing of your personal data, if it exposes
        certain situations you may not want to bring to the public. It is your
        right to demand for corrections of information if your personal data was
        wrongly entered during registration. You can restrict us from processing
        your personal data if you find no reason for processing it. You have the
        right to request the transfer or sharing of your personal data, example,
        transferring or sharing personal information between our Service
        Providers and our Clients. You have the right to withdraw consent. If
        you withdraw your consent, MyPlug may not allow you to access most
        functionalities of our website and app.
      </Text>

      <Text style={{ marginVertical: 10 }}>
        To exercise any of the above mentioned rights, you can reach out to
        MyPlug through our phone lines............., Our
        email................ When you contact us, we may demand to specific
        information from you to confirm your identity.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        There are some personal data we collect from subscribers and customers.
        They are:
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        CUSTOMER INFORMATION
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Subscribers of MyPlug APP must provide customer information during
        registration/subscription, entering details on the profile form and
        upgrades. These information include:
      </Text>
      <View>
        {personalInformation.map((item) => (
          <Text key={item}>
            {"\u2B24" + " "}
            {item}
          </Text>
        ))}
      </View>

      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        INFORMATION FROM YOUR DEVICE
      </Text>
      <Text style={{ marginVertical: 10 }}>
        We collect this information when you sync your contact list on your
        device with MyPlug APP. You are expected to select two guarantors in
        order to proceed. These guarantors must be immediate family members,
        close friends or colleagues. We use these information to track, solve
        crimes and resolve conflicts within our website and MyPlug APP. MyPlug APP
        automatically notifies your selected guarantors through phone calls or
        messages.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Other information such as type of handset, IMEI or serial number and sim
        card details are also automatically extracted. These information helps
        in protecting our customers from service-related crimes.
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        LOCATION
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Your device's GPS provides us with your location information. You will
        have to grant consent. In turning off your location, you may be
        restricted from enjoying certain functionalities of MyPlug APP.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        For your awareness and consciousness, we outline user's personal
        information and data we collect as follows Identity data: these are
        user's first name, surname, other names, username, gender, title,
        marital status, date of birth, selfie pictures, photos from user's
        device, identification documents and other forms of identification.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Contact data: this includes, user's home address, workshop/office
        address, utility bills, email address and phone numbers.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Online/Social Media Data: under this category, MyPlug APP are linked to
        user's social media profile and pages, website and other online
        platforms related to you.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Financial Data: user's personal bank details, card details, statement of
        account and user's financial situation can be linked with our wallet or
        during subscription. During these processes, MyPlug APP gets access to
        user's financial Data.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Transaction Data: details about payments, subscriptions, in-app
        purchases, user's transactions with third party accounts and other
        transaction history.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Interactions: we have access to user's interactions and negotiations and
        these interactions are stored, for reference purposes.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Communication Data: this includes user's correspondence by emails,
        messages and feedbacks. We may retain the content of such messages and
        our responses.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Technical Data: these are user's Password/PIN, Internet Protocol (IP)
        address, your login data, browser type, version and other settings.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Device Data: user's contacts, their names and phone numbers, details of
        handset, IMEI and serial number, information about sim card.
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        SHARING OF PERSONAL INFORMATION
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Personal information is considered as a vital part of our relationship
        with users of MyPlug APP. We may share your personal information with
        third parties on the following instances:
      </Text>
      <Text style={{ marginVertical: 10 }}>
        MyPlug shares personal information between a CLIENT or employer and
        SERVICE PROVIDER or employee. Sharing of these personal information
        enhance interactions, negotiations and transactions among our users and
        subscribers. During this process, details like name, phone numbers, home
        address, bank account numbers and account names may be shared among our
        users and subscribers. Sharing of financial account details is solely at
        the discretion of our users and subscribers. Users can as well decide
        not to share this information for personal reasons.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Users who are interested in our loan facilities may be asked to share
        information about their identification, location, bank account details,
        transaction history and phone contact details. These information enables
        the company to access user's and loan applicants financial strength and
        credit score to determine their eligibility for loan facilities. In case
        of fraud and financial crimes of any kind, the user or subscriber may be
        tracked using the above details.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        As we develop our app, we may buy or sell business or assets. We may
        transfer user's personal data as part of the transferred assets without
        your consent.
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        DISCLOSURE OF PERSONAL INFORMATION
      </Text>
      <Text style={{ marginVertical: 10 }}>
        User's information may be disclosed in the following cases without
        user's consent:
      </Text>
      <Text style={{ marginVertical: 10 }}>
        * To grant a request from the regulator or government organization or
        agency with sufficient authority.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        * To grant other legal obligations and requests from a court.
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        User's Responsibilities
      </Text>
      <Text style={{ marginVertical: 10 }}>
        It is the sole responsibility of our users to protect their Password or
        PIN. User must not disclose their Password or PIN to anyone.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        MyPlug will never request for user's Password or PIN via any means of
        communication. Please disregard any request for user's Password or PIN
        or contact us on info@MyPlugglobal.com or call 07017663503
      </Text>
      <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
        Consent
      </Text>
      <Text style={{ marginVertical: 10 }}>
        It is important to note that by accessing or using our services, you
        consent to the collection, usage, storage and disclosure of your user
        information as set out in our Privacy Policy.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Our Privacy Policy shall be governed in accordance with the relevant
        laws of the Federal Republic of Nigeria.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        Our Privacy Policy may be amended or changed with time at the discretion
        of MyPlug.
      </Text>
      <Text style={{ marginVertical: 10 }}>
        By continuing to use our website and MyPlug APP after the change, you
        consent to the new policy.
      </Text>
      <Text style={{ marginVertical: 10 }}>Our contact</Text>
      <Text style={{ marginVertical: 10, marginBottom:20 }}>
        For any enquiry, please contact us on {socialLinks.email} or call
        07017663503
      </Text>
    </ScrollView>
  );
};

export default privacy;

const styles = StyleSheet.create({});
