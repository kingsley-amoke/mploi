import { useState } from "react";
import { Platform, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import { AnimatedFAB, Text } from "react-native-paper";

const WhatsappFAB = ({ visible, animateFrom, style }) => {
  const [isExtended, setIsExtended] = useState(true);

  const isIOS = Platform.OS === "ios";

  const onScroll = ({ nativeEvent }) => {
    const currentScrollPosition =
      Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

    setIsExtended(currentScrollPosition <= 0);
  };

  const fabStyle = { [animateFrom]: 16 };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView onScroll={onScroll}>
        {[...new Array(100).keys()].map((_, i) => (
          <Text>{i}</Text>
        ))}
      </ScrollView>
      <AnimatedFAB
        icon={"plus"}
        label={"Label"}
        extended={isExtended}
        onPress={() => console.log("Pressed")}
        visible={visible}
        animateFrom={"right"}
        iconMode={"static"}
        style={[styles.fabStyle, style, fabStyle]}
      />
    </SafeAreaView>
  );
};

export default WhatsappFAB;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: "absolute",
  },
});
