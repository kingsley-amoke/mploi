import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { socialLinks } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const Terms = () => {
  const router = useRouter();
  return (
    <View>
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
          Terms & Conditions
        </Text>
      </LinearGradient>

      <ScrollView
        style={{ paddingVertical: 10, marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ marginVertical: 10 }}>TERMS AND CONDITIONS</Text>
        <View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            MyPlug
          </Text>
          <View>
            <Text style={{ marginVertical: 5 }}>
              Effective Date: February, 2024
            </Text>

            <Text style={{ marginVertical: 5 }}>
              <Text style={{ fontWeight: "700" }}>Introduction:</Text> MyPlug
              ("we," "us," or "our") provides a marketplace and service
              providers app (the "App") that connects customers with service
              providers. These Terms and Conditions ("Terms") govern your use of
              the App.
            </Text>

            <Text style={{ fontWeight: "700" }}>Definitions:</Text>
            <Text style={{ marginVertical: 2 }}>
              - "App" refers to the MyPlug marketplace and service providers
              app.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              - "User" refers to you, the individual using the App.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              - "Customer" refers to a User who requests services through the
              App.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              - "Service Provider" refers to a User who offers services through
              the App.
            </Text>
            <Text style={{ fontWeight: "700" }}>User Agreement:</Text>
            <Text style={{ marginVertical: 10 }}>
              1. By using the App, you agree to these Terms.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              2. You must be at least 18 years old to use the App.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              3. You warrant that you have the authority to enter into these
              Terms.
            </Text>
            <Text style={{ fontWeight: "700" }}>Account Registration:</Text>
            <Text style={{ marginVertical: 10 }}>
              1. To use the App, you must create an account.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              2. You must provide accurate and complete information during the
              registration process.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              3. You are responsible for maintaining the confidentiality of your
              account credentials.
            </Text>
            <Text style={{ fontWeight: "700" }}>Service Providers: </Text>
            <Text style={{ marginVertical: 10 }}>
              1. Service Providers are independent contractors and not employees
              of MyPlug.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              2. Service Providers are responsible for providing their own
              equipment, materials, and labor.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              3. Service Providers must comply with all applicable laws and
              regulations.
            </Text>
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
            >
              Payment Terms:
            </Text>
            <Text style={{ marginVertical: 10 }}>
              1. Customers must pay for services through the App's payment
              system.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              2. Service Providers will receive payment for their services
              through the App's payment system.
            </Text>
            <Text style={{ marginVertical: 2 }}>
              3. MyPlug may charge a commission fee for each transaction.
            </Text>
            <View>
              <Text style={{ fontWeight: "700" }}>
                Cancellation and Refund Policy:
              </Text>
              <Text style={{ marginVertical: 10 }}>
                1. Customers may cancel a service request at any time before the
                service is completed.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. Service Providers may cancel a service request at any time
                before the service is completed.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                3. Refunds will be processed in accordance with MyPlug's refund
                policy.
              </Text>
              <Text style={{ fontWeight: "700" }}>Intellectual Property::</Text>
              <Text style={{ marginVertical: 10 }}>
                1. The App and its content are owned by MPLOi Global Resources
                and are protected by intellectual property laws.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. You may not reproduce, distribute, or display any content
                from the App without MyPlug's prior written consent.
              </Text>
              <Text style={{ fontWeight: "700" }}>Disclaimer of Warranty:</Text>
              <Text style={{ marginVertical: 10 }}>
                1. The App is provided on an "as is" and "as available" basis.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. MyPlug disclaims all warranties, express or implied.
              </Text>
              <Text style={{ fontWeight: "700" }}>
                Limitation of Liability:
              </Text>
              <Text style={{ marginVertical: 10 }}>
                1. MyPlug shall not be liable for any damages or losses arising
                from your use of the App.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. MyPlug's liability shall be limited to the amount you paid
                for the services.
              </Text>
              <Text style={{ fontWeight: "700" }}>Governing Law:</Text>
              <Text style={{ marginVertical: 10 }}>
                1. These Terms shall be governed by and construed in accordance
                with the laws of the Federal Republic of Nigeria.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. Any disputes arising out of or related to these Terms shall
                be resolved through the appropriate team within our company.
              </Text>
              <Text style={{ fontWeight: "700" }}>Changes to Terms: </Text>
              <Text style={{ marginVertical: 10 }}>
                1. MyPlug reserves the right to update these Terms at any time.
              </Text>
              <Text style={{ marginVertical: 2 }}>
                2. Changes will be effective immediately upon posting.
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
            >
              Contact Us:
            </Text>
            <Text style={{ marginVertical: 10 }}>
              For questions or concerns, please contact:
            </Text>
            <Text style={{ marginVertical: 10 }}>MyPlug </Text>
            <Text style={{ marginVertical: 2 }}>
              81 Agwangede Extension, Kuje, Abuja.
            </Text>
            <Text style={{ marginVertical: 2 }}>connect@myplugmobile.com.</Text>
            <Text style={{ marginVertical: 2 }}>+2347017663503</Text>
            <Text style={{ marginVertical: 10 }}>
              By using the App, you acknowledge that you have read, understood,
              and agree to this Privacy Policy.
            </Text>
            <Text style={{ marginVertical: 10 }}>Last Updated:</Text>
            <Text style={{ marginVertical: 10 }}>31 December 2024</Text>
            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
            >
              4. STOLEN ITEMS
            </Text>

            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
            >
              5. PRICES
            </Text>

            <Text
              style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
            >
              6. LOCATION
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Terms;

const styles = StyleSheet.create({});
