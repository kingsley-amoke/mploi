import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SegmentedButtons } from 'react-native-paper'
import UsersPage from './components/UsersPage'
import CareerPage from './components/CareerPage'
import ProductsPage from './components/ProductsPage'
import { useProductsStore } from '@/src/state/store'

const index = () => {

  const {products} = useProductsStore();

    const [value, setValue] = useState("users");

  return (
    <SafeAreaView style={styles.container}>
        <SegmentedButtons
        value={value}
        onValueChange={setValue}
        buttons={[
          {
            value: "users",
            label: "All Users",
          },
          {
            value: "career",
            label: "Career Jobs",
          },
          {
            value: 'shop',
            label: 'Shop Products',
          }
        ]}
      />
         {value === "users" ? (
        <View>
          
            <View
              style={{
                width: "100%",
                marginVertical: 20,
                flexDirection: "row",
                marginHorizontal: "auto",
                flexWrap: "wrap",
                gap: 10,
              }}
            >
                <UsersPage />
              </View>
        </View>
      ) : value === 'career' ? (
        <CareerPage />
      ) : (
        <ProductsPage products={products}/>
      )
    }
    </SafeAreaView>
  )
}

export default index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
      },
})