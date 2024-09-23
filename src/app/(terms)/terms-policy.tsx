import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "react-native-paper";
import { socialLinks } from "@/src/utils/data";

const Terms = () => {
  return (
    <ScrollView
      style={{ paddingVertical: 10, marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ marginVertical: 10 }}>
        The terms and conditions are the operational guidelines on the usage of
        MyPlug APP written out by the MyPlug's legal team. The
        content and provisions of these terms and conditions are subject to
        periodic amendments or changes according to the realities of time.{" "}
      </Text>
      <View>
        <Text style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}>
          1. TERMS AND CONDITIONS FOR SERVICE PROVIDERS
        </Text>
        <View>
          <Text style={{ marginVertical: 5 }}>
            i. A Service Provider in our context is any man or any woman within
            a given productive age who possesses skills and has the ability and
            capacity to apply such skill in production of goods and in rendering
            of services to his or her client.
          </Text>

          <Text style={{ marginVertical: 5 }}>
            ii. <Text style={{ fontWeight: "700" }}>SUBSCRIPTION: </Text> A
            Service Provider must be a subscriber in order to access jobs and
            receive any job order from a client. MyPlug APP provides for monthly
            and yearly subscription payments. The amount are not fix as it can
            change with time.
          </Text>
          <Text style={{ marginVertical: 5 }}>
            iii. <Text style={{ fontWeight: "700" }}>A SERVICE PROVIDER</Text>{" "}
            can also function as a client when he or she orders for the services
            of other Service Providers. MyPlug APP gives you the liberty to
            apply your skills effectively and be productive.
          </Text>
          <Text style={{ marginVertical: 5 }}>
            iv.{" "}
            <Text style={{ fontWeight: "700" }}>
              STEALING/DISCREDITABLE CONDUCT/ASSAULT/FIGHTING:
            </Text>{" "}
            Any Service Provider found committing any of the above mentioned
            offences or reported in connection to any of the above mentioned
            offences shall be blocked from using our app. If arrested shall be
            handed over to the law enforcement agencies.
          </Text>
          <Text style={{ marginVertical: 5 }}>
            v.{" "}
            <Text style={{ fontWeight: "700" }}>THIRD PARTY ENGAGEMENT: </Text>{" "}
            It is illegal to work as a Service Provider using another person's
            identity. MyPlug APP does not encourage such illegality. If
            reported, such user account shall be blocked by MyPlug.
          </Text>
          <Text style={{ marginVertical: 5 }}>
            vi. <Text style={{ fontWeight: "700" }}>JOB AGENTS: </Text>MyPlug
            APP does not encourage touting and activities of job agents on our
            app. Service Providers must not involve in arranging any job that
            they cannot do. If reported such user account shall be blocked by
            MyPlug.
          </Text>
        </View>
        <View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            2. TERMS AND CONDITIONS FOR CLIENTS
          </Text>
          <View>
            <Text style={{ marginVertical: 5 }}>
              i. <Text style={{ fontWeight: "700" }}>A CLIENT</Text> is any man
              or any woman who has a job for a Service Provider to do and is
              willing and ready to pay for such services.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              ii. <Text style={{ fontWeight: "700" }}>SUBSCRIPTION:</Text> Our
              Clients are exempted from subscribing. They are free to order for
              any service they need as provided by MyPlug APP. Clients are to
              pay for services after the Service Provider had done the job
            </Text>
            <Text style={{ marginVertical: 5 }}>
              iii. <Text style={{ fontWeight: "700" }}>A CLIENT </Text> can also
              function as a Service Provider if he or she possesses any skill
              and is willing and ready to put his or her skills to use. On this
              note, the Client will have to subscribe in order to receive job
              orders.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              vi.{" "}
              <Text style={{ fontWeight: "700" }}>
                STEALING/DISCREDITABLE CONDUCT/ASSAULT/FIGHTING:{" "}
              </Text>{" "}
              Any Client found committing any of the above mentioned offences or
              reported in connection to any of the above mentioned offences
              shall be blocked by MyPlug. If arrested, shall be handed over to
              law enforcement agencies.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              v.{" "}
              <Text style={{ fontWeight: "700" }}>
                THIRD PARTY ENGAGEMENT:{" "}
              </Text>{" "}
              It is illegal to order for a service using another Client's
              account and identity. MyPlug APP does not encourage such
              illegality, if reported, such user account shall be blocked by
              MyPlug.
            </Text>
            <Text style={{ marginVertical: 5, paddingBottom: 10 }}>
              vi. <Text style={{ fontWeight: "700" }}>JOB AGENTS: </Text> MyPlug
              APP does not encourage touting and activities of job agents on our
              app. Any Client involved in arranging jobs outside the provisions
              of MyPlug APP shall be blocked by MyPlug.
            </Text>
          </View>
        </View>
        <View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            3. SHOP
          </Text>
          <View>
            <Text style={{ marginVertical: 10 }}>
              One prominent feature of Myplug Mobile APP that cannot be
              overlooked is the online shopping platform which allows
              interaction between buyers and sellers in a well organized open
              market system.
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Users of Myplug Mobile APP are granted equal opportunity to post
              or display products or any item for sale in our shop.
            </Text>
            <Text style={{ marginVertical: 10 }}>
              In order to post any item in our shop, you must have at least 3
              photos of the item you want to sell, you must enter your name or
              business name, your location, amount for the item, your phone
              number and description of the product you want to sell. This
              information is required to help potential buyers in decision
              making.
            </Text>
            <Text style={{ marginVertical: 10 }}>
              Items under this platform must be legally approved to be sold to
              or consumed by humans considering the laws governing our existence
              and laws of our societies or countries depending on the location
              such transaction is being carried out. For example, it is illegal
              to sell or buy cannabis or any illicit drugs or substance in
              Nigeria. If any user decides to post such an illegal item in our
              shop, his or her account will be blocked immediately. He or she
              can further be identified, arrested and handed over to law
              enforcement authorities.
            </Text>
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            4. STOLEN ITEMS
          </Text>
          <View>
            <Text style={{ marginVertical: 10 }}>
              This platform was not created for trading of stolen properties or
              properties acquired by fraud. Myplug shall not, in any
              circumstances be held responsible for such trade. Users are
              therefore warned to scrutinize the authenticity of any item or
              items, either brand new, foreign used or locally used before
              buying same from any seller within our platform. Any user reported
              for selling stolen properties or properties acquired by fraud
              shall be investigated, arrested and handed over to law enforcement
              authorities for prosecution. He or she shall be permanently
              blocked from accessing Myplug Mobile APP. Users must ensure that
              they are issued with an authentic receipt or a legal document for
              any item they acquire through our shopping platform. Myplug Mobile
              APP shall not be held responsible for any transaction without
              receipts or any legal documents required for such trade to be
              carried out. Myplug shall not demand for any commission or
              percentage share for money or proceeds from such transaction or
              trade. We are not involved in such transaction, as such cannot be
              invited as a witness except on special demand to provide aid to
              appropriate authorities during investigation. Such demands must be
              made official and addressed to the Founder, MPLOi Global Resources
              through Myplug Mobile and forwarded through our email address at{" "}
              {socialLinks.email}.
            </Text>
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            5. PRICES
          </Text>
          <View>
            <Text style={{ marginVertical: 10 }}>
              Myplug Mobile APP will not influence the prices of items posted on
              our platform. We provide a level playing ground for competition
              and allow users to set the prices of their items/goods. Myplug
              Mobile APP shall not be held responsible for any high rates or low
              rates of goods/items posted on our shopping platform
            </Text>
          </View>
          <Text
            style={{ fontSize: 14, fontWeight: "bold", marginVertical: 10 }}
          >
            6. LOCATION
          </Text>
          <View>
            <Text style={{ marginVertical: 10 }}>
              Users of Myplug Mobile APP must be cautious about certain
              locations and remote areas before going out for delivery. Security
              is everybody's business. In order to keep our users safe, we urge
              users of Myplug Mobile APP to operate only in urban cities and
              avoid any lonely and dangerous locations. Myplug shall not be held
              responsible for any loss of life or properties of any user who
              fails to apply this caution or in any circumstance.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Terms;

const styles = StyleSheet.create({});
