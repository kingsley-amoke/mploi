import {
    ScrollView,
    StyleSheet,
    View,
  } from "react-native";
  import {  Button, Text,} from 'react-native-paper'
  import React, { useEffect, useState } from "react";
  import { Link, useLocalSearchParams, useNavigation, useRouter } from "expo-router";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Ionicons } from "@expo/vector-icons";

  import {
    useJobsStore,
    useUserStore,
  } from "@/src/state/store";
import { ExternalLink } from "@/src/components/ExternalLink";
import { socialLinks } from "@/src/utils/data";
 
  
  const JobPage = () => {

    const {id} = useLocalSearchParams();

    const navigation = useNavigation();
  
    const { jobs } = useJobsStore();
    const { user } = useUserStore();

    const job = jobs.filter(job => job._id === id)[0];
 

    const date = parseInt(job._id);

    const jobDate = new Date(date).getTime();
  
    const today = new Date(Date.now()).getTime();
  
    const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));


    useEffect(() => {
      navigation.setOptions({
        title: job.title + ' ' + 'at' +  ' ' + job.company,
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
      <View>
        <Text>Experience Level: {job.experience}</Text>
        <Text>Location: {job.location}</Text>
        <Text>{job.workTime}</Text>
        <Text>Pay: {job.salary}</Text>
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
        <Button mode="contained"  onPress={() => console.log('job applied')}>Apply</Button>
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
        <View style={{ flexDirection: "row", marginBottom: 10, gap: 10 }}>
          <ExternalLink href={socialLinks.whatsapp.link}>
            <Ionicons name="logo-whatsapp" size={30} color={socialLinks.whatsapp.color} />
          </ExternalLink>
          <ExternalLink href={socialLinks.facebook.link}>
            <Ionicons name="logo-facebook" size={30} color={socialLinks.facebook.color} />
          </ExternalLink>
          <ExternalLink href={socialLinks.twitter.link}>
            <Ionicons name="logo-twitter" size={30} color={socialLinks.twitter.color} />
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
  