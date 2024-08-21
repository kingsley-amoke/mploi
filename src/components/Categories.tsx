import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text as NativeText,
  useColorScheme,
} from "react-native";
import {
  Avatar,
  Button,
  Dialog,
  List,
  Portal,
  Text,
  TextInput,
} from "react-native-paper";
import { useCategoryStore, useUsersStore, useUserStore } from "../state/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  distanceToUser,
  handleRequestService,
} from "../utils/data";
import { DocumentData } from "firebase/firestore";
import { realtimeDB } from "../utils/firebaseConfig";
import { onValue, ref } from "firebase/database";

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
    (user) => {
      
      const distance = distanceToUser(loggedUser, user);

      return user._id !== loggedUser?._id && user.skills.includes(selectedService) && distance <= 0;
    }
  );

  console.log(recommendedUsers)

  const textColor = colorScheme === "light" ? "#000" : "#fff";

  const handleBookService = async (item: {
    id: string;
    client: DocumentData;
    serviceProvider: DocumentData;
  }) => {
    const requestRef = ref(realtimeDB, "requests/");

    onValue(requestRef, (snapshot) => {
      let data = snapshot.val() || [];

      const myData = Object.keys(data).map((key) => {
        return data[key];
      });

      const existingRequest = myData.filter(
        (data) =>
          data.client._id === loggedUser?._id &&
          data.serviceProvider._id === item.serviceProvider._id
      );

      if (existingRequest.length > 0) {
        console.log("There is a pending request");
      } else {
        handleRequestService(item).then(() => {
          router.push(`service/${user._id}?request=${data.id}`);
          hideModal();
        });
      }
    });
  };

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
          style={{ width: 300, paddingLeft: 10 }}
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
                  titleStyle={{ color: textColor }}
                  onLongPress={() => console.log(category.name)}
                >
                  {category.subcategories &&
                    category.subcategories.map(
                      (subcategory: { name: string }, index: number) => (
                        <List.Item
                          title={subcategory.name}
                          titleStyle={{ color: textColor }}
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
          <Dialog
            visible={visible}
            onDismiss={hideModal}
            style={{
              padding: 5,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {recommendedUsers.length > 0 ? 
            (
            <View style={{ alignItems: "center", marginBottom: 20 }}>
              {recommendedUsers.map((user) => {

                const distanceInKm = Math.floor(distanceToUser(loggedUser, user) / 1000);

                const id = `${Date.now()}`;

                const data = {
                  id: id,
                  client: loggedUser,
                  serviceProvider: user,
                };
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
                        onPress={() => handleBookService(data)}
                      >
                        Book Service
                      </Button>
                    </View>
                  </View>
                );
              })}
            </View>
            ) : (
              <View style={{marginBottom:40, justifyContent:'center', alignItems:'center', gap:10}}>
                <MaterialIcons name='info' size={50}/>

              <Text>No service provider around you</Text>
              </View>
            ) }
          </Dialog>
        </Portal>
      </ScrollView>
    </View>
  );
};

export default Categories;
