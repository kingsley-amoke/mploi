import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Colors } from '@/src/constants/Colors'

const JobLayout = () => {
  return (
    <Stack screenOptions={{
              headerTitleAlign: "left",
              headerTransparent: false,
              headerTitleStyle: { fontSize: 14 },
            }}>
        <Stack.Screen name='add' options={{
              title: 'Add Job',
            }}/>
        <Stack.Screen name='[id]'/>
    </Stack>
  )
}

export default JobLayout

const styles = StyleSheet.create({})