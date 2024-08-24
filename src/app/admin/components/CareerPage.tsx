import { FlatList, TouchableOpacity, useColorScheme, View } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { useJobsStore } from "@/src/state/store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { deleteDoc, doc, DocumentData } from "firebase/firestore";

import { firestoreDB } from "@/src/utils/firebaseConfig";
import { ActivityIndicator, Divider, Text } from "react-native-paper";
import { CustomToast } from "@/src/utils/data";

const CareerPage = () => {
  const router = useRouter();

  const { jobs, deleteJob } = useJobsStore();

  const colorScheme = useColorScheme();
  const [loading, setLoading] = useState(false);

  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const JobRenderItem = ({ item }: { item: DocumentData }) => {
    const date = parseInt(item._id);

    const jobDate = new Date(date).getTime();

    const today = new Date(Date.now()).getTime();

    const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

    const salary = new Intl.NumberFormat("en-UK", {
      style: "currency",
      currency: "NGN",
    }).format(item.salary);

    const handleViewJob = ({}) => {
      router.push(`admin/jobs/${item._id}`);
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
      <View style={{ marginVertical:10 }}>
        <Text style={{ fontSize: 12, fontWeight: "bold" }}>
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
            <Text>Position: #{item.position}</Text>
            <Text>Salary: {salary}</Text>
            <Text>Location: {item.location}</Text>
          </View>
          <View style={{ gap: 20, alignItems: "center", flexDirection: "row" }}>
            <TouchableOpacity onPress={handleViewJob}>
              <MaterialCommunityIcons name="eye" size={20} />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDeleteJob}>
              <MaterialCommunityIcons name="trash-can-outline" size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
        <Divider bold horizontalInset/>
            </>
    );
  };

  return (
    <>
      <TouchableOpacity
        style={{
          alignItems: "flex-end",
          justifyContent: "flex-end",
          width: "100%",
          padding: 20,
        }} onPress={()=>router.push('/admin/jobs/add')}
      >
        <MaterialCommunityIcons
          name="plus"
          size={30}
          color={iconColor}
          style={{ borderWidth: 1, borderRadius: 100 }}
        />
      </TouchableOpacity>
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
            <View>
              <ActivityIndicator animating color="teal" size="small" />
              <Text>Deleting...</Text>
            </View>
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
