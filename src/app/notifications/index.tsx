import { StyleSheet, View } from 'react-native'
import React, {useEffect, useState} from 'react'
import { Text, Switch } from 'react-native-paper'

import { useNavigation } from 'expo-router'

const notifications = () => {

  const navigation = useNavigation()
  const [isSwitchOn, setIsSwitchOn] = useState(true);


  const switchTheme = () => {
    setIsSwitchOn(!isSwitchOn);
  }

  useEffect(() => {

    navigation.setOptions({
      title: 'Push Notification',
    });
  }, [])

  return (
    <View style={{margin:16, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
      <Text>Recieve Push Notifications</Text>
      <Switch value={isSwitchOn} onValueChange={switchTheme} />
    </View>
  )
}

export default notifications

const styles = StyleSheet.create({})