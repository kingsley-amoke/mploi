import { useJobsStore } from "@/src/state/store";
import React, { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";
import { JobRenderItem } from "@/src/components/JobRenterItem";
import { ActivityIndicator, Button, Text } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { LinearGradient } from "expo-linear-gradient";

const career = () => {
  const { jobs } = useJobsStore();

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
      <ScrollView>
        {jobs ? (
          jobs.map((job) => <JobRenderItem item={job} key={job._id} />)
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
