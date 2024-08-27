import { useRouter } from "expo-router";
import { DocumentData } from "firebase/firestore";
import React from "react";
import { Card, Text } from "react-native-paper";
import { useImageStore } from "../state/store";
import { shopAvatar } from "../utils/data";

export const PhotosCard = ({
  item,
  preview,
}: {
  item: string;
  preview?: string;
}) => {
  const router = useRouter();
  const { updateImage } = useImageStore();

  //view image fullscreen

  const handleViewImage = () => {
    updateImage(item);
    router.push(`/image`);
  };

  return (
    <Card style={{ width: 100 }} onPress={() => handleViewImage()}>
      <Card.Cover
        source={{ uri: item || shopAvatar }}
        style={{ height: 100 }}
      />
    </Card>
  );
};

export default PhotosCard;
