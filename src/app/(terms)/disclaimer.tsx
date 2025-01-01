import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import FancyHeader from "@/src/components/FancyHeader";
import { socialLinks } from "@/src/utils/data";

const Disclaimer = () => {
  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Disclaimer" backButton />
      <ScrollView
        style={{ paddingVertical: 10, marginHorizontal: 30 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={{ marginVertical: 10 }}>
          MyPlug is a platform that connects customers with independent service
          providers. By using our app, you acknowledge that you have read,
          understood and agree to be bound by this disclaimer.
        </Text>
        <Text>Limitation of Liability</Text>
        <Text style={{ marginVertical: 10 }}>
          MyPlug is not responsible for any damages, losses, or injuries that
          may arise from the use of our platform or the services provided by our
          service providers. We do not guarantee the quality, safety, or
          suitability of the services provided by our service providers.
        </Text>
        <Text>No Warranty</Text>
        <Text style={{ marginVertical: 10 }}>
          Our platform and the services provided by our service providers are
          provided on an "as is" and "as available" basis. We disclaim all
          warranties, express or implied, including but not limited to the
          implied warranties of merchantability, fitness for a particular
          purpose, and non-infringement.
        </Text>
        <Text>Assumption of Risk</Text>
        <Text>
          By using our platform, you assume all risks associated with the use of
          our platform and the services provided by our service providers. You
          acknowledge that you are responsible for your own actions and
          decisions, and that MyPlug is not responsible for any consequences
          that may arise from your use of our platform.
        </Text>
        <Text style={{ marginVertical: 10 }}>Release of Liability</Text>
        <Text>
          You release MyPlug, its officers, directors, employees, agents, and
          affiliates from any and all claims, demands, or causes of action that
          you may have arising from your use of our platform or the services
          provided by our service providers.
        </Text>
        <Text style={{ marginVertical: 10 }}>Indemnification</Text>
        <Text>
          You agree to indemnify and hold harmless MyPlug, its officers,
          directors, employees, agents, and affiliates from any and all claims,
          demands, or causes of action that may arise from your use of our
          platform or the services provided by our service providers.
        </Text>
        <Text style={{ marginVertical: 10 }}>Governing Law</Text>
        <Text>
          This disclaimer shall be governed by and construed in accordance with
          the laws of Federal Republic of Nigeria and that of other States,
          Countries and Regions where MyPlug is being used. Any disputes arising
          from this disclaimer shall be resolved through binding arbitration in
          accordance with the rules of the International Chamber of Commerce
          (ICC) Court of Arbitration and International Centre for Dispute
          Resolution (ICDR).
        </Text>
        <Text style={{ marginVertical: 10 }}>Changes to Disclaimer</Text>
        <Text>
          We reserve the right to modify or update this disclaimer at any time
          without notice. Your continued use of our platform after any changes
          to this disclaimer shall constitute your acceptance of the revised
          disclaimer.
        </Text>
        <Text style={{ marginVertical: 10 }}>Contact Us</Text>
        <Text>
          If you have any questions or concerns about this disclaimer, please
          contact us at {socialLinks.email} or call {socialLinks.phone}.
        </Text>

        <Text style={{ marginVertical: 10 }}>
          By using our platform, you acknowledge that you have read, understood,
          and agree to be bound by this disclaimer. If you do not agree to this
          disclaimer, please do not use our platform.
        </Text>
        <Text style={{ marginBottom: 10 }}>
          Last Updated: 30th December, 2024
        </Text>
      </ScrollView>
    </View>
  );
};

export default Disclaimer;

const styles = StyleSheet.create({});
