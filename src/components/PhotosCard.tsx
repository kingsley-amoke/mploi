import { DocumentData } from 'firebase/firestore';
import React from 'react';
import {Card, Text } from 'react-native-paper';


export const PhotosCard = ({item}: {item:string}) => (
  <Card style={{width:100}}>
    <Card.Cover source={{ uri: item }} style={{height:100}}/>
  </Card>
);

export default PhotosCard;