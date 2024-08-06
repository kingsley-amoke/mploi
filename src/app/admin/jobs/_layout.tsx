import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/src/constants/Colors'

const JobLayout = () => {
  return (
    <Stack>
        <Stack.Screen name='add' options={{
              title: 'Add Job',
              headerTitleAlign: "center",
          headerStyle: { backgroundColor: Colors.light.primary },
          headerTintColor: "white",
            }}/>
        <Stack.Screen name='[id]'/>
    </Stack>
  )
}

export default JobLayout

const styles = StyleSheet.create({})