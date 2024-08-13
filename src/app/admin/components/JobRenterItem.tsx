
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { DocumentData } from "firebase/firestore";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { Button, Divider, Text } from "react-native-paper";

export const JobRenderItem = ({ item, iconColor }: { item: DocumentData, iconColor: string }) => {
  const date = parseInt(item._id);

  const jobDate = new Date(date).getTime();

  const today = new Date(Date.now()).getTime();

  const daysAgo = Math.floor((today - jobDate) / (1000 * 60 * 60 * 24));

  
  const salary = new Intl.NumberFormat('en-UK', {style: 'currency', currency: 'NGN'}).format(item.salary);

  return (
    <View style={{ marginVertical: 10, marginHorizontal:10 }}>
      <Link
        href={{
          pathname: `admin/jobs/${item._id}`,
          
        }}
        asChild
      >
        <TouchableOpacity>
          <View style={{ flexDirection: "row-reverse", justifyContent:'space-between', alignItems:'center' }}>
            <Text style={{color:'grey', fontSize:10, fontWeight:'bold', fontStyle:'italic'}}>
              Posted: {daysAgo < 1 ? "Today" : daysAgo + " days ago"}
            </Text>
            <Text style={{fontSize:16, fontWeight:'bold'}}>{item.title}</Text>
          </View>
          <View
            style={{
             
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{fontStyle:'italic', fontSize:12}}>
              {salary}
            </Text>
            <Text
              style={{
                fontWeight: "bold",
                textTransform: "capitalize",
                fontSize: 14,
              }}
            >
              {!item.taken ? "Open" : "Close"}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 16 }}>{item.company}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', gap:5}}>
            <Ionicons name="location-outline" size={15} color={iconColor} />
            <Text>{item.location}</Text>
          </View>
          <View style={{justifyContent:'flex-end', alignItems:'flex-end'}}>
            <Button mode="outlined" >See Details</Button>
          </View>
        </TouchableOpacity>
      </Link>

      <Divider bold horizontalInset style={{ marginTop: 14 }} />
    </View>
  );
};

