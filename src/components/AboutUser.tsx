import { DocumentData } from "firebase/firestore";
import React from "react";
import { useColorScheme, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";

export default function AboutUser({ user }: { user: DocumentData | null }) {
  const  colorScheme  = useColorScheme();

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  return (
    <View
      style={{
        borderColor: borderColor,
        borderWidth: 1,
        borderRadius: 10,
        marginVertical: 20,
        padding: 20,
      }}
    >
      <View>
        <Text style={{ fontSize: 20 }}>Bio</Text>
        <Text>{user?.bio}</Text>
      </View>
      <Divider
        horizontalInset={true}
        theme={{ colors: { primary: "#fff" } }}
        bold={true}
        style={{ marginVertical: 10 }}
      />
      <View>
        <Text style={{ fontSize: 20 }}>Skills</Text>
        {user?.skills.length > 0 && (
          <View>
            {user?.skills?.map((skill: string, index:number) => (
              <Text key={index}>{skill}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
