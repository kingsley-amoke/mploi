import { ScrollView, StyleSheet, View } from "react-native";
import React from "react";
import {Text } from 'react-native-paper'

const Disclaimer = () => {


  return (
    <ScrollView
      style={{ paddingVertical: 10, marginHorizontal: 30 }}
      showsVerticalScrollIndicator={false}
    >
      <Text >
      1. MyPlug APP is designed solely to satisfy the desire of numerous job seekers in Nigeria and by extension, Africa. 
      </Text>
      <Text style={{ marginVertical: 10, }}>
      2. No other activities which are not in line with the provisions of MyPlug through our app shall be tolerated. 
      </Text>
      <Text>
      MyPlug Africa Initiative shall not be responsible for whatever purpose users perform with the app or for whatever transaction users decides to perform or whatever arrangements users might have outside the features provided by MyPlug APP.
      </Text>
      </ScrollView>
  )
}

export default Disclaimer

const styles = StyleSheet.create({})