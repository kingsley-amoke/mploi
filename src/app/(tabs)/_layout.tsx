import { StyleSheet, Text, View } from 'react-native'
import { Tabs } from 'expo-router';
import { Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import CustomHeader from '@/src/components/CustomHeader';


const TabLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='index' options={{
            title: 'Home',
            tabBarIcon: ({color}) => <Feather name="home" size={24} color={color} />,
            header: () => <CustomHeader title='Home'/>

        }}/>
        <Tabs.Screen name='messages' options={{
            title: 'Messages',
            tabBarIcon: ({color}) => <Feather name="message-square" size={24} color={color} />

        }}/>
        <Tabs.Screen name='career' options={{
            title: "Career",
            tabBarIcon: ({color}) => <MaterialCommunityIcons name="briefcase-clock-outline" size={24} color={color} />

        }}/>
        <Tabs.Screen name='shop' options={{
            title: 'Shop',
            tabBarIcon: ({color}) => <Feather name="shopping-bag" size={24} color={color} />

        }}/>
        <Tabs.Screen name='settings' options={{
            title: 'Settings',
            tabBarIcon: ({color}) => <Feather name="settings" size={24} color={color} />,
            header: () => <CustomHeader title='Settings'/>

        }}/>
    </Tabs>
  )
}

export default TabLayout;

const styles = StyleSheet.create({})