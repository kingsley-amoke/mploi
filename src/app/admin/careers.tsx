import { FlatList, TouchableOpacity, useColorScheme, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { useJobsStore } from "@/src/state/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";
import { UIActivityIndicator } from "react-native-indicators";

import { firestoreDB } from "@/src/utils/firebaseConfig";
import { Button, Divider, Text } from "react-native-paper";
import { CustomToast, getJobs } from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";

const CareerPage = () => {
  const router = useRouter();

  const { jobs, deleteJob } = useJobsStore();

  const [loading, setLoading] = useState(false);

  const JobRenderItem = ({ item }: { item: DocumentData }) => {
    const salary = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "NGN",
    }).format(item.salary);

    const handleViewJob = ({}) => {
      router.push(`/jobs/${item._id}`);
    };

    const handleDeleteJob = () => {
      setLoading(true);
      const jobRef = doc(firestoreDB, "jobs", item._id);

      deleteDoc(jobRef).then(async () => {
        deleteJob(item);
        setLoading(false);
        CustomToast("Job deleted Successfully");
      });
    };

    return (
      <>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: "bold" }}>
            Company: {item.company}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "95%",
            }}
          >
            <View>
              <Text>ID: {item._id}</Text>
              <Text>Position: {item.title}</Text>
              <Text>Salary: {salary}</Text>
              <Text>Location: {item.location}</Text>
            </View>
            <View
              style={{ gap: 20, alignItems: "center", flexDirection: "row" }}
            >
              <TouchableOpacity onPress={handleViewJob}>
                <MaterialCommunityIcons name="eye" size={30} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleDeleteJob}>
                <MaterialCommunityIcons name="trash-can-outline" size={30} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider bold horizontalInset />
      </>
    );
  };

  return (
    <>
      <Button
        mode="contained"
        style={{ width: "50%", alignSelf: "center", marginVertical: 10 }}
        onPress={() => router.push("/jobs/add")}
      >
        Add Job
      </Button>
      {loading || jobs.length < 1 ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
          }}
        >
          {!loading ? (
            <View>
              <Text>No jobs today...</Text>
            </View>
          ) : (
            <UIActivityIndicator color={Colors.primary} />
          )}
        </View>
      ) : (
        <View style={{ flex: 1, width: "95%", marginHorizontal: 10 }}>
          <FlatList
            data={jobs}
            renderItem={(item) => JobRenderItem(item)}
            showsVerticalScrollIndicator={false}
          />
        </View>
      )}
    </>
  );
};

export default CareerPage;
