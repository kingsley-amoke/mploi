import { useJobsStore } from "@/src/state/store";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { ScrollView, TextInput, View } from "react-native";
import { JobRenderItem } from "@/src/components/JobRenterItem";
import { ActivityIndicator, Button, Divider, Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { Dropdown } from "react-native-element-dropdown";
import CustomDropdown from "@/src/components/CustomDropdown";
import { DocumentData } from "firebase/firestore";

const career = () => {
  const { jobs } = useJobsStore();

  const [searchedJobs, setSearchedJobs] = useState<DocumentData[]>([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [value, setValue] = useState("");

  const dateData = jobs
    .map((job) => job._id)
    .map((date) => {
      return {
        label: date,
        value: date,
      };
    });

  const companyData = jobs
    .map((job) => job.company)
    .map((company) => {
      return {
        label: company,
        value: company,
      };
    });

  const jobTypeData = jobs
    .map((job) => job.workType)
    .map((type) => {
      return {
        label: type,
        value: type,
      };
    });

  useLayoutEffect(() => {
    const filteredJobs = jobs.filter((job) => {
      if (title == "" && location == "") {
        return job;
      }

      return (
        job.title.toLowerCase() == title.toLowerCase() ||
        job.title.toLowerCase().includes(title.toLowerCase()) ||
        job.location.toLowerCase() == location.toLowerCase() ||
        job.location.toLowerCase().includes(location.toLowerCase())
      );
    });

    setSearchedJobs(filteredJobs);
  }, [title]);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
          }}
        >
          Jobs
        </Text>
      </LinearGradient>
      <ScrollView
        style={{ marginVertical: 10 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            marginHorizontal: 20,
            borderWidth: 1,
            borderRadius: 10,
            borderColor: "grey",
          }}
        >
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5,
              padding: 10,
            }}
          >
            <TextInput
              placeholder="Search job title"
              style={{
                fontSize: 20,
                flex: 1,
              }}
              onChangeText={(text) => setTitle(text)}
            />
            <MaterialIcons name="search" size={30} color="grey" />
          </View>

          <Divider bold />
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5,
              padding: 10,
            }}
          >
            <TextInput
              placeholder="Search location"
              style={{
                fontSize: 20,
                flex: 1,
              }}
              onChangeText={(text) => setLocation(text)}
            />
            <MaterialIcons name="search" size={30} color="grey" />
          </View>
        </View>
        <View
          style={{
            marginHorizontal: 10,
            marginVertical: 20,
            flexDirection: "row",
            justifyContent: "space-evenly",
          }}
        >
          <CustomDropdown
            data={dateData}
            placeholder="Date Posted"
            value={value}
            setValue={setValue}
          />
          <CustomDropdown
            data={jobTypeData}
            placeholder="Job Type"
            value={value}
            setValue={setValue}
          />
          <CustomDropdown
            data={companyData}
            placeholder="Company"
            value={value}
            setValue={setValue}
          />
        </View>
        {jobs ? (
          searchedJobs.map((job) => <JobRenderItem item={job} key={job._id} />)
        ) : (
          <View>
            <ActivityIndicator color={Colors.light.primary} size="large" />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default career;
