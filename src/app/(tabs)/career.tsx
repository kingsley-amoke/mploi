import { useJobsStore } from "@/src/state/store";
import React, { useMemo, useState } from "react";
import { FlatList, TextInput, View } from "react-native";
import { Avatar, Button, Divider, Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import CustomDropdown from "@/src/components/CustomDropdown";
import { useRouter } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import { UIActivityIndicator } from "react-native-indicators";
import { Pressable } from "react-native";
import FancyHeader from "@/src/components/FancyHeader";
import { noAvatar } from "@/src/utils/data";

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

  const filteredJobs = useMemo(
    () =>
      jobs.filter((job) => {
        if (title != "") {
          return job.title.toLowerCase().includes(title.toLowerCase());
        } else if (location != "") {
          return job.location.toLowerCase().includes(location.toLowerCase());
        } else if (company != "") {
          return job.company
            .toLowerCase()
            .includes(company.value.toLowerCase());
        } else if (workType != "") {
          return job.workType
            .toLowerCase()
            .includes(workType.value.toLowerCase());
        } else if (date != new Date(Date.now())) {
          return date.getTime() > new Date(parseInt(job._id)).getTime();
        }

        return jobs;
      }),
    [jobs.length, title, location, workType, date]
  );

  const jobYears = new Set();

  // jobs
  //   .map((job) => job._id)
  //   .forEach((date) => {
  //     const year = new Date(parseInt(date)).getFullYear().toString();

  //     jobYears.add(year);
  //   });

  const companyData = useMemo(
    () =>
      jobs
        .map((job) => job.company)
        .map((company) => {
          return {
            label: company,
            value: company,
          };
        }),
    [jobs.length]
  );

  const jobTypeData = useMemo(
    () =>
      jobs
        .map((job) => job.workType)
        .map((type) => {
          return {
            label: type,
            value: type,
          };
        }),
    [jobs.length]
  );

  return (
    <View style={{ flex: 1 }}>
      <FancyHeader title="Jobs" />
      <View style={{ marginVertical: 10, flex: 1 }}>
        <View
          style={{
            marginHorizontal: 20,
            // borderWidth: 1,
            // borderRadius: 10,
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
          <Pressable
            style={{
              flexDirection: "row",
              justifyContent: "center",

              alignItems: "flex-start",
            }}
            onPress={showDatepicker}
          >
            <MaterialCommunityIcons
              name="calendar"
              size={40}
              color={Colors.grey}
            />
            <MaterialCommunityIcons
              name="arrow-down-bold"
              size={20}
              color={Colors.primary}
            />
          </Pressable>
        </View>
        <Divider bold />

        {filteredJobs.length > 0 ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={filteredJobs}
            renderItem={({ item }) => (
              <View style={{ alignItems: "center" }} key={item._id}>
                <View
                  style={{
                    width: "90%",
                    marginVertical: 10,
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  <View style={{ gap: 10 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {item.title}
                    </Text>
                    {item?.companyLogo && (
                      <Avatar.Image
                        source={{ uri: item.companyLogo }}
                        size={30}
                      />
                    )}
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontSize: 16,
                            textTransform: "capitalize",
                          }}
                        >
                          {item.company}
                        </Text>
                        <Text style={{ textTransform: "capitalize" }}>
                          {item.location}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          alignItems: "flex-end",
                        }}
                      >
                        <Button
                          mode="contained"
                          disabled={item.taken}
                          onPress={() => router.push(`/jobs/${item._id}`)}
                        >
                          {item.taken ? "Taken" : "Apply"}
                        </Button>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            )}
          />
        ) : (
          <UIActivityIndicator color={Colors.primary} />
        )}
      </View>
    </View>
  );
};

export default career;
