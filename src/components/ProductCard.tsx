import { DocumentData } from 'firebase/firestore';
import React from 'react';
import {Card, Text } from 'react-native-paper';


const ProductCard = ({product}: {product:DocumentData}) => (
  <Card>
    <Card.Cover source={{ uri: product.image }} style={{height:100}}/>
    <Card.Content style={{marginVertical:10}}>
      <Text variant="titleLarge">{product.name}</Text>
      <Text variant="bodyMedium">{product.description}</Text>
      <Text>{product.price}</Text>
    </Card.Content>
   
  </Card>
);

export default ProductCard;