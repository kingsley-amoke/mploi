import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Map from '@/src/components/Map'
import { useLocalSearchParams } from 'expo-router'
import { useUsersStore } from '@/src/state/store'

const RequestService = () => {

    const {users} = useUsersStore();

    const {id, request} = useLocalSearchParams();

    const user = users.filter(user => user._id === id)[0];

  return (
    <View style={styles.container}>
     
    <Map user={user} requestID={request} />
  </View>
  )
}

export default RequestService

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });