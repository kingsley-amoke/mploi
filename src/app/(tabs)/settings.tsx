import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Text } from 'react-native-paper';
import useTheme from '@/src/hooks/useTheme';
import { signOut } from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '@/src/utils/firebaseConfig';

const shop = () => {
    // const {user} = useUserStore()

  const router = useRouter()
  const {colorScheme} = useTheme()

  const color = colorScheme === 'dark' ? 'white' : 'black';


  const navigateToEditProfile = () => {
    router.push("/profile/edit");
  };

  const navigateToSecurity = () => {
    console.log("Security function");
  };

  const navigateToNotifications = () => {
    router.push('/notifications')
  };

  const navigateToPrivacy = () => {
    router.push('/privacy')
  };

  const navigateToSubscription = () => {
    router.navigate('/subscription')
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

  const navigateToDataSaver = () => {
    console.log("Data saver");
    
  };

  const navigateToReportProblem = () => {
    console.log("Report a problem");
  };

  const navigateToTheme = () => {
    router.push('/settings')
  }

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
    { icon: "security", text: "Security", action: navigateToSecurity },
    {
      icon: "notifications-none",
      text: "Notifications",
      action: navigateToNotifications,
    },
    { icon: "credit-card", text: "Subscriptions", action: navigateToSubscription },
    {icon: "wallet", text: "Wallet", action: navigateToSubscription}
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

  // const cacheAndCellularItems = [
  //   {
  //     icon: "delete-outline",
  //     text: "Free up space",
  //     action: navigateToFreeSpace,
  //   },
  //   { icon: "save-alt", text: "Data Saver", action: navigateToDataSaver },
  // ];

  const actionsItems = [
    {
      icon: "toggle-off",
      text: "Change Theme",
      action: navigateToTheme ,
    },
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
      <MaterialIcons name={icon} size={24} color={color}/>
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 600,
          fontSize: 16,
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

      <ScrollView style={{ marginHorizontal: 12 }}>
        {/* Account Settings */}
        <View style={{ marginBottom: 12 }}>
          <Text style={{ marginVertical: 10 }}>Account</Text>
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
          <Text style={{  marginVertical: 10 }}>
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

        {/* Cache & Cellular */}
        {/* <View style={{ marginBottom: 12 }}>
          <Text style={{  marginVertical: 10 }}>
            Cache & Cellular{" "}
          </Text>
          <View
            
          >
            {cacheAndCellularItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View> */}

        {/* Actions Settings */}

        <View style={{ marginBottom: 12 }}>
          <Text style={{  marginVertical: 10 }}>Actions</Text>
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