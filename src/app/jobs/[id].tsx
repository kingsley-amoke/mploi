import {
  Pressable,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";
import { Button, Divider, Text } from "react-native-paper";
import React, { useMemo, useState } from "react";
import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  FontAwesome6,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";
import * as MailComposer from "expo-mail-composer";

import { useJobsStore, useUsersStore, useUserStore } from "@/src/state/store";
import { ExternalLink } from "@/src/components/ExternalLink";
import { CustomToast, deduct, getJobs, socialLinks } from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";
import { doc, DocumentData, updateDoc } from "firebase/firestore";
import { CustomModal } from "@/src/components/CustomModal";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import FancyHeader from "@/src/components/FancyHeader";
import moment from "moment";

const JobPage = () => {
  const { id } = useLocalSearchParams();

  const navigation = useNavigation();

  const { jobs } = useJobsStore();
  const { user } = useUserStore();

  const job = useMemo(
    () => jobs.find((job) => job._id === id)!,
    [jobs.length, id]
  );

  const date = moment(job._id, "x").fromNow();

  // const jobDate = new Date(date).getTime();

  // const today = new Date(Date.now()).getTime();

  // const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

  const salary = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "NGN",
  }).format(job.salary);

  //TODO: implement apply for job

  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);
  const [applying, setApplying] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");
  const [coverLetter, setCoverLetter] = useState("");

  const handleJobStatus = () => {
    const JobRef = doc(firestoreDB, "jobs", id.toString());
    setLoading(true);

    updateDoc(JobRef, { taken: !job.taken }).then(async () => {
      CustomToast("Successful");
      navigation.goBack();
      setLoading(false);
    });
  };

  const handleSelectCV = async (isResume: boolean) => {
    setLoading(true);
    DocumentPicker.getDocumentAsync().then(async (document) => {
      if (!document.canceled) {
        const file = document.assets[0].uri;

        if (isResume) {
          setResume(file);
        } else {
          setCoverLetter(file);
        }
      }
    });
  };

  const payment = () => {
    const data = { resume: resume, coverLetter: coverLetter };

    if (active === 1) {
      handleMail(data);
    } else {
      const charge = active === 2 ? 1000 : 2000;
      if (active > parseInt(user?.walletBalance)) {
        CustomToast("Please fund your wallet to continue.");
        setApplying(false);
      } else {
        const amount = parseFloat(user?.walletBalance) - charge;
        setApplying(true);
        deduct(user, amount).then(() => {
          handleMail(data);
        });
      }
    }
  };

  const handleMail = (attachments: DocumentData) => {
    MailComposer.isAvailableAsync().then((value) => {
      if (value) {
        const options: MailComposer.MailComposerOptions = {
          recipients: [socialLinks.email],
          body: "Enter your personal details here..",
          subject: `Application for the position of ${job.title} at ${job.company}`,
          attachments: [attachments.resume, attachments.coverLetter],
        };

        MailComposer.composeAsync(options).then((res) => {
          setApplying(false);
        });
      }
    });
  };

  const modalContent = (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
        }}
      >
        <View
          style={{
            width: 100,
            height: 70,
            overflow: "hidden",
            flexWrap: "nowrap",
          }}
        >
          <Pressable
            onPress={() => handleSelectCV(true)}
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,

              padding: 5,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text>Resume</Text>
            <MaterialCommunityIcons name="plus" size={20} />
          </Pressable>
          <Text>{resume.split("/").pop()}</Text>
        </View>
        <View
          style={{
            width: 100,
            height: 70,
            overflow: "hidden",
            flexWrap: "nowrap",
          }}
        >
          <Pressable
            onPress={() => handleSelectCV(false)}
            style={{
              justifyContent: "space-between",
              flexDirection: "row",
              alignItems: "center",
              borderWidth: 1,

              padding: 5,
              marginVertical: 10,
              borderRadius: 10,
            }}
          >
            <Text>Cover letter</Text>
            <MaterialCommunityIcons name="plus" size={20} />
          </Pressable>
          <Text style={{ overflow: "hidden", flexWrap: "nowrap" }}>
            {coverLetter.split("/").pop()}
          </Text>
        </View>
      </View>
      <Text style={{ fontWeight: "bold" }}>
        How would you like to apply for this job?
      </Text>
      <View style={{ width: 300, marginVertical: 20, gap: 10 }}>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor:
              active === 1 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(1)}
        >
          <Text
            style={{
              color: active === 1 ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            No Feedback
          </Text>
          <Text>Free</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor:
              active === 2 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(2)}
        >
          <Text
            style={{
              color: active === 2 ? "white" : "black",
              fontWeight: "bold",
            }}
          >
            Feedback/Update
          </Text>
          <Text>NGN 1000</Text>
        </Pressable>
        <Pressable
          style={{
            flexDirection: "row",
            padding: 10,
            justifyContent: "space-between",
            alignItems: "flex-end",
            borderWidth: 1,
            borderColor:
              active === 3 ? Colors.light.primary : Colors.dark.primary,
            borderRadius: 10,
            backgroundColor: "white",
          }}
          onPress={() => setActive(3)}
        >
          <Text
            style={{
              color: active === 3 ? "white" : "black",
              fontWeight: "bold",
              flexWrap: "wrap",
              width: "70%",
            }}
          >
            Update, follow up, recieve calls from our agents for information and
            interview date, time and venue
          </Text>
          <Text>NGN 2000</Text>
        </Pressable>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 20,
          marginBottom: 10,
        }}
      >
        <Button mode="outlined" onPress={() => setVisible(false)}>
          Cancel
        </Button>
        <Button mode="contained" onPress={() => payment()}>
          Proceed
        </Button>
      </View>
    </View>
  );

  return (
    <View>
      <FancyHeader title={job.title?.slice(0, 20)} backButton />

      <ScrollView>
        <View style={{ paddingHorizontal: 24, marginTop: 10 }}>
          <Text style={styles.jobTime}>Posted: {date}</Text>
          <ScrollView
            style={{ marginHorizontal: 20, marginVertical: 10 }}
            showsVerticalScrollIndicator={false}
          >
            <Divider bold horizontalInset style={{ marginBottom: 10 }} />
            <View>
              <Text>Experience Level: {job.experience}</Text>
              <Text>Location: {job.location}</Text>
              <Text>{job.workTime}</Text>
              <Text>Pay: {salary}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
              >
                Job Description
              </Text>
              <Text>{job.description}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
              >
                Requirements
              </Text>
              <Text>Minimum Qualification: {job.requirements}</Text>
              <Text>Note: {job.others}</Text>
            </View>
            <View style={{ marginVertical: 10 }}>
              {!user.isAdmin ? (
                <CustomModal
                  content={modalContent}
                  triggerText="Apply"
                  visible={visible}
                  setVisible={setVisible}
                />
              ) : (
                <Button
                  mode="contained"
                  contentStyle={{ marginVertical: 10 }}
                  labelStyle={{ fontSize: 18 }}
                  onPress={handleJobStatus}
                >
                  {loading
                    ? "Please wait..."
                    : job.taken
                    ? "Mark as open"
                    : "Mark as taken"}
                </Button>
              )}
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text
                style={{ fontSize: 16, fontWeight: "bold", marginVertical: 10 }}
              >
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
                  <Ionicons
                    name="logo-whatsapp"
                    size={30}
                    color={socialLinks.whatsapp.color}
                  />
                </ExternalLink>
                <ExternalLink href={socialLinks.facebook.link}>
                  <Ionicons
                    name="logo-facebook"
                    size={30}
                    color={socialLinks.facebook.color}
                  />
                </ExternalLink>
                <ExternalLink href={socialLinks.twitter.link}>
                  <FontAwesome6 name="x-twitter" size={30} />
                </ExternalLink>
                <ExternalLink href={socialLinks.instagram.link}>
                  <Ionicons
                    name="logo-instagram"
                    size={30}
                    color={socialLinks.instagram.color}
                  />
                </ExternalLink>
                <ExternalLink href={socialLinks.youtube.link}>
                  <Ionicons
                    name="logo-youtube"
                    size={30}
                    color={socialLinks.youtube.color}
                  />
                </ExternalLink>
              </View>
              <Text>Your data privacy is our priority.</Text>
              <Text>Read our Privacy Policy.</Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
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
    textAlign: "right",
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
