import { Dimensions, StyleSheet, View } from "react-native";
import React, { Fragment } from "react";
import { Avatar, Button, Text } from "react-native-paper";
import { CustomToast, latitudeDelta, longitudeDelta } from "../utils/data";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { DocumentData } from "firebase/firestore";
import { ref, remove } from "firebase/database";
import { realtimeDB } from "../utils/firebaseConfig";
import { useRouter } from "expo-router";
import { Colors } from "../constants/Colors";
import { useRequestStore } from "../state/store";

const Map = ({
  user,
  requestID,
}: {
  user: DocumentData;
  requestID: string | string[] | undefined;
}) => {
  const router = useRouter();
  const { requests, deleteRequest } = useRequestStore();

  const request = requests.find((req) => req._id === requestID);

  const coordinates = {
    latitude: parseFloat(user?.coordinates.latitude),
    longitude: parseFloat(user?.coordinates.longitude),
    latitudeDelta: latitudeDelta,
    longitudeDelta: longitudeDelta,
  };

  // const handleCancelService = () => {
  //   router.replace("/");
  //   // CustomToast("Service cancelled Successfully");
  //   // handleDeleteRequest();
  // };

  const handleDeleteRequest = () => {
    const requestRef = ref(realtimeDB, `requests/${requestID}`);
    remove(requestRef).then(() => {
      deleteRequest(request!);
    });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={coordinates}
        provider={PROVIDER_GOOGLE}
      >
        <Marker coordinate={coordinates} draggable />
      </MapView>
      <Fragment>
        <View
          style={{
            alignSelf: "center",

            backgroundColor: "#202B35",
            paddingVertical: 20,
            paddingHorizontal: 35,
            margin: 5,
            borderRadius: 10,
            gap: 20,
            position: "absolute",
            bottom: 20,
          }}
        >
          <View style={{ flexDirection: "row", gap: 20 }}>
            <Avatar.Image source={{ uri: user?.image }} size={50} />
            <View>
              <Text style={{ fontSize: 12, fontWeight: "bold", color: "grey" }}>
                {new Date(Date.now()).toLocaleDateString()}
              </Text>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                  color: Colors.dark.onBackground,
                }}
              >
                {user.firstName} {user.lastName}
              </Text>
              <Text style={{ fontSize: 14, color: Colors.dark.onBackground }}>
                {user.skills[1]}
              </Text>
            </View>
          </View>
          <View>
            <Text style={{ color: Colors.dark.onBackground }}>
              Request sent, waiting for service provider.
            </Text>
          </View>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Button
              mode="outlined"
              onPress={() => router.push(`profile/${user?._id}`)}
              textColor="white"
            >
              Profile
            </Button>
            <Button mode="contained" onPress={() => router.replace("/")}>
              Home
            </Button>
          </View>
        </View>
      </Fragment>
    </View>
  );
};

export default Map;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flex: 1,
  },
});
