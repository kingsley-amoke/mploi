import { StyleSheet,  View } from 'react-native'
import React, { Fragment } from 'react'
import { Avatar, Button, Text, } from 'react-native-paper';
import { useUserStore } from '../state/store';
import { latitudeDelta, longitudeDelta } from '../utils/data';
import MapView, { Marker } from 'react-native-maps';
import { DocumentData } from 'firebase/firestore';
import { getDistance } from 'geolib';
import { ref, remove } from 'firebase/database';
import { realtimeDB } from '../utils/firebaseConfig';
import { useRouter } from 'expo-router';

const Map = ({user, requestID}: {user:DocumentData, requestID: string | string[] | undefined}) => {

  const router = useRouter();

    const { user:loggedUser } = useUserStore();
  
    const coordinates = {
      latitude: parseFloat(user.coordinates.latitude),
      longitude: parseFloat(user.coordinates.longitude),
      latitudeDelta: latitudeDelta,
      longitudeDelta: longitudeDelta,
    };

    const distanceToUser = getDistance(
      { latitude: loggedUser?.coordinates.latitude, longitude: loggedUser?.coordinates.longitude },
      {latitude: coordinates.latitude, longitude: coordinates.longitude}
    );
 
    const handleCancelService = async() => {
      const requestRef = ref(realtimeDB, "requests/" + requestID);

      remove(requestRef).then(()=>{
        console.log('Request canceled')
        router.replace('/')
      })
    }
    
  
    return (
      <View style={styles.container}>
        <MapView style={styles.map} region={coordinates}>
          <Marker coordinate={coordinates} draggable />
        </MapView>
        <Fragment>
          <View
            style={{
              alignSelf: "center",
           
              backgroundColor: "#202B35",
              paddingVertical: 20,
              paddingHorizontal: 35,
              margin: 5,
              borderRadius: 10,
              gap:20,
              position: "absolute",
              bottom: 20,
              
            }}
          >
            <View style={{ flexDirection: "row", gap:20 }}>
              <Avatar.Image source={{uri:user.image}} size={50}/>
              <View>
            <Text style={{fontSize:12, fontWeight:'bold', color:'grey'}}>{new Date(Date.now()).toLocaleDateString()}</Text>
            <Text style={{fontSize:18, fontWeight:'bold'}}>{user.firstName} {user.lastName}</Text>
            <Text style={{fontSize:14}}>{user.skills[1]}</Text>
              </View>
              

              
            </View>
                <View>
                  <Text>Request sent, waiting for service provider.</Text>
                </View>
           <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Button mode='outlined' onPress={() => router.push(`profile/${user?._id}`)}>Profile</Button>
            <Button mode='contained' onPress={handleCancelService}>Cancel Service</Button>
           </View>
          </View>
        </Fragment>
      </View>
    );
  }

  export default Map;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: "100%",
      height: "100%",
    },
  });