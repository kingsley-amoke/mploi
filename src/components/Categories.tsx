import React, {useState} from "react";
import { View } from "react-native";
import { ActivityIndicator, List, Text } from "react-native-paper";
import { useCategoryStore } from "../state/store";


const Categories = () => {

 const {categories} = useCategoryStore()

return(
  <List.AccordionGroup>
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 20,
        marginHorizontal: 10,
      }}
    >
      
      {/* {categories.length > 0 ? (categories.map((category, index) => (
        <View key={index}>
          <List.Accordion title={category.name} id={category.name}>
            {category?.subcategories?.map((subcategory, subIndex) => (
              <List.Item key={subIndex} title={subcategory.name} style={{marginLeft:20}}/>
            ))}
          </List.Accordion>
        </View>
      ))) : (
        <ActivityIndicator animating={true} size={30}/>
      )} */}
    </View>
  </List.AccordionGroup>
)

};

export default Categories;
