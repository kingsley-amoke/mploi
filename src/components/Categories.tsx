import React, {useState} from "react";
import { View } from "react-native";
import { List, Text } from "react-native-paper";

const categories = [
  {
    id: 1,
    title: "Printing/Publishing",
    subcategories: [
      { 
        title: "Graphics designer"
       }, 
       { 
        title: "Typist" 
      },
      {
        title: "Printer"
      }
    ],
  },
  {
    id: 2,
    title: "Fashion Designer",
    subcategories: [
      { title: "Male" }, 
      { title: "Female" }],
  },
  {
    id: 3,
    title: "Photographer/VideoGrapher",
    subcategories: [
      { title: "Passport/photographs" }, 
      { title: "Birthday coverage" },
      {title: "Wedding coverage"},
      {title: "burial coverage"},
      {title: "Naming ceremony" },
    ],
  },
];

const Categories = () => {

  const [category, setCategory] = useState('')

  console.log(category)

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
      {/* <Text style={{ fontSize: 16, paddingLeft: 10 }}>All Categories</Text> */}
      {categories.map((category, index) => (
        <View key={index}>
          <List.Accordion title={category.title} id={category.id}>
            {category.subcategories.map((subcategory, subIndex) => (
              <List.Item key={subIndex} title={subcategory.title} onPress={()=>setCategory(subcategory.title)} style={{marginLeft:20}}/>
            ))}
          </List.Accordion>
        </View>
      ))}
    </View>
  </List.AccordionGroup>
)

};

export default Categories;
