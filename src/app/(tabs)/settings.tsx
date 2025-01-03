import { ScrollView, TouchableOpacity, View } from "react-native";
import React, { useMemo } from "react";
import { useRouter } from "expo-router";
import {
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Text } from "react-native-paper";
import { auth, firestoreDB } from "@/src/utils/firebaseConfig";
import { ExternalLink } from "@/src/components/ExternalLink";
import { useUsersStore } from "@/src/state/store";
import { CustomToast, socialLinks } from "@/src/utils/data";
import FancyHeader from "@/src/components/FancyHeader";
import { doc, updateDoc } from "firebase/firestore";

const settings = () => {
  const router = useRouter();
  const { users } = useUsersStore();

  const user = useMemo(
    () => users.find((usr) => usr._id === auth.currentUser?.uid)!,
    [users.length]
  );

  const navigateToEditProfile = () => {
    router.push("/profile/edit");
  };

  const navigateToNotifications = () => {
    CustomToast("Coming soon...");
    // router.push("/notifications");
  };

  const navigateToPrivacy = () => {
    router.push("/privacy");
  };

  const navigateToDisclaimer = () => {
    router.push("/disclaimer");
  };

  const navigateToTermsAndPolicies = () => {
    router.push("/terms-policy");
  };

  const about = () => {
    router.push("/about");
  };

  const logout = () => {
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    auth.signOut().then(() => {
      updateDoc(userRef, { isOnline: false });
      router.replace("/");
    });
  };

  const login = () => {
    router.replace("/login");
  };

  const admin = () => {
    router.push("/admin");
  };

  const requestHelp = () => {
    return router.replace(`${socialLinks.chat}`);
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
  ];
  const TermsItems = [
    {
      icon: "lock-outline",
      text: "Privacy Policy",
      action: navigateToPrivacy,
    },
    {
      icon: "edit-note",
      text: "Terms & Conditions",
      action: navigateToTermsAndPolicies,
    },
    {
      icon: "do-not-disturb",
      text: "Disclaimer",
      action: navigateToDisclaimer,
    },
  ];

  const DeveloperInfoItems = [
    {
      icon: "link",
      text: "Portfolio",
      action: "https://kingsleyamoke.com.ng/",
    },

    {
      icon: "facebook-square",
      text: "Facebook",
      action: "https://facebook.com/kingsley.chibuike.54/",
    },
    {
      icon: "github",
      text: "GitHub",
      action: "https://github.com/kingsley-amoke",
    },
    {
      icon: "linkedin",
      text: "LinkedIn",
      action: "https://linkedin.com/in/kingsley-amoke",
    },
  ];
  const followUs = [
    {
      icon: "whatsapp",
      text: "Whatsapp Channel",
      action: socialLinks.whatsapp.link,
    },

    {
      icon: "facebook-square",
      text: "Facebook",
      action: socialLinks.facebook.link,
    },
    {
      icon: "instagram",
      text: "Instagram",
      action: socialLinks.instagram.link,
    },
    {
      icon: "twitter",
      text: "Twitter",
      action: socialLinks.twitter.link,
    },
    {
      icon: "youtube",
      text: "Youtube",
      action: socialLinks.youtube.link,
    },
  ];

  const actionsItems = [
    { icon: "info-outline", text: "About", action: about },
    user?.isAdmin
      ? { icon: "info", text: "Admin", action: admin }
      : { icon: "support-agent", text: "Request help", action: requestHelp },
    auth.currentUser
      ? { icon: "logout", text: "Log out", action: logout }
      : { icon: "login", text: "Login", action: login },
  ];

  interface settingsItemsProps {
    icon: any;
    text: string;
    action: () => void;
  }

  const renderSettingsItem = ({ icon, text, action }: settingsItemsProps) => (
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
      <MaterialIcons name={icon} size={20} />
      <Text
        style={{
          marginLeft: 36,
          fontWeight: 600,
          fontSize: 18,
        }}
      >
        {text}{" "}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <FancyHeader title="Settings" />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Account Settings */}
        {auth.currentUser && (
          <View style={{ marginBottom: 12 }}>
            <Text
              style={{
                marginVertical: 10,
                textTransform: "uppercase",
                marginLeft: 12,
                fontSize: 12,
              }}
            >
              Account
            </Text>
            <View>
              {accountItems.map((item, index) => (
                <React.Fragment key={index}>
                  {renderSettingsItem(item)}
                </React.Fragment>
              ))}
            </View>
          </View>
        )}

        {/* Support and About settings */}

        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              textTransform: "uppercase",
              marginLeft: 12,
              fontSize: 12,
            }}
          >
            Terms & Policies{" "}
          </Text>
          <View>
            {TermsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>

        {/* follow us */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              textTransform: "uppercase",
              marginLeft: 12,
              fontSize: 12,
            }}
          >
            Follow Us{" "}
          </Text>
          <View>
            {followUs.map((item, index) => (
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
                  <FontAwesome name={item.icon} size={20} />
                  <Text
                    style={{
                      marginLeft: 36,
                      fontWeight: 600,
                      fontSize: 18,
                    }}
                  >
                    {item.text}{" "}
                  </Text>
                </TouchableOpacity>
              </ExternalLink>
            ))}
          </View>
        </View>

        {/* Developer Information */}
        <View style={{ marginBottom: 12 }}>
          <Text
            style={{
              marginVertical: 10,
              textTransform: "uppercase",
              marginLeft: 12,
              fontSize: 12,
            }}
          >
            Developer Info{" "}
          </Text>
          <View>
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
                  <FontAwesome name={item.icon} size={20} />
                  <Text
                    style={{
                      marginLeft: 36,
                      fontWeight: 600,
                      fontSize: 18,
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
          <Text
            style={{
              marginVertical: 10,
              textTransform: "uppercase",
              marginLeft: 12,
              fontSize: 12,
            }}
          >
            Actions
          </Text>
          <View>
            {actionsItems.map((item, index) => (
              <React.Fragment key={index}>
                {renderSettingsItem(item)}
              </React.Fragment>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={{ position: "absolute", bottom: 40, right: 30 }}>
        <MaterialCommunityIcons
          name="whatsapp"
          size={50}
          color="green"
          onPress={() => router.replace(socialLinks.chat)}
        />
      </View>
    </View>
  );
};

export default settings;
