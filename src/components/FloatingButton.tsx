import { Platform, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { FAB, Portal } from "react-native-paper";
import { useRouter } from "expo-router";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";

const FloatingButton = () => {
  const router = useRouter();

  const [state, setState] = useState({ open: false });

  const onStateChange = ({ open }: { open: boolean }) => setState({ open });

  const { open } = state;

  return (
    <Portal.Host>
      <Portal>
        <FAB.Group
          backdropColor="rgba(0, 0, 0, .8)"
          open={open}
          visible
          icon={open ? "close" : "plus"}
          color="white"
          actions={[
            {
              icon: "cart-plus",
              label: "Add product",
              style: { backgroundColor: Colors.light.primary },
              labelTextColor: "white",
              onPress: () => router.push("products/add"),
            },
            {
              icon: "account-search-outline",
              style: { backgroundColor: Colors.light.primary },
              label: "Request a service",
              labelTextColor: "white",
              onPress: () => router.push("/service"),
            },
          ]}
          onStateChange={onStateChange}
          onPress={() => {
            if (open) {
              // do something if the speed dial is open
            }
          }}
          variant="primary"
        />
      </Portal>
    </Portal.Host>
  );
};

export default FloatingButton;

const styles = StyleSheet.create({});
