import {  TouchableOpacity, StyleSheet } from "react-native";
import {Text} from "react-native-paper";
import React from "react";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";

const Button = (props) => {

const {colorScheme} = useTheme();

  const filledBgColor = props.color;
  const outlinedColor = colorScheme === 'dark' ? Colors.dark.onSurfaceDisabled : Colors.light.onSurfaceDisabled
  const bgColor = props.filled ? filledBgColor : outlinedColor;

  return (
    <TouchableOpacity
      style={{
        ...styles.button,
        ...{ backgroundColor: bgColor },
        ...props.style,
      }}
      onPress={props.onPress}
    >
      <Text style={{ fontSize: 18, ...props.titleStyle }}>
        {props.title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingBottom: 16,
    paddingVertical: 10,
    borderWidth: 2,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default Button;
