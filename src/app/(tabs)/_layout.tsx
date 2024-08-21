import { StyleSheet, Platform } from "react-native";
import { Tabs, useRouter } from "expo-router";
import { Feather,MaterialCommunityIcons, MaterialIcons, } from "@expo/vector-icons";
import { useUserStore } from "@/src/state/store";

const TabLayout = () => {

const {user} = useUserStore();
const router = useRouter();

const location = user.location.subregion + ", " + user?.location.city

  return (
    
    <Tabs
      screenOptions={{
        headerTitleAlign: "left",
        tabBarStyle: Platform.OS === 'android' ? { height: 50, padding:10  } : { height:100 },
        tabBarLabelStyle: { fontSize: 10, marginBottom:5 },
        
        headerTransparent: false,
        headerTitleStyle: {fontSize:14, marginTop:10},
        headerStatusBarHeight: 14

      }}
        
    >
      
      <Tabs.Screen
        name="home"
        options={{
          title: location,
          headerTitleAlign: 'left',
          headerTitleStyle: {fontSize: 14},
          tabBarLabel: 'Home',
          headerRight: () => <MaterialIcons name="person" size={20} style={{marginRight:20}} onPress={()=>router.push('/profile')}/>,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" size={20} color={color} />
          ),

        }}
      />
      <Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="message" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="career"
        options={{
          title: "Career",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="briefcase-clock"
              size={20}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: "Shop",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="shopping" size={20} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={20} color={color} />
          ),
        }}
        />
    </Tabs>
    
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
