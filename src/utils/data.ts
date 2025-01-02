import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { auth, firestoreDB, realtimeDB, storage } from "./firebaseConfig";
import { ref, serverTimestamp, set } from "firebase/database";
import { getDistance } from "geolib";
import { ToastAndroid } from "react-native";
import { deleteObject, ref as mediaRef } from "firebase/storage";
import moment from "moment";

//get image blog
export const getBlobFroUri = async (uri: string) => {
  const blob: Blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function (e) {
      reject(new TypeError("Network request failed"));
    };
    xhr.responseType = "blob";
    xhr.open("GET", uri, true);
    xhr.send(null);
  });

  return blob;
};

export const noAvatar =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
export const shopAvatar =
  "https://as1.ftcdn.net/v2/jpg/02/22/69/78/1000_F_222697826_A8NjOe4hGgZ2UkQWBetmqVwpUhJJbWpc.jpg";

//map coords
export const latitudeDelta = 0.0079;
export const longitudeDelta = 0.0079;

//social links 0.0922 .0421

export const socialLinks = {
  instagram: {
    link: "https://www.instagram.com/myplug_app?igsh=amxidmd5aHM3anls",
    color: "#F560e4",
  },
  facebook: {
    link: "https://www.facebook.com/profile.php?id=61564181987191&mibextid=ZbWKwL",
    color: "blue",
  },
  whatsapp: {
    link: "https://whatsapp.com/channel/0029Valf08M5EjxxzAWPwk3D",
    color: "green",
  },
  twitter: {
    link: "https://x.com/Myplug_APP?t=XGgoVqkW--BZIVb3Fg-U4Q&s=09",
    color: "#000",
  },
  youtube: {
    link: "https://youtube.com/@myplugapp?si=MC3GGLprCBuh6Pms",
    color: "red",
  },
  chat: "https://wa.me/2347017663503",
  email: " connect@myplugmobile.com",
  phone: "07017663503",
  address: "81 Agwangede Extension, Kuje, Abuja ",
};

export const getServices = async () => {
  const serviceRef = collection(firestoreDB, "services");

  const services: DocumentData[] = [];

  const querySnapshot = await getDocs(serviceRef);
  querySnapshot.forEach((doc) => {
    services.push(doc.data());
  });
  return services;
};

export const getJobs = async () => {
  const serviceRef = collection(firestoreDB, "jobs");

  const jobs: DocumentData[] = [];

  const querySnapshot = await getDocs(serviceRef);
  querySnapshot.forEach((doc) => {
    jobs.push(doc.data());
  });
  return jobs;
};

export const sendMessage = async (roomId: string, message: string) => {
  if (message == "") return;
  const id = `${Date.now()}`;

  const data = {
    _id: id,
    roomId: roomId,
    text: message,
    senderId: auth.currentUser?.uid,
    timeStamp: moment().utc().toISOString(),
  };

  addDoc(collection(firestoreDB, "messages"), data).then(() => {
    updateDoc(doc(firestoreDB, "chats", roomId), {
      lastMessage: message,
      timeStamp: moment().toISOString(),
    });
  });
};

export const createChat = (clientId: string, providerId: string) => {
  const id = `${Date.now()}`;
  const chatRef = doc(firestoreDB, "chats", id);

  const data = {
    _id: id,
    clientId: clientId,
    serviceProviderId: providerId,
    lastMessage: "Hi there, I need your services",
    timeStamp: moment().utc().toISOString(),
    isRead: false,
  };

  setDoc(chatRef, data);
};

//fetch all shops

export const getShops = async () => {
  const shopRef = collection(firestoreDB, "shop");

  const shops: DocumentData[] = [];

  const querySnapshot = await getDocs(shopRef);
  querySnapshot.forEach((doc) => {
    shops.push(doc.data());
  });
  return shops;
};

//format price

export const formatPrice = (price: number) => {
  const formattedPrice = new Intl.NumberFormat("en-UK", {
    style: "currency",
    currency: "NGN",
    currencySign: "accounting",
  }).format(price);
  return formattedPrice;
};

//calculate average rating

export const averageRating = (items: DocumentData[]) => {
  if (items.length < 1) return 0;

  const totalPrice = items.reduce((accumulator, item) => {
    return (accumulator += item.rating);
  }, 0);

  const average = totalPrice / items.length;

  return average.toFixed(1);
};

//toast

export const CustomToast = (message: string) => {
  return ToastAndroid.showWithGravity(
    message,
    ToastAndroid.LONG,
    ToastAndroid.TOP
  );
};

export const recharge = (id: string, rechargeAmount: string) => {
  const userRef = doc(firestoreDB, "users", id?.toString()!);

  updateDoc(userRef, {
    walletBalance: rechargeAmount,
  });
};

export const deduct = async (user: DocumentData, charge: number) => {
  const amount = (parseFloat(user.walletBalance) - charge).toString();

  const userRef = doc(firestoreDB, "users", user._id?.toString()!);

  updateDoc(userRef, {
    walletBalance: amount,
  });
};

//upload transactions to firebase
export const setTransaction = (transaction: DocumentData) => {
  const transRef = doc(firestoreDB, "transactions", transaction._id);

  setDoc(transRef, transaction);
};

//delete image from storage

export const deleteFromStorage = (fileUrl: string) => {
  const filename = extractImagePath(fileUrl);

  const storageRef = mediaRef(storage, `images/${filename}`);
  deleteObject(storageRef);
};

//distance between user in km

export const distanceToUser = (
  location: { latitude: number; longitude: number },
  user: DocumentData
) => {
  const serviceProviderCoordinates = {
    latitude: user.coordinates.latitude,
    longitude: user.coordinates.longitude,
  };

  const distance = getDistance(location, serviceProviderCoordinates);

  // console.log(distance);

  return distance;
};

export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams();
  params.set(name, value);

  return params.toString();
};

export const exitApp = () => {
  throw {};
};

export const extractImagePath = (url: string): string => {
  return url.split("/").pop()?.split("?")[0].split("%").pop()?.slice(2)!;
};

export const getImageUrl = (filename: string, folder: string): string => {
  return `https://firebasestorage.googleapis.com/v0/b/mploi247.appspot.com/o/${folder}/${filename}?alt=media&token=18367db0-dd5a-4d14-bb89-844f2c67ff11`;
};

export const findArrayItem = (array: DocumentData[], search: string) => {
  const item = array.find((i) => i.toLowerCase().includes(search));

  return item;
};

export const formatCompleteDateWithMoment = (date) => {
  const formattedDate = `${date.format("dddd")} ${date.format(
    "d"
  )}th ${date.format("MMM")} ${date.format("YYYY")}`;
  return formattedDate;
};

export const groupDataByDate = (data) => {
  const grouped = data.reduce((acc, item) => {
    const existing = acc?.find(
      (obj) => obj.day == moment(item._id, "x").format("d")
    );
    if (existing) {
      existing.data.push(item);
    } else {
      const itemDate = moment(item._id, "x");

      const newItem = {
        title: formatCompleteDateWithMoment(itemDate),
        day: itemDate.format("d"),
        data: [item],
      };
      acc?.push(newItem);
    }
    return acc;
  }, []);

  return grouped;
};
