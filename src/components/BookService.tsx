import { StyleSheet,  View } from 'react-native'
import React, { useState } from 'react'
import { DocumentData } from 'firebase/firestore'
import { Button, Text, } from 'react-native-paper'
import { Colors } from '../constants/Colors'
import useTheme from '../hooks/useTheme'
import { useChatStore, useUserStore } from '../state/store'
import { realtimeDB } from '../utils/firebaseConfig'
import { ref, set } from 'firebase/database'
import { useRouter } from 'expo-router'

const BookService = ({user}: {user: DocumentData | null}) => {

    const router = useRouter();

    const {user:loggedUser} = useUserStore();
    const { chats } = useChatStore();

    const { colorScheme } = useTheme();

    const [applying, setApplying] = useState(false);
  
    const borderColor =
      colorScheme === "dark"
        ? Colors.dark.onSurfaceDisabled
        : Colors.light.onSurfaceDisabled;

    const bgColor =
    colorScheme === "dark"
      ? Colors.dark.primaryContainer
      : Colors.light.primaryContainer;

      const createRoom = async (loggedUser: DocumentData | null, user: DocumentData) => {

          
          const id = `${Date.now()}`;

          const chatsRef = ref(realtimeDB, "chats/" + id)
    
        const data = {
          _id: id,
         client: loggedUser,
         serviceProvider: user
        };
        set(chatsRef, data).then(() => {

          // router.push(`/rooms/${data._id}`)
          console.log('room created')
        }

        );
      };


      const handleBookService = async() => {
        setApplying(true);

        const existingRoom = [];

        
          // const existingRoom = chats.filter(
          //   (doc) => doc.client._id === loggedUser?._id || doc.serviceProvider._id === user._id
          // );
    
          if (existingRoom.length > 0) {
            console.log('room not empty')
            // router.push(`/rooms/${existingRoom[0]._id}`);
            setApplying(false);
          } else {
            createRoom(loggedUser, user!);
            setApplying(false);
          }
    
          setApplying(false);
        
      }
  return  loggedUser?._id === user?._id && !loggedUser?.isAdmin ? (

        <Button
        style={{
        borderColor: borderColor,
        borderWidth: 1,
      paddingVertical: 10,
      marginVertical: 10,
      marginBottom: 40,
      backgroundColor: bgColor,
      
    }}
    onPress={() => router.push('/admin')}
    >
      
    <Text variant="labelLarge">Admin Dashboard</Text>
  
</Button>
) :(

  <Button
  style={{
          borderColor: borderColor,
          borderWidth: 1,
          paddingVertical: 10,
          marginVertical: 10,
          marginBottom: 40,
          backgroundColor: bgColor,

        }}
        onPress={handleBookService}
        >{!applying ? (
          
          <Text variant="labelLarge">Book Service</Text>
        ) : (
          <Text variant="labelLarge">Please Wait</Text>
      )

    }
    </Button>
  )
    }

export default BookService
