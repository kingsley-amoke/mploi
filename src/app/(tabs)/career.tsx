import { useJobsStore } from "@/src/state/store";
import React from "react";
import { FlatList, useColorScheme, View } from "react-native";
import { JobRenderItem } from "@/src/components/JobRenterItem";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "@/src/constants/Colors";

const career = () => {


  const { jobs } = useJobsStore();

  return (
    <View style={{ flex: 1, width: "100%"}}>

      {jobs ? jobs.map(job => (

        <JobRenderItem item={job} key={job._id}/>
      )) : 
      <View>
        <ActivityIndicator color={Colors.light.primary} size='large' />
        </View>
      }
      
    </View>
  );
};

export default career;
