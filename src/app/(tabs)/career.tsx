import { useJobsStore } from "@/src/state/store";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { JobRenderItem } from "@/src/components/JobRenterItem";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";

const career = () => {
  const { jobs } = useJobsStore();

  return (
    <ScrollView style={{ flex: 1, width: "100%" }}>
      {jobs ? (
        jobs.map((job) => <JobRenderItem item={job} key={job._id} />)
      ) : (
        <View>
          <ActivityIndicator color={Colors.light.primary} size="large" />
        </View>
      )}
    </ScrollView>
  );
};

export default career;
