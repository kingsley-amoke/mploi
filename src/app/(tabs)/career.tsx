import { useJobsStore } from '@/src/state/store';
import React from 'react'
import { FlatList, View } from 'react-native';
import { JobRenderItem } from '../admin/components/JobRenterItem';


const career = () => {

  const {jobs} = useJobsStore();
  
    return (
      <View style={{flex:1, width:'100%', marginHorizontal:10}}>
       <FlatList data={jobs} renderItem={JobRenderItem} />
      </View>
    )
  }


export default career