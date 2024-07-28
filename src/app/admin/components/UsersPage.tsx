import { FlatList, StyleSheet,View } from 'react-native'
import{Avatar, Divider, Text  } from 'react-native-paper'
import React from 'react'
import { useUsersStore, useUserStore } from '@/src/state/store'
import { DocumentData } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const UsersPage = () => {



    const {users} = useUsersStore();
    const {user} = useUserStore()

    const allUsers = users.filter(item => item._id !== user?._id)

  return (
    <FlatList data={allUsers} renderItem={UsersRenderItem}/>
  )
}

export default UsersPage

const styles = StyleSheet.create({})


const UsersRenderItem = ({item}: {item: DocumentData}) => {
    return (
        <>
        <View style={{marginHorizontal:20, marginVertical:10, flexDirection:'row', gap:30}}>
            <Avatar.Image  source={{uri: item.image}}/>
            <View style={{justifyContent:'center'}}>

            <Text>{item.lastName}</Text>
            <Text>{item.skills[1]}</Text>
            </View>
            <View style={{justifyContent:'center'}}>
                <MaterialIcons name='message' size={30} color='white'/>
            </View>

        </View>
        <Divider bold horizontalInset />
        </>
    )
}