import { useJobsStore } from "@/src/state/store";
import React, { useState } from "react";
import { FlatList, ScrollView, TextInput, View } from "react-native";
import { Button, Card, Divider, Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomDropdown from "@/src/components/CustomDropdown";
import { useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import DateTimePicker from "@react-native-community/datetimepicker";

const career = () => {
  const { jobs } = useJobsStore();
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [datePosted, setDatePosted] = useState("t");
  const [company, setCompany] = useState("");
  const [workType, setWorkType] = useState("");

  const [date, setDate] = useState(new Date(Date.now()));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const filteredJobs = jobs.filter((job) => {
    if (title != "") {
      return job.title.toLowerCase().includes(title.toLowerCase());
    } else if (location != "") {
      return job.location.toLowerCase().includes(location.toLowerCase());
    } else if (company != "") {
      return job.company.toLowerCase().includes(company.value.toLowerCase());
    } else if (workType != "") {
      return job.workType.toLowerCase().includes(workType.value.toLowerCase());
    } else if (date != new Date(Date.now())) {
      return date.getTime() > new Date(parseInt(job._id)).getTime();
    }

    return jobs;
  });

  const jobYears = new Set();

  jobs
    .map((job) => job._id)
    .forEach((date) => {
      const year = new Date(parseInt(date)).getFullYear().toString();

      jobYears.add(year);
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

  const dateData = [...jobYears].map((e) => {
    return { label: e, value: e };
  });

  const JobRenderItem = (item: DocumentData) => {
    return (
      <View style={{ width: "100%", alignItems: "center" }} key={item._id}>
        <Card
          style={{
            width: "90%",
            marginVertical: 10,
            padding: 10,
            borderRadius: 5,
          }}
        >
          <View style={{ gap: 30 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {item.title}
            </Text>

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 16, textTransform: "capitalize" }}>
                  {item.company}
                </Text>
                <Text style={{ textTransform: "capitalize" }}>
                  {item.location}
                </Text>
              </View>
              <View
                style={{ justifyContent: "flex-end", alignItems: "flex-end" }}
              >
                <Button
                  mode="contained"
                  onPress={() => router.push(`/jobs/${item._id}`)}
                >
                  Apply
                </Button>
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };

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
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              onChange={onChange}
            />
          )}

          <CustomDropdown
            data={jobTypeData}
            placeholder="Job Type"
            value={workType}
            setValue={setWorkType}
          />
          <CustomDropdown
            data={companyData}
            placeholder="Company"
            value={company}
            setValue={setCompany}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={30}
              color={Colors.secondary}
              onPress={showDatepicker}
            />
          </View>
        </View>

        {filteredJobs.length > 0 &&
          filteredJobs.map((job) => JobRenderItem(job))}
      </ScrollView>
    </View>
  );
};

export default career;
