import { View } from 'react-native'
import React, { useEffect } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import { useRouter } from 'expo-router';
import { getLoggedUser } from '../utils/userActions';
import { getUser } from '../utils/data';
import { useUserStore } from '../state/store';

const index = () => {

    const router = useRouter();
    const {storeUser} = useUserStore();

    const checkLocalUser = async () => {
        const loggedUser = await getLoggedUser();
        if (loggedUser) {
          getUser(loggedUser._id).then((user) => {
            storeUser(user);
         
              router.replace("/home")
          });
        } else {
          router.replace("/login");
        }
      };

      useEffect(() => {
        checkLocalUser();
      }, []);

  return (
    <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <ActivityIndicator color='teal' size='small' animating />
    </View>
  )
}

export default index
