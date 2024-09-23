import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { useColorScheme, View } from "react-native";
import {
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon, MaterialIcons } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { firestoreDB } from "../utils/firebaseConfig";
import { useCategoryStore, useUserStore } from "../state/store";

export default function AboutUser({ user }: { user: DocumentData | null }) {
  const colorScheme = useColorScheme();
  const { user: loggedUser, storeUser } = useUserStore();
  const { categories } = useCategoryStore();

  const [selectedItems, setSelectedItems] = useState(user?.skills || "");

  const [bio, setBio] = useState("");
  const [bioVisible, setBioVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const showBioModal = () => setBioVisible(true);
  const hideBioModal = () => setBioVisible(false);

  const showSkillsModal = () => setSkillsVisible(true);
  const hideSkillsModal = () => setSkillsVisible(false);

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const uniqueSkills: string[] = [...new Set(user?.skills)];

  //update bio

  const updateBio = () => {
    const userRef = doc(firestoreDB, "users", user?._id.toString()!);

    updateDoc(userRef, { bio: bio }).then(async () => {
      const user = await getDoc(userRef);

      storeUser(user.data()!);
      setBioVisible(false);
    });
  };

  //update skills

  const updateSkills = () => {
    selectedItems.shift();
    const userRef = doc(firestoreDB, "users", user?._id.toString()!);

    updateDoc(userRef, { skills: selectedItems }).then(async () => {
      const user = await getDoc(userRef);

      storeUser(user.data()!);
      setSkillsVisible(false);
    });
  };

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
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20 }}>Bio</Text>
          <Portal>
            <Dialog
              visible={bioVisible}
              onDismiss={hideBioModal}
              style={{
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextInput
                label="Bio"
                style={{
                  width: "90%",
                  marginBottom: 20,
                  backgroundColor: "transparent",
                }}
                onChangeText={(text) => setBio(text)}
              />

              <Button onPress={() => updateBio()}>Save</Button>
            </Dialog>
          </Portal>

          {loggedUser._id === user?._id && (
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              onPress={showBioModal}
            />
          )}
        </View>
        <Text>{user?.bio}</Text>
      </View>
      <Divider
        horizontalInset={true}
        theme={{ colors: { primary: "#fff" } }}
        bold={true}
        style={{ marginVertical: 10 }}
      />
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 20 }}>Skills</Text>
          <Portal>
            <Dialog
              visible={skillsVisible}
              onDismiss={hideSkillsModal}
              style={{
                padding: 5,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                  borderColor: borderColor,
                  borderWidth: 1,
                  borderRadius: 10,
                  width: "100%",
                }}
              >
                <SectionedMultiSelect
                  items={categories}
                  IconRenderer={Icon}
                  uniqueKey="name"
                  onSelectedItemsChange={setSelectedItems}
                  selectedItems={selectedItems}
                  selectText="Select Skills"
                  subKey="subcategories"
                  selectChildren={true}
                  colors={{ selectToggleTextColor: iconColor }}
                />
              </View>
              <Button onPress={() => updateSkills()}>Save</Button>
            </Dialog>
          </Portal>

          {loggedUser._id === user?._id && (
            <MaterialCommunityIcons
              name="pencil"
              size={20}
              onPress={showSkillsModal}
            />
          )}
        </View>
        {uniqueSkills.length > 0 && (
          <View>
            {uniqueSkills?.map((skill: string, index: number) => (
              <Text key={index}>{skill}</Text>
            ))}
          </View>
        )}
      </View>
    </View>
  );
}
