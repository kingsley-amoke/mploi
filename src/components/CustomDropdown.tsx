import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

const CustomDropdown = ({
  data,
  placeholder,
  value,
  setValue,
}: {
  placeholder: string;
  data: any;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const [isFocus, setIsFocus] = useState(false);

  return (
    <Dropdown
      style={{
        height: 50,
        width: "28%",
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
        borderColor: isFocus ? "blue" : "grey",
        backgroundColor: "silver",
        opacity: 0.5,
      }}
      data={data}
      labelField="label"
      valueField="value"
      placeholder={!isFocus ? placeholder : "..."}
      placeholderStyle={{ fontSize: 12 }}
      searchPlaceholder="Search..."
      value={value}
      onFocus={() => setIsFocus(true)}
      onBlur={() => setIsFocus(false)}
      onChange={(item) => {
        setValue(item);
        setIsFocus(false);
      }}
    />
  );
};

export default CustomDropdown;
