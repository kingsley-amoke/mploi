import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  PermissionsAndroid,
  KeyboardAvoidingView,
  useColorScheme,
} from "react-native";
import { Button, Text, TextInput } from "react-native-paper";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import { MaterialIcons as Icon, MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { fetchAllBanks, validateAccountNumber } from "@/src/utils/paystack";
import { serviceTypes } from "@/src/utils/types";
import { useCategoryStore, useUserStore } from "@/src/state/store";
import useTheme from "../hooks/useTheme";
import { Colors } from "../constants/Colors";
import {
  getBlobFroUri,
  getLGAsByState,
  getStates,
} from "../utils/data";
import { firestoreDB, storage } from "../utils/firebaseConfig";
import { ref } from "firebase/storage";
import { getDownloadURL, uploadBytes } from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { getLoggedUser } from "../utils/userActions";

const EditProfile = () => {
  const router = useRouter();

  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "dark" ? "white" : "black";

  const borderColor =
    colorScheme === "dark"
      ? Colors.dark.onSurfaceDisabled
      : Colors.light.onSurfaceDisabled;

  const { user, storeUser } = useUserStore();
  const {categories} = useCategoryStore();

  const [selectedItems, setSelectedItems] = useState([""]);
  const [items, setItems] = useState<serviceTypes[]>();
  const [loading, setLoading] = useState(false);

  const [profileImage, setProfileImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("Nigeria");
  const [state, setState] = useState(["Cross River"]);
  const [lga, setLga] = useState([""]);
  const [bio, setBio] = useState("");
  const [nin, setNin] = useState("");
  const [address, setAddress] = useState("");
  const [userBankName, setUserBankName] = useState([""]);
  const [userAccountName, setUserAccountName] = useState("");
  const [userAccountNumber, setUserAccountNumber] = useState("");

  const [banks, setBanks] = useState();


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

      uploadBytes(storageRef, imageBlob)
        .then((snapshot) => {
          getDownloadURL(ref(storage, snapshot.metadata.fullPath)).then(
            (url) => {
              setProfileImage(url);
            }
          );
        })
        .catch((error) => {
          console.log("Upload failed!", error);
          setLoading(false);
        });
    }
  };

  const validateUserBank = async () => {
    if (userBankName[0] === " " || userAccountNumber.length !== 10) {
      return;
    }
    const res = await validateAccountNumber(userAccountNumber, userBankName[0]);

    if (res.code) {
      setUserAccountName("Invalid Account Number");
      return;
    }

    setUserAccountName(res.data.account_name);
  };

  const updateProfile = async () => {
    const updatedSkills = [...selectedItems];

    user?.skills?.map((skill: string) => updatedSkills.push(skill));

    const location = {
      country: country,
      state: state[0],
      lga: lga[0],
    };

    const bankDetails = {
      bank: userBankName[0],
      accountName: userAccountName,
      accountNumber: userAccountNumber,
    };

    setLoading(true);
    const loggedUser = await getLoggedUser();

    const userRef = doc(firestoreDB, "users", loggedUser._id);

    const data = {
      firstName: firstName !== "" ? firstName : user?.firstName,
      lastName: lastName !== "" ? lastName : user?.lastName,
      phone: phone !== "" ? phone : user?.phone,
      image: profileImage !== "" ? profileImage : user?.image,
      bio: bio !== "" ? bio : user?.bio,
      address: address !== "" ? address : user?.address,
      nin: nin !== "" ? nin : user?.nin,
      location: location.lga !== "" ? location : user?.location,
      bankDetails:
        bankDetails.accountName !== "" ? bankDetails : user?.bankDetails,
      skills: updatedSkills,
    };


    updateDoc(userRef, data).then(async () => {
      const user = await getDoc(userRef);

      storeUser(user.data()!);
      router.push("/profile");
      setLoading(false);
    });

    setLoading(false);

    // const data = {

    //   guarantors: guarantors.length > 1 ? guarantors : user?.guarantors,

    // };

  };
  
  const allStates = getStates();

  const lgas = getLGAsByState(state[0]);

  useLayoutEffect(() => {
    async function getBanks() {
      const res = await fetchAllBanks();
      setBanks(res);
    }

    getBanks();
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1, marginBottom: 10 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          paddingHorizontal: 22,
          
        }}
      >
        <ScrollView
          style={{ marginBottom: 10 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              alignItems: "center",
              
            }}
          >
            <TouchableOpacity onPress={handleProfileImageSelection}>
              <Image
                source={{ uri: profileImage ? profileImage : user?.image }}
                style={{
                  height: 170,
                  width: 170,
                  borderRadius: 85,
                  borderWidth: 2,
                  borderColor: borderColor,
                }}
              />

              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  right: 10,
                  zIndex: 9999,
                }}
              >
                <MaterialIcons
                  name="photo-camera"
                  size={32}
                  color={iconColor}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text>Please update your profile to continue!</Text>
          </View>
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Personal Details
          </Text>
          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.firstName !== "" ? user?.firstName : "First Name"}
                placeholder={user?.firstName}
                onChangeText={(value) => setFirstName(value)}
                editable={true}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.lastName !== "" ? user?.lastName : "Last Name"}
                placeholder={user?.lastName}
                onChangeText={(value) => setLastName(value)}
                editable={true}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label="Bio"
                multiline
                numberOfLines={5}
                textAlignVertical="top"
                onChangeText={(value) => setBio(value)}
                editable={true}
              />
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.phone !== "" ? user?.phone : "Phone Number"}
                placeholder={user?.phone}
                onChangeText={(value) => setPhone(value)}
                editable={true}
              />
            </View>
          </View>

          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Contact Details
          </Text>
          <View>
            <View>
              <TextInput
                mode="outlined"
                label={user?.country !== "" ? user?.country : "Country"}
                placeholder="Nigeria"
                editable={false}
              />
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                State
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: borderColor,
                }}
              >
                <SectionedMultiSelect
                  items={allStates}
                  IconRenderer={Icon}
                  selectText="Select State"
                  defaultValue="Cross River"
                  uniqueKey="name"
                  searchPlaceholderText="Search State"
                  showDropDowns={true}
                  onSelectedItemsChange={setState}
                  selectedItems={state}
                  single
                  colors={{ selectToggleTextColor: iconColor }}
                />
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Local Government Area
              </Text>

              <View
                style={{
                  borderWidth: 1,
                  borderRadius: 8,
                  borderColor: borderColor,
                }}
              >
                <SectionedMultiSelect
                  items={lgas}
                  IconRenderer={Icon}
                  selectText="Select LGA"
                  defaultValue="Calabar Municipal"
                  uniqueKey="name"
                  searchPlaceholderText="Search LGA"
                  showDropDowns={true}
                  onSelectedItemsChange={setLga}
                  selectedItems={lga}
                  single
                  colors={{ selectToggleTextColor: iconColor }}
                />
              </View>
            </View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.address !== "" ? user?.address : "Address"}
                placeholder={user?.address}
                onChangeText={(value) => setAddress(value)}
                editable={true}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
              }}
            >
              <TextInput
                mode="outlined"
                label={user?.nin !== "" ? user?.nin : "NIN"}
                placeholder={user?.nin}
                onChangeText={(value) => setNin(value)}
                editable={true}
              />
            </View>
          </View>
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Others
          </Text>
          <View>
            <View
              style={{
                flexDirection: "column",
                marginBottom: 6,
                borderColor: borderColor,
                borderWidth: 1,
                borderRadius: 10,
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
          </View>
          <Text
            style={{ marginVertical: 10, fontSize: 25, fontWeight: "bold" }}
          >
            Bank Details
          </Text>
          <View>
            <View>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 400,
                  marginVertical: 8,
                }}
              >
                Bank Name
              </Text>
              <View
                style={{
                  flexDirection: "column",
                  marginBottom: 6,
                  borderColor: borderColor,
                  borderWidth: 1,
                  borderRadius: 10,
                }}
              >
                <SectionedMultiSelect
                  items={banks}
                  IconRenderer={Icon}
                  uniqueKey="code"
                  onSelectedItemsChange={setUserBankName}
                  selectedItems={userBankName}
                  selectText="Select Bank"
                  single
                  searchPlaceholderText="Search Bank"
                  colors={{ selectToggleTextColor: iconColor }}
                />
              </View>
            </View>
            <View>
              <TextInput
                mode="outlined"
                label={
                  userAccountName !== "" ? userAccountName : "Account Name"
                }
                editable={false}
              />
            </View>
            <View style={{ marginVertical: 10 }}>
              <TextInput
                mode="outlined"
                label={
                  user?.bankDetails.accountNumber !== ""
                    ? user?.bankDetails.accountNumber
                    : "Account Number"
                }
                placeholder="Enter your account number"
                onChangeText={(text) => {
                  setUserAccountNumber(text);
                }}
                onBlur={() => validateUserBank()}
                style={{
                  width: "100%",
                }}
              />
            </View>
          </View>
         
          <Button mode="contained" style={{marginTop:10}} onPress={() => updateProfile()}>{!loading ? "Save Change" : "Saving"}</Button>

          {/* {renderDatePicker()} */}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default EditProfile;
