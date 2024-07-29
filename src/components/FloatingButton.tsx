import { Platform, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { FAB, Portal } from 'react-native-paper'
import { useRouter } from 'expo-router';
import { Colors } from '../constants/Colors';

const FloatingButton = () => {

    const router = useRouter();

    const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal.Host>
        <Portal>
          <FAB.Group
          backdropColor='rgba(0, 0, 0, .8)'
            open={open}
            visible
            icon={open ? "close" : "plus"}
            actions={[
              {
                icon: "account-plus-outline",
                label: "Offer a service",
                onPress: () => console.log("addJob"),
              },
              {
                icon: "account-search-outline",
                label: "Request a service",
                onPress: () => router.push("/service"),
              },
            ]}
            onStateChange={onStateChange}
            onPress={() => {
              if (open) {
                // do something if the speed dial is open
              }
            }}
            style={{ marginBottom: Platform.OS === 'android' ? 10 : -10}}
            variant="primary"
          />
        </Portal>
      </Portal.Host>
  )
}

export default FloatingButton

const styles = StyleSheet.create({})