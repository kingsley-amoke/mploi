import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper'
import { FlatList } from 'react-native'
import { JobRenderItem } from './JobRenterItem'
import { useRouter } from 'expo-router'
import { useJobsStore } from '@/src/state/store'

const CareerPage = () => {

  const router = useRouter();

const {jobs} = useJobsStore();

  return (
    <View style={{flex:1, width:'100%', marginHorizontal:10}}>
     <View style={{alignItems:'flex-end', justifyContent:'flex-end', width:'100%',}}>
      <Button mode='outlined' icon='plus' style={{marginVertical:20,}} onPress={() => router.push('/admin/jobs/add')}>Add Job</Button>
     </View>
     <FlatList data={jobs} renderItem={JobRenderItem} />
    </View>
  )
}

export default CareerPage

const styles = StyleSheet.create({})