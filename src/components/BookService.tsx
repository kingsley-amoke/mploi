import React, { useState } from "react";
import { DocumentData } from "firebase/firestore";
import { useRequestStore, useUserStore } from "../state/store";
import { useRouter } from "expo-router";

import { CustomToast, handleRequestService } from "../utils/data";
import { Button, Text } from "react-native-paper";

const BookService = ({ user }: { user: DocumentData }) => {
  const router = useRouter();

  const { user: loggedUser } = useUserStore();
  const { requests, addRequest, storeNewRequestId } = useRequestStore();

  const [applying, setApplying] = useState(false);

  const handleBookService = () => {
    setApplying(true);
    const existingRequest = requests.filter(
      (data) =>
        data.client._id === loggedUser?._id &&
        data.serviceProvider._id === user._id
    );
    if (existingRequest.length > 0) {
      CustomToast("There is a pending request");
      setApplying(false);
    } else {
      const id = `${Date.now()}`;

      const data = {
        _id: id,
        client: loggedUser,
        serviceProvider: user,
      };

      handleRequestService(data).then(() => {
        router.push(`/service/${user._id}`);
        CustomToast("Service booked Successfully");
        addRequest(data);
        storeNewRequestId(data._id);
        setApplying(false);
      });
    }
  };

  return (
    <Button
      mode="contained"
      disabled={applying}
      style={{
        borderWidth: 1,
        marginHorizontal: 20,
        paddingVertical: 5,
        marginVertical: 10,
        marginBottom: 40,
      }}
      onPress={handleBookService}
    >
      {!applying ? (
        <Text variant="labelLarge" style={{ color: "white" }}>
          Book Service
        </Text>
      ) : (
        <Text variant="labelLarge" style={{ color: "white" }}>
          Please Wait
        </Text>
      )}
    </Button>
  );
};

export default BookService;
