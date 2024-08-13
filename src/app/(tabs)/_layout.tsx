import { StyleSheet, Platform } from "react-native";
import { Tabs } from "expo-router";
import { Feather,MaterialCommunityIcons, } from "@expo/vector-icons";
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from "expo-status-bar";
import { RootSiblingParent } from "react-native-root-siblings";

const TabLayout = () => {




  return (
    <>
    <StatusBar style='light' />
    <Tabs
      screenOptions={{
        headerTitleAlign: "center",
        tabBarStyle: Platform.OS === 'android' ? { height: 50, padding:10  } : { height:100 },
        tabBarLabelStyle: { fontSize: 10, marginBottom:5 },
        
        headerTransparent: false, 

      }}
        
    >
      
      <Tabs.Screen
        name="index"
        options={{
          title: "MPLOi Market",
          tabBarLabel: 'Home',
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
        </>
  );
};

export default TabLayout;

const styles = StyleSheet.create({});
