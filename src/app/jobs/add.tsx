import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useState } from "react";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { useRouter } from "expo-router";
import { Colors } from "@/src/constants/Colors";
import { useJobsStore } from "@/src/state/store";
import { CustomToast } from "@/src/utils/data";
import { LinearGradient } from "expo-linear-gradient";

const add = () => {
  const router = useRouter();
  const { addJob } = useJobsStore();

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const jobExperience = [
    {
      id: 1,
      name: "Junior",
    },
    {
      id: 2,
      name: "Intermediate",
    },
    {
      id: 3,
      name: "Senior",
    },
  ];

  const workTime = [
    {
      id: 1,
      name: "Intern",
    },
    {
      id: 2,
      name: "Part Time",
    },
    {
      id: 3,
      name: "Full Time",
    },
    {
      id: 4,
      name: "Contract",
    },
    {
      id: 5,
      name: "Consultant",
    },
  ];

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [company, setCompany] = useState("");
  const [experience, setExperience] = useState("Experience Level");
  const [workType, setWorkType] = useState("Job Type");
  const [salary, setSalary] = useState("");
  const [requirements, setRequirements] = useState("");
  const [others, setOthers] = useState("");

  const [posting, setPosting] = useState(false);

  const handlePostJob = async () => {
    const id = Date.now().toString();

    const _doc = {
      _id: id,
      title,
      experience,
      location,
      workType,
      description,
      requirements,
      others,
      salary,
      company,
      taken: false,
    };

    setPosting(true);
    const jobRef = doc(firestoreDB, "jobs", _doc._id);

    setDoc(jobRef, _doc).then(() => {
      addJob(doc);
      router.back();
      CustomToast("Job added Successfully");
      setPosting(false);
    });
  };

  return (
    <ScrollView style={{ flex: 1, marginVertical: 10 }}>
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
          Add Job
        </Text>
      </LinearGradient>
      <View style={{ margin: 10, gap: 30, paddingTop: 20 }}>
        <TextInput
          label="Position"
          mode="outlined"
          onChangeText={(value) => setTitle(value)}
        />
        <TextInput
          label="Description"
          mode="outlined"
          onChangeText={(value) => setDescription(value)}
        />
        <TextInput
          label="Location"
          mode="outlined"
          onChangeText={(value) => setLocation(value)}
        />
        <TextInput
          label="Company"
          mode="outlined"
          onChangeText={(value) => setCompany(value)}
        />
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: borderColor,
          }}
        >
          <SectionedMultiSelect
            items={jobExperience}
            IconRenderer={MaterialIcons}
            uniqueKey="name"
            single
            selectText={experience}
            colors={{ selectToggleTextColor: iconColor }}
            onSelectedItemsChange={(item) => setExperience(item[0])}
          />
        </View>
        <View
          style={{
            borderWidth: 1,
            borderRadius: 8,
            borderColor: borderColor,
          }}
        >
          <SectionedMultiSelect
            items={workTime}
            IconRenderer={MaterialIcons}
            uniqueKey="name"
            single
            selectText={workType}
            colors={{ selectToggleTextColor: iconColor }}
            onSelectedItemsChange={(item) => setWorkType(item[0])}
          />
        </View>
        <TextInput
          label="Salary"
          mode="outlined"
          onChangeText={(value) => setSalary(value)}
        />
        <TextInput
          label="Requirements"
          mode="outlined"
          multiline
          numberOfLines={7}
          onChangeText={(value) => setRequirements(value)}
        />
        <TextInput
          label="Others"
          mode="outlined"
          multiline
          numberOfLines={7}
          onChangeText={(value) => setOthers(value)}
        />
      </View>
      <Button
        icon="post"
        mode="contained"
        onPress={handlePostJob}
        style={{ marginHorizontal: 20 }}
      >
        {posting ? "Posting..." : "Post"}
      </Button>
    </ScrollView>
  );
};

export default add;

const styles = StyleSheet.create({});
