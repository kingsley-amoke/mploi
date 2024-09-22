import { View, Text, useColorScheme } from 'react-native'
import React, { useEffect } from 'react'
import { useUserStore } from '@/src/state/store'
import { FontAwesome6, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'
import { ExternalLink } from '@/src/components/ExternalLink'
import { Colors } from '@/src/constants/Colors'
import { socialLinks } from '@/src/utils/data'

const index = () => {


    const {user} = useUserStore()
    const colorScheme = useColorScheme()

    const textColor = colorScheme === 'light' ? '#000' : '#fff';


  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <View>

        <Text style={{fontWeight:'bold', fontSize:24, marginBottom:10}}>Hello {user.lastName}!!</Text>
      <Text>Malicious activities were detected in your account</Text>
      </View> 
      <MaterialCommunityIcons name='account-cancel' size={100} color='red' style={{marginVertical:20}}/>
      <View>

        <Text>
          <ExternalLink href={socialLinks.chat} style={{color: Colors.light.secondary, fontWeight:'800', }}>

           Click here {""}
          </ExternalLink>
            to contact admin for assistance!</Text>
      </View>
      <View style={{ marginVertical: 50 }}>
            <Text style={{ marginVertical: 10 }}>Like and follow us on:</Text>
            <View style={{ flexDirection: "row", marginBottom: 10, gap: 20 }}>
              <ExternalLink href={socialLinks.whatsapp.link}>
                <Ionicons
                  name="logo-whatsapp"
                  size={30}
                  color={socialLinks.whatsapp.color}
                />
              </ExternalLink>
              <ExternalLink href={socialLinks.facebook.link}>
                <Ionicons
                  name="logo-facebook"
                  size={30}
                  color={socialLinks.facebook.color}
                />
              </ExternalLink>
              <ExternalLink href={socialLinks.twitter.link}>
                <FontAwesome6 name="x-twitter" size={30} color={textColor} />
              </ExternalLink>
              <ExternalLink href={socialLinks.instagram.link}>
                <Ionicons
                  name="logo-instagram"
                  size={30}
                  color={socialLinks.instagram.color}
                />
              </ExternalLink>
              <ExternalLink href={socialLinks.youtube.link}>
                <Ionicons
                  name="logo-youtube"
                  size={30}
                  color={socialLinks.youtube.color}
                />
              </ExternalLink>
            </View>
          </View>
    </View>
  )
}

export default index;