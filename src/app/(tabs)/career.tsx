import { useJobsStore } from "@/src/state/store";
import React from "react";
import { FlatList, View } from "react-native";
import { JobRenderItem } from "../admin/components/JobRenterItem";
import useTheme from "@/src/hooks/useTheme";

const career = () => {
  const { colorScheme } = useTheme();

  const iconColor = colorScheme === "dark" ? "#ffffff" : "#000000";

  const { jobs } = useJobsStore();

  return (
    <View style={{ flex: 1, width: "100%", marginHorizontal: 10 }}>
      <FlatList
        data={jobs}
        renderItem={(item) => JobRenderItem(item, iconColor)}
      />
    </View>
  );
};

export default career;
