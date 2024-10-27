import {
  ScrollView,
  View,
  TouchableOpacity,
  useColorScheme,
  FlatList,
} from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import React, { useState } from "react";

import { Colors } from "@/src/constants/Colors";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import {
  useCategoryStore,
  useChatStore,
  useImageStore,
  useReviewsStore,
  useUsersStore,
  useUserStore,
} from "../state/store";
import { auth, firestoreDB, storage } from "../utils/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { getBlobFroUri, getUsers } from "../utils/data";
import { LinearGradient } from "expo-linear-gradient";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const Profile = ({ user }: { user: DocumentData | null }) => {
  const router = useRouter();
  const colorScheme = useColorScheme();
  const { updateImage } = useImageStore();
  const { reviews } = useReviewsStore();
  const { storeUser } = useUserStore();
  const { storeUsers } = useUsersStore();
  const { chats } = useChatStore();
  const { categories } = useCategoryStore();

  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState("");

  const [selectedService, setSelectedService] = useState<string[]>(
    user?.skills
  );

  const [bioVisible, setBioVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);

  const [bio, setBio] = useState("");

  const showBioDialog = () => setBioVisible(true);

  const hideBioDialog = () => setBioVisible(false);
  const showSkillsDialog = () => setSkillsVisible(true);

  const hideSkillsDialog = () => setSkillsVisible(false);

  const filteredCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const userReviews = reviews.filter(
    (review) => review.productID === user?._id
  );

  const engagements = chats.filter(
    (c) => c.serviceProvider._id === user?._id || c.client._id === user?._id
  ).length;

  //view image fullscreen

  const handleViewImage = () => {
    updateImage(user?.image);
    router.push(`/image`);
  };

  //upload image

  const handleProfileImageSelection = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      const imageBlob = await getBlobFroUri(result.assets[0].uri);

      if (!imageBlob) return;

      const filename = result.assets[0].uri.split("/").pop();

      const storageRef = ref(storage, `images/${filename}`);
      const userRef = doc(firestoreDB, "users", user?._id.toString()!);
      setLoading(true);

      uploadBytes(storageRef, imageBlob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (url) => {
              setProfileImage(url);
              updateDoc(userRef, { image: url }).then(async () => {
                const user = await getDoc(userRef);

                storeUser(user.data()!);
                setLoading(false);
              });
            }
          );
        })
        .catch((error) => {
          console.log("Upload failed!", error);
          setLoading(false);
        });
    }
  };

  const handleUpdateBio = () => {
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, { bio: bio }).then(() => {
      hideBioDialog();
    });
  };

  const handleUpdateSkills = () => {
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, { skills: selectedService }).then(() => {
      hideSkillsDialog();
      getUsers().then((users) => {
        storeUsers(users);
      });
    });
  };

  // const userSkill = user?.skills?.shift();

  return (
    <View>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: 120,
          paddingHorizontal: 20,
          paddingBottom: 30,
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-end",
        }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          color="white"
          size={30}
          onPress={() => router.back()}
        />
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "800",
            textAlign: "center",
            flex: 1,
            textTransform: "capitalize",
          }}
        >
          Service Provider Profile
        </Text>
        {auth.currentUser?.uid === user?._id && (
          <MaterialCommunityIcons
            name="logout"
            color="white"
            size={30}
            onPress={() => {
              auth.signOut().then(() => router.replace("/"));
            }}
          />
        )}
      </LinearGradient>
      <View style={{ margin: 10 }}>
        <View
          style={{
            width: "100%",
            gap: 6,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => handleViewImage()}
            style={{ position: "relative" }}
          >
            <Avatar.Image
              size={80}
              source={{ uri: loading ? profileImage : user?.image }}
            />
          </TouchableOpacity>
          <Text
            style={{
              textTransform: "capitalize",
              fontWeight: "bold",
              fontSize: 22,
            }}
          >{`${user?.firstName} ${user?.lastName}`}</Text>
          <Text style={{ fontSize: 16, fontWeight: "600" }}>
            {user?.location?.regionName?.region}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Text style={{ fontSize: 18 }}>{user?.bio}</Text>

            <MaterialCommunityIcons
              name="pencil"
              size={20}
              onPress={showBioDialog}
            />
          </View>
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            {user?.skills?.length > 0 && (
              <>
                {/* <Text style={{ fontSize: 20, fontWeight: "bold" }}>
                  {userSkill}
                </Text> */}
                <View
                  style={{
                    flexDirection: "row",
                    gap: 15,
                    flexWrap: "wrap",

                    alignItems: "center",
                    marginVertical: 10,
                    paddingHorizontal: 10,
                  }}
                >
                  {user?.skills?.map((skill: string, index: number) => (
                    <LinearGradient
                      colors={[Colors.primary, Colors.secondary]}
                      start={{ x: 0, y: 0.75 }}
                      end={{ x: 1, y: 0.25 }}
                      style={{
                        borderRadius: 15,
                        paddingHorizontal: 20,

                        paddingVertical: 7,
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      key={index}
                    >
                      <Text style={{ color: "white" }}>{skill}</Text>
                    </LinearGradient>
                  ))}
                  <LinearGradient
                    colors={[Colors.primary, Colors.secondary]}
                    start={{ x: 0, y: 0.75 }}
                    end={{ x: 1, y: 0.25 }}
                    style={{
                      borderRadius: 15,
                      paddingHorizontal: 20,

                      paddingVertical: 7,
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="plus"
                      size={20}
                      color="white"
                      onPress={showSkillsDialog}
                    />
                  </LinearGradient>
                </View>
              </>
            )}
          </View>
          {/* {loggedUser._id === user?._id && (
            <MaterialCommunityIcons
              name="upload"
              size={30}
              style={{
                position: "absolute",
                bottom: -4,
                color: Colors.light.primary,
              }}
              onPress={handleProfileImageSelection}
            />
          )} */}
        </View>
        <Divider horizontalInset style={{ marginVertical: 10 }} />
        <View style={{ marginVertical: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 18,
                fontWeight: "semibold",
                textAlign: "center",
              }}
            >
              Portfolio
            </Text>
            <LinearGradient
              colors={[Colors.primary, Colors.secondary]}
              start={{ x: 0, y: 0.75 }}
              end={{ x: 1, y: 0.25 }}
              style={{
                borderRadius: 15,
                paddingHorizontal: 20,

                paddingVertical: 7,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MaterialCommunityIcons
                name="shuffle-variant"
                size={20}
                color="white"
                onPress={() => router.push("/portfolio")}
              />
            </LinearGradient>
          </View>

          <View>
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={[1, 2, 3, 4, 5]}
              renderItem={({ item, index }) => (
                <View>
                  <View
                    style={{
                      width: 150,
                      height: 150,
                      borderWidth: 1,
                      borderRadius: 4,
                      margin: 5,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text>{index}</Text>
                  </View>
                  <Text style={{ textAlign: "center", marginVertical: 5 }}>
                    {user?.portfolio[0]?.description}
                  </Text>
                </View>
              )}
            />
          </View>
        </View>
      </View>
      <Divider horizontalInset style={{ marginVertical: 10 }} />
      <View style={{ margin: 10 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "semibold",
            textAlign: "center",
          }}
        >
          Testimonials
        </Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          scrollEnabled
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
          renderItem={() => (
            <View style={{ marginVertical: 10 }}>
              <Text style={{ fontSize: 18 }}>Raymond</Text>
              <Text style={{ fontSize: 16 }}>
                Kelvin delivered the resume that got me my current job.
              </Text>
            </View>
          )}
        />
      </View>
      <Portal>
        <Dialog visible={bioVisible} onDismiss={hideBioDialog}>
          <Dialog.Title>Update Bio</Dialog.Title>
          <Dialog.Content>
            <TextInput onChangeText={(value) => setBio(value)} />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleUpdateBio}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <Portal>
        <Dialog visible={skillsVisible} onDismiss={hideSkillsDialog}>
          <Dialog.Title>Update Skills</Dialog.Title>
          <Dialog.Content>
            <SectionedMultiSelect
              items={filteredCategories}
              IconRenderer={MaterialIcons}
              uniqueKey="name"
              subKey="subcategories"
              onSelectedItemsChange={(item: string[]) => {
                setSelectedService(item);
                showSkillsDialog();
              }}
              selectedItems={selectedService}
              expandDropDowns
              selectText="Find your service..."
              searchPlaceholderText="Search services..."
              modalAnimationType="slide"
              colors={{ primary: Colors.light.primary }}
              styles={{
                chipContainer: {
                  borderWidth: 0,
                  backgroundColor: "#ddd",
                  borderRadius: 8,
                },
                chipText: {
                  color: "#222",
                  fontSize: 14.5,
                },
                selectToggle: {
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: "#bbb",
                  padding: 12,
                  marginBottom: 12,
                },
              }}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={handleUpdateSkills}>Done</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

export default Profile;
