import {
  Pressable,
    ScrollView,
    StyleSheet,
    useColorScheme,
    View,
  } from "react-native";
  import {  Button, Divider, Modal, Portal, Text,} from 'react-native-paper'
  import React, { useEffect, useState } from "react";
  import { Link, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { FontAwesome6, Ionicons } from "@expo/vector-icons";

  import * as MailComposer from 'expo-mail-composer';


  import {
    useJobsStore,
    useUserStore,
  } from "@/src/state/store";
import { ExternalLink } from "@/src/components/ExternalLink";
import { socialLinks } from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";

 
  
  const JobPage = () => {

    const {id} = useLocalSearchParams();

    const navigation = useNavigation();

    const colorScheme = useColorScheme();

    const textColor = colorScheme === "dark" ? "white" : "black";
  
    const { jobs } = useJobsStore();
    const { user } = useUserStore();

    const job = jobs.find(job => job._id === id)!;
 

    const date = parseInt(job._id);

    const jobDate = new Date(date).getTime();
  
    const today = new Date(Date.now()).getTime();
  
    const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

    const salary = new Intl.NumberFormat('en-UK', {style:'currency', currency: 'NGN'}).format(job.salary)




    //TODO: implement apply for job

    const HandleApply = () => {

      const [visible, setVisible] = useState(false);
      const [active, setActive] = useState(1)
 
      const showModal = () => setVisible(true);
      const hideModal = () => setVisible(false);
      return(
        <>
        <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={{
            backgroundColor: "gray",
            padding: 20,
            height: "70%",
          }}
          >
         <View style={{justifyContent:'center', alignItems:'center'}}>
          <Text style={{color:'white', fontWeight:'bold'}}>How would you like to apply for this job?</Text>
          <View style={{width:300, marginVertical:20, gap:10}}>
            <Pressable style={{flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'center', borderWidth:1, borderColor:Colors.dark.primary, borderRadius:10, backgroundColor: active === 1 ? Colors.light.primary : 'gray'}} onPress={()=>setActive(1)}>
              <Text style={{color:'white', fontWeight:'bold'}}>No Feedback</Text>
              <Text style={{color:'white'}}>Free</Text>
            </Pressable>
            <Pressable style={{flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'center', borderWidth:1, borderColor:Colors.dark.primary, borderRadius:10,  backgroundColor: active === 2 ? Colors.light.primary : 'gray'}} onPress={()=>setActive(2)}>
              <Text style={{color:'white', fontWeight:'bold'}}>Feedback/Update</Text>
              <Text style={{color:'white'}}>#1000</Text>
            </Pressable>
            <Pressable style={{flexDirection:'row', padding:10, justifyContent:'space-between', alignItems:'flex-end', borderWidth:1, borderColor:Colors.dark.primary, borderRadius:10, backgroundColor: active === 3 ? Colors.light.primary : 'gray'}} onPress={()=>setActive(3)}>
              <Text style={{color:'white', fontWeight:'bold', flexWrap:'wrap', width:'70%'}}>Update, follow up, recieve calls from our agents for information and interview date, time and venue</Text>
              <Text style={{color:'white'}}>#2000</Text>
            </Pressable>
          </View>
          <Button mode="contained" onPress={() => console.log('proceed to payment')}>Proceed</Button>
         </View>
        </Modal>
        </Portal>
         <Button mode="contained"  onPress={showModal}>Apply</Button>
          </>
      )
      // MailComposer.isAvailableAsync().then((value) => {
      //   if(value){


      //     const options:MailComposer.MailComposerOptions = {
      //       recipients: ['klordbravo@gmail.com'],
      //       body: 'Text mail',
      //       subject: 'Test mail',
      //       attachments: []
      //     }

      //     MailComposer.composeAsync(options).then((res) => {
      //       console.log(res);
      //     })
      //   }
      // })

    }


    useEffect(() => {
      navigation.setOptions({
        title: job.title + ' ' + 'at' +  ' ' + job.company,
        headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.light.primary },
          headerTintColor: "white",
      })
    }, [id])
  
    return (
      <SafeAreaView>
        <ScrollView style={{ paddingHorizontal: 24 }}>
            <Text style={styles.jobTime}>Posted: {daysAgo < 1 ? 'Today' : daysAgo +  ' days ago'}</Text>
            <ScrollView style={{ marginHorizontal: 20, marginVertical: 10 }} showsVerticalScrollIndicator={false}>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>
          MPLOi Global Resources
        </Text>
      </View>
        <Divider bold horizontalInset style={{ marginBottom:10 }} />
      <View>
        <Text>Experience Level: {job.experience}</Text>
        <Text>Location: {job.location}</Text>
        <Text>{job.workTime}</Text>
        <Text>Pay: {salary}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          Job Description
        </Text>
        <Text>{job.description}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          Requirements
        </Text>
        <Text>Minimum Qualification: {job.requirements}</Text>
        <Text>Note: {job.others}</Text>
      </View>
      <View style={{ marginVertical: 10 }}>
       <HandleApply />
      </View>
      <View style={{ marginVertical: 10 }}>
        <Text style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}>
          Stay Updated
        </Text>
        <Text>
          Messages related to your carer applications will appear on the
          notifications page. Check your notifications regularly to stay
          updated.
        </Text>
        <Text style={{ marginVertical: 10 }}>Like and follow us on:</Text>
        <View style={{ flexDirection: "row", marginBottom: 10, gap: 20 }}>
          <ExternalLink href={socialLinks.whatsapp.link}>
            <Ionicons name="logo-whatsapp" size={30} color={socialLinks.whatsapp.color} />
          </ExternalLink>
          <ExternalLink href={socialLinks.facebook.link}>
            <Ionicons name="logo-facebook" size={30} color={socialLinks.facebook.color} />
          </ExternalLink>
          <ExternalLink href={socialLinks.twitter.link}>
            <FontAwesome6 name="x-twitter" size={30} color={textColor} />
          </ExternalLink>
          <ExternalLink href={socialLinks.instagram.link}>
            <Ionicons name="logo-instagram" size={30} color={socialLinks.instagram.color}/>
          </ExternalLink>
          <ExternalLink href={socialLinks.youtube.link}>
            <Ionicons name="logo-youtube" size={30} color={socialLinks.youtube.color}/>
          </ExternalLink>
        </View>
        <Text>Your data privacy is our priority.</Text>
        <Text>Read our Privacy Policy.</Text>
      </View>
    </ScrollView>
          
          
       
        </ScrollView>
      </SafeAreaView>
    ) 
  };
  
  export default JobPage;
  
  const styles = StyleSheet.create({
    jobTitle: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 10,
    },
    jobDesc: {
      marginBottom: 10,
      fontSize: 16,
    },
    jobSalary: {
      fontStyle: "italic",
      marginVertical: 14,
    },
    jobTime: {
      fontSize: 14,
      color: "grey",
      textAlign: 'right'
    },
    jobLocation: {
      flexDirection: "row",
      alignItems: "flex-end",
      gap: 5,
    },
    jobKeywords: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 5,
    },
    employer: {
      flex: 1,
      flexDirection: "row",
      gap: 30,
      alignItems: "center",
      marginVertical: 10,
    },
    userImage: {
      height: 30,
      width: 30,
      borderRadius: 50,
    },
    separator: {
      height: 2,
      width: "auto",
      backgroundColor: "grey",
      marginVertical: 20,
    },
  });
  