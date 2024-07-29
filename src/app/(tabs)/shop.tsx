import React, { Fragment, useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View } from "react-native";
import { useUserStore } from "@/src/state/store";
import { latitudeDelta, longitudeDelta } from "@/src/utils/data";
import { Badge, Button, Text } from "react-native-paper";
import Map from "@/src/components/Map";
import { useRouter } from "expo-router";

export default function Shop() {

  const router = useRouter();
  const { user } = useUserStore();

  if (!user) return;

 

  return (
    <View style={styles.container}>
     
      {/* <Map user={user} />
       */}

       <Button mode="outlined" onPress={() => router.push(`/service/79FLxEvRtSaB772tdLivJInnITm2`)}>Book</Button>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
