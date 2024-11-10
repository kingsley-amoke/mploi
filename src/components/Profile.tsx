import {
  View,
  TouchableOpacity,
  useColorScheme,
  FlatList,
  ScrollView,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Divider,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import React, { useState } from "react";

import { Colors } from "@/src/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { doc, DocumentData, getDoc, updateDoc } from "firebase/firestore";
import { useRouter } from "expo-router";
import {
  useCategoryStore,
  useImageStore,
  useUsersStore,
  useUserStore,
} from "../state/store";
import { auth, firestoreDB, storage } from "../utils/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { getBlobFroUri, getUsers, shopAvatar } from "../utils/data";
import { LinearGradient } from "expo-linear-gradient";
import SectionedMultiSelect from "react-native-sectioned-multi-select";

const Profile = ({ user }: { user: DocumentData | null }) => {
  const router = useRouter();

  const { updateImage } = useImageStore();
  const { storeUser } = useUserStore();
  const { storeUsers } = useUsersStore();
  const { categories } = useCategoryStore();

  const [loading, setLoading] = useState(false);

  const [selectedService, setSelectedService] = useState<string[]>(
    user?.skills
  );

  const [bioVisible, setBioVisible] = useState(false);
  const [skillsVisible, setSkillsVisible] = useState(false);
  const [testimonialVisible, setTestimonialVisible] = useState(false);
  const [name, setName] = useState("");

  const [bio, setBio] = useState("");
  const [testimonial, setTestimonial] = useState("");

  const showBioDialog = () => setBioVisible(true);

  const hideBioDialog = () => setBioVisible(false);
  const showSkillsDialog = () => setSkillsVisible(true);

  const hideSkillsDialog = () => setSkillsVisible(false);
  const showTestimonialDialog = () => setTestimonialVisible(true);

  const hideTestimonialDialog = () => setTestimonialVisible(false);

  const filteredCategories = categories.sort(function (a, b) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });

  // const userReviews = reviews.filter(
  //   (review) => review.productID === user?._id
  // );

  // const engagements = chats.filter(
  //   (c) => c.serviceProvider._id === user?._id || c.client._id === user?._id
  // ).length;

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
              // setProfileImage(url);
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
    setLoading(true);
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, { bio: bio });
    hideBioDialog();
    setLoading(false);
  };

  const handleUpdateSkills = () => {
    setLoading(true);
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, { skills: selectedService }).catch(() => {
      getUsers().then((users) => {
        storeUsers(users);
      });
    });
    hideSkillsDialog();
    setLoading(false);
  };

  const handleUpdateTestimonial = () => {
    const newTestimonial = {
      name,
      testimonial,
    };
    setLoading(true);
    const userRef = doc(firestoreDB, "users", auth.currentUser?.uid!);
    updateDoc(userRef, {
      testimonials: [...user?.testimonials, newTestimonial],
    });
    hideTestimonialDialog();
    setLoading(false);
  };

  // const userSkill = user?.skills?.shift();

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={[Colors.primary, Colors.secondary]}
        start={{ x: 0, y: 0.75 }}
        end={{ x: 1, y: 0.25 }}
        style={{
          height: "12%",
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
      <ScrollView>
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
              <Avatar.Image size={80} source={{ uri: user?.image }} />
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
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
            >
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
                  fontSize: 22,
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
                data={user?.portfolio}
                keyExtractor={(item) => item.description}
                renderItem={({ item }) => (
                  <View
                    style={{ width: 160, marginRight: 10 }}
                    key={item.description}
                  >
                    <View
                      style={{
                        width: 150,
                        height: 150,
                        borderWidth: 1,
                        borderRadius: 4,
                        margin: 5,
                      }}
                    >
                      <Card>
                        <Card.Cover
                          source={{ uri: item.image }}
                          style={{ height: "100%" }}
                        />
                      </Card>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        flexShrink: 1,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text style={{ flexShrink: 1, textAlign: "center" }}>
                        {item.description}
                      </Text>
                    </View>
                  </View>
                )}
              />
            </View>
          </View>
        </View>
        <Divider horizontalInset style={{ marginVertical: 10 }} />
        <View style={{ margin: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingHorizontal: 10,
            }}
          >
            <Text
              style={{
                fontSize: 22,
                fontWeight: "semibold",
                textAlign: "center",
              }}
            >
              Testimonials
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
                name="plus"
                size={20}
                color="white"
                onPress={showTestimonialDialog}
              />
            </LinearGradient>
          </View>

          <FlatList
            showsVerticalScrollIndicator={false}
            scrollEnabled={false}
            data={user?.testimonials?.slice(0, 10)}
            keyExtractor={(item) => item.testimonial}
            renderItem={({ item, index }) => (
              <View style={{ marginVertical: 10 }} key={index}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {item.name}
                </Text>
                <Text style={{ fontSize: 16 }}>{item.testimonial}</Text>
              </View>
            )}
            contentContainerStyle={{
              flexGrow: 1,
            }}
          />
        </View>
        <Portal>
          <Dialog visible={bioVisible} onDismiss={hideBioDialog}>
            <Dialog.Title>Update Bio</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                onChangeText={(value) => setBio(value)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleUpdateBio}>
                {loading ? "Please Wait..." : "Done"}
              </Button>
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
              <Button onPress={handleUpdateSkills}>
                {loading ? "Please Wait..." : "Done"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Portal>
          <Dialog
            visible={testimonialVisible}
            onDismiss={hideTestimonialDialog}
          >
            <Dialog.Title>Add Testimmonial</Dialog.Title>
            <Dialog.Content style={{ gap: 25 }}>
              <TextInput
                label="Name"
                mode="outlined"
                onChangeText={(value) => setName(value)}
              />
              <TextInput
                label="Your Testimonial"
                multiline
                mode="outlined"
                onChangeText={(value) => setTestimonial(value)}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={handleUpdateTestimonial}>
                {loading ? "Please Wait..." : "Done"}
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default Profile;
