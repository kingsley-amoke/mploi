
import { jobTypes } from "@/src/utils/types";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

import {Text} from 'react-native-paper'

export const JobRenderItem = (item: jobTypes,) => {

  const date = item.date!
  
  const jobDate = new Date(date).getTime()
  
  const today = new Date(Date.now()).getTime();
  
  const daysAgo = Math.floor((today  - jobDate)/ (1000* 60 *60*24))

  return(
  <View style={{ marginVertical: 20, paddingHorizontal: 30 }}>
    <Link
      href={{
        pathname: `/jobs/${item._id}`,
        params: { id: item._id },
      }}
      asChild
    >
      <TouchableOpacity>
        <Text style={styles.jobTime}>
          Posted: {daysAgo < 1 ? 'Today' : daysAgo +  ' days ago'}
        </Text>
        <Text style={styles.jobTitle}>{item.title}</Text>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.jobSalary}>
            Est. Pay: ₦{item.minPay} - ₦{item.maxPay}
          </Text>
          <Text
            style={{
              fontWeight: "bold",
              textTransform: "capitalize",
              fontSize: 18,
             
            }}
          >
            {item?.isOpen ? "Open" : "Close"}
          </Text>
        </View>

        <View
          
          style={styles.jobKeywords}
        >
          {[].map(category => (
            <Text
            style={{
              
              color: "white",
              paddingHorizontal: 10,
              paddingVertical: 6,
              borderRadius: 20,
              marginVertical: 10,
              textTransform: "uppercase",
              fontSize: 10,
            }}
          >
            {category}
          </Text>
          ))}
        </View>
        <View style={styles.employer}>

          <Text style={{ fontSize: 20 }}>{item?.employer?.firstName + " " + item?.employer?.lastName[0]}</Text>
          <View
            style={{
              flex: 1,
              gap: 4,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <View style={{borderRadius: 50 }}>
              {item?.employer?.status?.isVerified ? (
                <Ionicons
                  name="checkmark"
                  size={15}
                  style={{ color: "white", padding: 2 }}
                />
              ) : (
                <Ionicons
                  name="close"
                  size={15}
                  style={{ color: "white", padding: 2 }}
                />
              )}
            </View>
 
          </View>
        </View>
        <View style={styles.jobLocation}>
          <Ionicons name="location-outline" size={20} />
          <Text>{item?.location?.lga}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  </View>
    
  
)}

const styles = StyleSheet.create({
  jobTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  jobDesc: {
    marginBottom: 10,
    fontSize: 16,
  },
  jobSalary: {
    fontStyle: "italic",
    marginVertical: 10,
  },
  jobTime: {
    fontSize: 14,
    color: "grey",
  },
  jobLocation: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 5,
  },
  jobKeywords: {
    flexDirection: "row",
    gap: 5,
  },
  employer: {
    flex: 1,
    flexDirection: "row",
    gap: 30,
    alignItems: "center",
    marginVertical: 10,
  },
  userImage: {
    height: 30,
    width: 30,
    borderRadius: 50,
  },
});
