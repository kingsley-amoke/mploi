import {
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Link, useRouter } from "expo-router";
import { useProductsStore, useUsersStore } from "@/src/state/store";
import {
  ActivityIndicator,
  Button,
  Dialog,
  Divider,
  Portal,
  Text,
} from "react-native-paper";
import {
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { firestoreDB } from "@/src/utils/firebaseConfig";
import { CustomToast } from "@/src/utils/data";
import { Colors } from "@/src/constants/Colors";

const ProductsPage = () => {
  const { users } = useUsersStore();
  const { products, deleteProduct, deletePromoted, addPromoted } =
    useProductsStore();

  const [loading, setLoading] = useState(false);

  const [posting, setPosting] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(1);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const ProductRenderItem = (item: DocumentData) => {
    const seller = users.find((user) => user._id === item.sellerID);

    const date = parseInt(item._id);

    const uploadDate = new Date(date).getTime();

    const today = new Date(Date.now()).getTime();

    const daysAgo = Math.floor((today - uploadDate) / (1000 * 60 * 60 * 24));

    const removeProduct = () => {
      setLoading(true);
      const productRef = doc(firestoreDB, "products", item._id);

      deleteDoc(productRef).then(() => {
        deleteProduct(item);
        setLoading(false);
        CustomToast("Product deleted Successfully");
      });
    };

    const cancelPromo = () => {
      const productRef = doc(firestoreDB, "products", item._id);

      updateDoc(productRef, { promo: "free" }).then(async () => {
        const docSnap = await getDoc(productRef);
        deletePromoted(docSnap.data()!);
        CustomToast("Successful");
      });
    };

    const handleSubmitProduct = () => {
      const promo =
        active === 2
          ? "7 days"
          : active === 3
          ? "30 days"
          : active === 4
          ? "3 months"
          : "free";

      const productRef = doc(firestoreDB, "products", item._id);
      updateDoc(productRef, { promo: promo }).then(async () => {
        const docSnap = await getDoc(productRef);
        addPromoted(docSnap.data()!);
        setPosting(false);
        hideModal();
      });
    };

    const handleProcessPayment = (active: number) => {
      setPosting(true);
      handleSubmitProduct();

      // if (active > parseInt(user?.walletBalance)) {
      //   CustomToast("Please fund your wallet to continue.");
      //   setPosting(false);
      // } else {
      //   decreaseUserBalance(active);
      //   deduct(user, active).then(() => {
      //   });
      // }
    };

    const payment = () => {
      // console.log(item._id);
      switch (active) {
        case 1:
          handleSubmitProduct();

          break;
        case 2:
          handleProcessPayment(600);

          break;
        case 3:
          handleProcessPayment(5000);
          break;
        case 4:
          handleProcessPayment(10000);
          break;
        default:
          handleSubmitProduct();
          break;
      }
    };

    return (
      <>
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
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={{ fontWeight: "bold" }}>
                How would you like to post this product?
              </Text>
              <View style={{ width: 300, marginVertical: 20, gap: 10 }}>
                <Pressable
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: Colors.dark.primary,
                    borderRadius: 10,
                    backgroundColor:
                      active === 1 ? Colors.light.primary : "white",
                  }}
                  onPress={() => setActive(1)}
                >
                  <Text
                    style={{
                      color: active === 1 ? "white" : "black",
                      fontWeight: "bold",
                    }}
                  >
                    No Promo
                  </Text>
                  <Text style={{ color: active === 1 ? "white" : "black" }}>
                    Free
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: Colors.dark.primary,
                    borderRadius: 10,
                    backgroundColor:
                      active === 2 ? Colors.light.primary : "white",
                  }}
                  onPress={() => setActive(2)}
                >
                  <View>
                    <Text
                      style={{
                        color: active === 2 ? "white" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      Promo Lite
                    </Text>
                    <Text
                      style={{
                        color: active === 2 ? "white" : "black",
                      }}
                    >
                      7 days
                    </Text>
                  </View>
                  <Text style={{ color: active === 2 ? "white" : "black" }}>
                    #600
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderWidth: 1,
                    borderColor: Colors.dark.primary,
                    borderRadius: 10,
                    backgroundColor:
                      active === 3 ? Colors.light.primary : "white",
                  }}
                  onPress={() => setActive(3)}
                >
                  <View>
                    <Text
                      style={{
                        color: active === 3 ? "white" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      Top Promo
                    </Text>
                    <Text
                      style={{
                        color: active === 3 ? "white" : "black",
                      }}
                    >
                      30 days
                    </Text>
                  </View>
                  <Text style={{ color: active === 3 ? "white" : "black" }}>
                    #5000
                  </Text>
                </Pressable>
                <Pressable
                  style={{
                    flexDirection: "row",
                    padding: 10,
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    borderWidth: 1,
                    borderColor: Colors.dark.primary,
                    borderRadius: 10,
                    backgroundColor:
                      active === 4 ? Colors.light.primary : "white",
                  }}
                  onPress={() => setActive(4)}
                >
                  <View>
                    <Text
                      style={{
                        color: active === 4 ? "white" : "black",
                        fontWeight: "bold",
                      }}
                    >
                      Boost Premium Promo
                    </Text>
                    <Text
                      style={{
                        color: active === 4 ? "white" : "black",
                      }}
                    >
                      3 months
                    </Text>
                  </View>
                  <Text style={{ color: active === 4 ? "white" : "black" }}>
                    #10000
                  </Text>
                </Pressable>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 20,
                  marginBottom: 10,
                }}
              >
                <Button mode="outlined" onPress={() => setVisible(false)}>
                  Cancel
                </Button>
                <Button mode="contained" onPress={payment}>
                  {posting ? "Please wait..." : "Proceed"}
                </Button>
              </View>
            </View>
          </Dialog>
        </Portal>
        <View style={{ marginVertical: 10 }}>
          <Text style={{ fontSize: 12, fontWeight: "bold" }}>
            Title: {item.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "95%",
            }}
          >
            <View>
              <Text>Date: {daysAgo < 1 ? "Today" : daysAgo + " days ago"}</Text>
              <Text>Price: #{item.price}</Text>
              <Text>Seller: {seller?.lastName}</Text>
              <Text>Promo: {item.promo}</Text>
            </View>
            <View
              style={{ gap: 20, alignItems: "center", flexDirection: "row" }}
            >
              {item.promo && item.promo !== "free" ? (
                <TouchableOpacity onPress={cancelPromo}>
                  <MaterialCommunityIcons
                    name="cancel"
                    color="orange"
                    size={20}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity>
                  <MaterialCommunityIcons
                    name="bookmark-check"
                    color="green"
                    size={20}
                    onPress={showModal}
                  />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={removeProduct}>
                <MaterialCommunityIcons
                  name="trash-can-outline"
                  color="red"
                  size={20}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <Divider bold horizontalInset />
      </>
    );
  };

  return loading || products.length < 1 ? (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
      }}
    >
      {!loading ? (
        <View>
          <Text>No products today...</Text>
        </View>
      ) : (
        <View>
          <ActivityIndicator animating color="teal" size="small" />
          <Text>Deleting...</Text>
        </View>
      )}
    </View>
  ) : (
    <View
      style={{
        margin: 10,
        paddingTop: 10,
        paddingBottom: 40,
      }}
    >
      <FlatList
        data={products}
        style={{ marginBottom: 90 }}
        renderItem={({ item }) => ProductRenderItem(item)}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default ProductsPage;

const styles = StyleSheet.create({});
