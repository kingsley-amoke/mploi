import { useJobsStore } from "@/src/state/store";
import React, { useState } from "react";
import { FlatList, ScrollView, useColorScheme, View } from "react-native";
import { JobRenderItem } from "@/src/components/JobRenterItem";
import { ActivityIndicator, Button } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";
import { CarouselAutoScroll } from "@/src/components/Slider";
import { categories } from "@/src/utils/categories";
import { doc, setDoc } from "firebase/firestore";
import { firestoreDB } from "@/src/utils/firebaseConfig";

const career = () => {
  const { jobs } = useJobsStore();
  const [loading, setLoading] = useState(false);

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
