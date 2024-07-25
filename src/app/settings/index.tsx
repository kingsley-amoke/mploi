import { StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Text, Switch } from 'react-native-paper'


import useTheme from '../../hooks/useTheme'
import { useNavigation } from 'expo-router'

const settings = () => {

  const navigation = useNavigation()
  const [isSwitchOn, setIsSwitchOn] = useState(true);

  const {toggleTheme} = useTheme();

  const switchTheme = () => {
    toggleTheme();
    setIsSwitchOn(!isSwitchOn);
  }

  useEffect(() => {

    navigation.setOptions({
      title: 'Change Theme',
    });
  }, [])

  return (
    <View style={{margin:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Text>Dark Mode</Text>
      <Switch value={isSwitchOn} onValueChange={switchTheme} />
    </View>
  )
}

export default settings

const styles = StyleSheet.create({})