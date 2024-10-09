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
import {
  useCategoryStore,
  useLocationStore,
  useRequestStore,
  useUsersStore,
  useUserStore,
} from "../state/store";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import {
  CustomToast,
  distanceToUser,
  handleRequestService,
} from "../utils/data";
import { DocumentData } from "firebase/firestore";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon } from "@expo/vector-icons";
import { Colors } from "../constants/Colors";

const Categories = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const { categories } = useCategoryStore();
  const { users } = useUsersStore();
  const { user: loggedUser } = useUserStore();
  const { requests, addRequest, storeNewRequestId } = useRequestStore();
  const { location } = useLocationStore();

  const [search, setSearch] = useState("");
  const [selectedService, setSelectedService] = useState<string[]>([]);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const filteredCategories = categories
    .filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    )
    .sort(function (a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

  const recommendedUsers = users.filter((user) => {
    return (
      user._id !== loggedUser?._id &&
      user.skills &&
      user.skills.includes(selectedService[0])
    );
  });

  const textColor = colorScheme === "light" ? "#000" : "#fff";

  const handleBookService = (item: {
    _id: string;
    client: DocumentData;
    serviceProvider: DocumentData;
  }) => {
    const existingRequest = requests.filter(
      (data) =>
        data.client._id === loggedUser?._id &&
        data.serviceProvider._id === item.serviceProvider._id
    );

    if (existingRequest.length > 0) {
      CustomToast("There is a pending request");
    } else {
      handleRequestService(item).then(() => {
        router.push(`service/${item.serviceProvider._id}`);
        CustomToast("Service booked Successfully");
        addRequest(item);
        storeNewRequestId(item._id);
        hideModal();
      });
    }
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
      {/* <View
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
      </View> */}

      <View style={{ width: "100%", padding: 20 }}>
        {/* {filteredCategories.map((category) => {
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
                  onPress={() => console.log(category.name)}
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
        })} */}
        <SectionedMultiSelect
          items={filteredCategories}
          IconRenderer={Icon}
          uniqueKey="name"
          subKey="subcategories"
          onSelectedItemsChange={(item: string[]) => {
            setSelectedService(item);
            showModal();
          }}
          selectedItems={selectedService}
          expandDropDowns
          single
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
            {recommendedUsers.length > 0 ? (
              <View style={{ alignItems: "center", marginBottom: 20, gap: 30 }}>
                {recommendedUsers.map((user) => {
                  const distanceInKm = Math.floor(
                    distanceToUser(location[0].coordinates, user) / 1000
                  );

                  const distanceInMeters = Math.floor(
                    distanceToUser(location[0].coordinates, user)
                  );

                  const serviceProviderSkill = user.skills.find(
                    (skill: string) => skill === selectedService[0]
                  );

                  const serviceProviderName =
                    user.firstName + " " + user.lastName[0];

                  const id = `${Date.now()}`;

                  const data = {
                    _id: id,
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
                        <Avatar.Image source={{ uri: user.image }} size={30} />
                        <View>
                          <NativeText
                            style={{ fontSize: 16, fontWeight: "bold" }}
                          >
                            {serviceProviderName}
                          </NativeText>
                          <NativeText style={{ fontSize: 12 }}>
                            {serviceProviderSkill}
                          </NativeText>
                        </View>
                        <View>
                          {distanceInMeters > 1000 ? (
                            <NativeText
                              style={{ color: "red", fontWeight: "bold" }}
                            >
                              {distanceInKm}km
                            </NativeText>
                          ) : (
                            <NativeText
                              style={{ color: "green", fontWeight: "bold" }}
                            >
                              {distanceInMeters}m
                            </NativeText>
                          )}
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-evenly",
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
                          View
                        </Button>
                        <Button
                          mode="contained"
                          onPress={() => handleBookService(data)}
                        >
                          Book
                        </Button>
                      </View>
                    </View>
                  );
                })}
              </View>
            ) : (
              <View
                style={{
                  marginBottom: 40,
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 10,
                }}
              >
                <MaterialIcons name="info" size={50} />

                <Text>No service provider around you</Text>
              </View>
            )}
          </Dialog>
        </Portal>
      </View>
    </View>
  );
};

export default Categories;
