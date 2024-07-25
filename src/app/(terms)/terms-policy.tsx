import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {Text } from 'react-native-paper'

const Terms = () => {


  return (
    <ScrollView
      style={{ marginVertical: 20, marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text style={{ marginVertical: 10 }}>
        The terms and conditions are the operational guidelines on the usage
        of MPLOi APP written out by the MPLOi Africa Initiative's legal team.
        The content and provisions of these terms and conditions are subject to
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
              ii. <Text style={{fontWeight:"700"}}>SUBSCRIPTION: </Text> A Service Provider must be a subscriber in order
              to access jobs and receive any job order from a client. MPLOi APP
              provides for monthly and yearly subscription payments. The amount
              are not fix as it can change with time.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              iii. <Text style={{fontWeight:"700"}}>A SERVICE PROVIDER</Text> can also function as a client when he or
              she orders for the services of other Service Providers. MPLOi APP
              gives you the liberty to apply your skills effectively and be
              productive.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              iv. <Text style={{fontWeight:"700"}}>STEALING/DISCREDITABLE CONDUCT/ASSAULT/FIGHTING:</Text> Any Service
              Provider found committing any of the above mentioned offences or
              reported in connection to any of the above mentioned offences
              shall be blocked from using our app. If arrested shall be handed
              over to the law enforcement agencies.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              v. <Text style={{fontWeight:"700"}}>THIRD PARTY ENGAGEMENT: </Text> It is illegal to work as a Service
              Provider using another person's identity. MPLOi APP does not
              encourage such illegality. If reported, such user account shall be
              blocked by MPLOi.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              vi. <Text style={{fontWeight:"700"}}>JOB AGENTS: </Text>MPLOi APP does not encourage touting and
              activities of job agents on our app. Service Providers must not
              involve in arranging any job that they cannot do. If reported such
              user account shall be blocked by MPLOi.
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
              i. <Text style={{fontWeight:"700"}}>A CLIENT</Text> is any man or any woman who has a job for a Service
              Provider to do and is willing and ready to pay for such services.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              ii. <Text style={{fontWeight:"700"}}>SUBSCRIPTION:</Text> Our Clients are exempted from subscribing. They
              are free to order for any service they need as provided by MPLOi
              APP. Clients are to pay for services after the Service Provider
              had done the job
            </Text>
            <Text style={{ marginVertical: 5 }}>
              iii. <Text style={{fontWeight:"700"}}>A CLIENT </Text>  can also function as a Service Provider if he or she
              possesses any skill and is willing and ready to put his or her
              skills to use. On this note, the Client will have to subscribe in
              order to receive job orders.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              vi. <Text style={{fontWeight:"700"}}>STEALING/DISCREDITABLE CONDUCT/ASSAULT/FIGHTING: </Text> Any Client
              found committing any of the above mentioned offences or reported
              in connection to any of the above mentioned offences shall be
              blocked by MPLOi. If arrested, shall be handed over to law
              enforcement agencies.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              v. <Text style={{fontWeight:"700"}}>THIRD PARTY ENGAGEMENT: </Text> It is illegal to order for a service
              using another Client's account and identity. MPLOi APP does not
              encourage such illegality, if reported, such user account shall be
              blocked by MPLOi.
            </Text>
            <Text style={{ marginVertical: 5 }}>
              vi.  <Text style={{fontWeight:"700"}}>JOB AGENTS: </Text> MPLOi APP does not encourage touting and
              activities of job agents on our app. Any Client involved in
              arranging jobs outside the provisions of MPLOi APP shall be
              blocked by MPLOi.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Terms;

const styles = StyleSheet.create({});
