import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, useColorScheme, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import useTheme from '@/src/hooks/useTheme';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/src/utils/firebaseConfig';
import { ExternalLink } from '@/src/components/ExternalLink';

const shop = () => {
    // const {user} = useUserStore()

  const router = useRouter()
  const colorScheme = useColorScheme();

  const color = colorScheme === "dark" ? "white" : "black";


  const navigateToEditProfile = () => {
    router.push("/profile/edit");
  };

  const navigateToNotifications = () => {
    router.push('/notifications')
  };

  const navigateToPrivacy = () => {
    router.push('/privacy')
  };

  const navigateToWallet = () => {
    router.navigate('/wallet')
  };

  const navigateToDisclaimer = () => {
    router.push('/disclaimer')
  };

  const navigateToTermsAndPolicies = () => {
   router.push('/terms-policy')
  };

  const navigateToFreeSpace = () => {
    console.log("Free Space function");
  };

  const navigateToGithub = () => {
    console.log("Data saver");
    
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  const about = () => {
     router.push('/about')

  };

  const logout = () => {
   
      signOut(auth);
      AsyncStorage.removeItem("@user");
      router.replace("/login");

  };

  const accountItems = [
    {
      icon: "person-outline",
      text: "Edit Profile",
      action: navigateToEditProfile,
    },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
    },
    {icon: "wallet", text: "Wallet", action: navigateToWallet}
  ];

  const TermsItems = [
    {
      icon: "lock-outline",
      text: "Privacy Policy",
      action: navigateToPrivacy,
    },
    { icon: "edit-note", text: "Terms & Conditions", action: navigateToTermsAndPolicies },
    {
      icon: "do-not-disturb",
      text: "Disclaimer",
      action: navigateToDisclaimer,
    },
  ];

  const DeveloperInfoItems = [
    {
      icon: 'link',
      text: "Portfolio",
      action: 'https://kingsleyamoke.com.ng/'
    },

    {
      icon: 'facebook-square',
      text: "Facebook",
      action: 'https://facebook.com/kingsley.chibuike.54/'
      
    },
    { icon: "github", text: "GitHub", action: 'https://github.com/kingsley-amoke' },
    {icon: 'linkedin', text: "LinkedIn", action: 'https://linkedin.com/in/kingsley-amoke' },
  ];

  const actionsItems = [
    { icon: "info-outline", text: "About", action: about },
    { icon: "logout", text: "Log out", action: logout },
  ];

interface settingsItemsProps{
    icon:  any,
    text: string;
    action: () => void;
  };

  const renderSettingsItem = ({ icon, text, action, }: settingsItemsProps) => (
    <TouchableOpacity
      onPress={action}
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 8,
        paddingLeft: 12,
        borderRadius: 12,
      }}
    >
     
      <MaterialIcons name={icon} size={20} color={color}/>
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 600,
          fontSize: 14,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}
    >

      <ScrollView style={{ marginHorizontal: 12, }} showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
        <Text style={{  marginVertical: 10, textTransform:'uppercase', marginLeft:12, fontSize:12 }}>Account</Text>
          <View
            
          >
            {accountItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
        <Text style={{  marginVertical: 10, textTransform:'uppercase', marginLeft:12, fontSize:12 }}>
            Terms & Policies{" "}
          </Text>
          <View
            
          >
            {TermsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
        {/* Developer Information */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{  marginVertical: 10, textTransform:'uppercase', marginLeft:12, fontSize:12 }}>
            Developer Info{" "}
          </Text>
          <View
            
          >
            {DeveloperInfoItems.map((item, index) => (
              <ExternalLink href={item.action} key={index}>
              <TouchableOpacity
             
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingVertical: 8,
                paddingLeft: 12,
                borderRadius: 12,
              }}
              
            >
        
              <FontAwesome name={item.icon} size={20} color={color}/>
              <Text
                style={{
                  marginLeft: 36,
                  fontWeight: 600,
                  fontSize: 14,

                }}
              >
                {item.text}{" "}
              </Text>
            </TouchableOpacity>
                  </ExternalLink>
            ))}
          </View>
        </View>

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
        <Text style={{  marginVertical: 10, textTransform:'uppercase', marginLeft:12, fontSize:12 }}>Actions</Text>
          <View
           
          >
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default shop

const styles = StyleSheet.create({})