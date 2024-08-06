import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { Button, Text } from "react-native-paper";
import { Colors } from "../constants/Colors";
import useTheme from "../hooks/useTheme";
import { useChatStore, useUserStore } from "../state/store";
import { useRouter } from "expo-router";

import { onValue, ref } from "firebase/database";
import { realtimeDB } from "../utils/firebaseConfig";
import { handleRequestService } from "../utils/data";

const BookService = ({ user }: { user: DocumentData }) => {


  const router = useRouter();

  const { user: loggedUser } = useUserStore();


  const [applying, setApplying] = useState(false);


  const handleBookService = async () => {
    setApplying(true);

    // check existing request

    const requestRef = ref(realtimeDB, "requests/");
  
    onValue(requestRef, (snapshot) => {
      let data =  snapshot.val() || [];



      const myData = Object.keys(data).map((key) => {
        return data[key];
      });
  
      const existingRequest = myData.filter((data) => data.client._id === loggedUser?._id && data.serviceProvider._id === user._id);

      if (existingRequest.length > 0) {
        console.log("There is a pending request");
        
        setApplying(false);
      } else {
        const id = `${Date.now()}`;
  
        const data = {
          id: id,
          client: loggedUser,
          serviceProvider: user,
        };

  
        handleRequestService(data).then(() => {
          router.push(`/service/${user._id}?request=${data.id}`);
          setApplying(false);
        });
      }

    })


  };


  return loggedUser?._id === user?._id && !loggedUser?.isAdmin ? (
    <Button
    mode="contained"
      style={{
       
        borderWidth: 1,
        marginVertical: 10,
        marginHorizontal:20,
        paddingVertical:5,
        marginBottom: 40,
       
      }}
      onPress={() => router.push("/admin")}
    >
      <Text variant="labelLarge" style={{color:'white'}}>Admin Dashboard</Text>
    </Button>
  ) : (
    <Button
    mode="contained"
      style={{
        
        borderWidth: 1,
        marginHorizontal:20,
        paddingVertical:5,
        marginVertical: 10,
        marginBottom: 40,
       
      }}
      onPress={()=>handleBookService()}
    >
      {!applying ? (
        <Text variant="labelLarge" style={{color:'white'}}>Book Service</Text>
      ) : (
        <Text variant="labelLarge" style={{color:'white'}}>Please Wait</Text>
      )}
    </Button>
  );
};

export default BookService;
