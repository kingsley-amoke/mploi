import React, { useState } from "react";
import { ScrollView, View, Text as NativeText, useColorScheme } from "react-native";
import {
  Avatar,
  Button,
  List,
  Modal,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useCategoryStore, useUsersStore, useUserStore } from "../state/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { handleRequestService, latitudeDelta, longitudeDelta } from "../utils/data";
import { getDistance } from "geolib";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";


const Categories = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const { categories } = useCategoryStore();
  const { users } = useUsersStore();
  const { user: loggedUser } = useUserStore();

  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState<string | null>(null);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(search.toLowerCase())
  );

  const recommendedUsers = users.filter(
    (user) =>
      user._id !== loggedUser?._id && user.skills.includes(selectedService)
  );

  const textColor = colorScheme === 'light' ? '#000': '#fff'


  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginVertical: 20,
        alignItems: "center",
      }}
    >
      <Text variant="headlineSmall" style={{ fontWeight: "bold" }}>
        What help do you need today?
      </Text>
      <View
        style={{
          marginVertical: 20,
          position: "relative",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TextInput
          mode="outlined"
          placeholder="Search services"
         style={{width:300, paddingLeft:10}}
          autoFocus
          
          onChangeText={(value) => setSearch(value)}
        />
        <MaterialIcons
          name="search"
          size={20}
          color={textColor}
          style={{ position: "absolute", left: 35 }}
        />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredCategories.map((category) => {
          return (
            <View
              style={{
                marginVertical: 2,
                paddingHorizontal: 5,

                width: 370,
              }}
              key={category.name}
            >
              <List.AccordionGroup>
                <List.Accordion
                  title={category.name}
                  id={category.name}
                  titleStyle={{color: textColor}}
                  onLongPress={() => console.log(category.name)}
                  
                >
                  {category.subcategories &&
                    category.subcategories.map(
                      (subcategory: { name: string }, index: number) => (
                        <List.Item
                          title={subcategory.name}
                          titleStyle={{color:textColor}}
                          style={{ marginLeft: 20 }}
                          onPress={() => {
                            setSelectedService(subcategory.name);
                            showModal();
                          }}
                          key={subcategory.name}
                          
                        />
                      )
                    )}
                </List.Accordion>
              </List.AccordionGroup>
            </View>
          );
        })}
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={{
              backgroundColor: "white",
              padding: 20,
              height: "70%",
            }}
          >
            <View style={{ alignItems: "center" }}>
              {recommendedUsers.map((user) => {
                const coordinates = {
                  latitude: parseFloat(user.coordinates.latitude),
                  longitude: parseFloat(user.coordinates.longitude),
                  latitudeDelta: latitudeDelta,
                  longitudeDelta: longitudeDelta,
                };

                const distanceToUser = getDistance(
                  {
                    latitude: loggedUser?.coordinates.latitude,
                    longitude: loggedUser?.coordinates.longitude,
                  },
                  {
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude,
                  }
                );

                const distanceInKm = Math.floor(distanceToUser / 1000);

                const id = `${Date.now()}`;

                const data = {
                  id: id,
                  client: loggedUser,
                  serviceProvider: user,
                }
                return (
                  <View
                    key={user._id}
                    style={{
                      borderWidth: 1,
                      borderColor: "grey",
                      borderRadius: 10,
                      padding: 10,
                      gap: 30,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 20,
                        alignItems: "center",
                      }}
                    >
                      <Avatar.Image source={{ uri: user.image }} size={40} />
                      <View>
                        <NativeText
                          style={{ fontSize: 20, fontWeight: "bold" }}
                        >{`${user.firstName} ${user.lastName}`}</NativeText>
                        <NativeText>{user.skills[1]}</NativeText>
                      </View>
                      <NativeText>{distanceInKm}km</NativeText>
                    </View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 10,
                      }}
                    >
                      <Button
                        mode="outlined"
                        onPress={() => {
                          router.push(`/profile/${user._id}`);
                          hideModal();
                        }}
                      >
                        View Profile
                      </Button>
                      <Button
                        mode="contained"
                        onPress={() => {

                          handleRequestService(data)
                          router.push(`/service/${user._id}?request=${data.id}`);
                          hideModal();
                        }}
                      >
                        Book Service
                      </Button>
                    </View>
                  </View>
                );
              })}
            </View>
          </Modal>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default Categories;
