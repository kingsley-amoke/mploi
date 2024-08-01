import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ViewImage from '@/src/components/ViewImage'
import { useImageStore } from '@/src/state/store'

const index = () => {

const {image} = useImageStore();

if (!image) return

  return (
    <ViewImage image={image} />
  )
}

export default index

const styles = StyleSheet.create({})