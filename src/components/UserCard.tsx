import { DocumentData } from 'firebase/firestore';
import React from 'react';
import {Card, Text } from 'react-native-paper';


const UserCard = ({user}: {user:DocumentData}) => (
  <Card>
    <Card.Cover source={{ uri: user.image }} style={{height:100}}/>
    <Card.Content style={{marginVertical:10}}>
      <Text variant="titleLarge">{user.firstName} {user.lastName[0]}</Text>
      <Text variant="bodyMedium">Mechanic</Text>
      <Text>{user.location.lga}</Text>
    </Card.Content>
   
  </Card>
);

export default UserCard;