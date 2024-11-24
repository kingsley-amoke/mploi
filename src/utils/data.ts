import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firestoreDB, realtimeDB, storage } from "./firebaseConfig";
import { ref, serverTimestamp, set } from "firebase/database";
import { getDistance } from "geolib";
import { ToastAndroid } from "react-native";
import { deleteObject, ref as mediaRef } from "firebase/storage";

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
  chat: "https://whatsapp.com/+2347017663503",
  email: " connect@myplugmobile.com",
};

//fetch user

export const getUser = async (id: string) => {
  const docRef = doc(firestoreDB, "users", id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const user = docSnap.data();

    return user;
  } else {
    console.log("No such document!");
    return [];
  }
};

//fetch all users

export const getUsers = async () => {
  const usersRef = collection(firestoreDB, "users");

  const users: DocumentData[] = [];

  const querySnapshot = await getDocs(usersRef);
  querySnapshot.forEach((doc) => {
    users.push(doc.data());
  });
  return users;
};

//sort user by id

export const fetchUserById = (users: DocumentData[], id: string) => {
  const user = users.find((user) => user._id === id);

  return user;
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

//create service requests
export const handleRequestService = async (data: {
  client: DocumentData | null;
  serviceProvider: DocumentData;
  _id: string;
}) => {
  const loggedUser = data.client;

  const user = data.serviceProvider;

  const id = data._id;
  createRequest(loggedUser, user, id);
};

const sendMessage = async (roomId: string, user: DocumentData | null) => {
  const id = `${Date.now()}`;
  const timeStamp = serverTimestamp();

  const data = {
    _id: id,
    roomId: roomId,
    text: "Hi there, I need your services",
    senderId: user?._id,
    timeStamp: timeStamp,
  };
  set(ref(realtimeDB, "requests/" + roomId + "/messages/" + id), data).then(
    (doc) =>
      // setMessage("")
      console.log(doc)
  );
};

const createRequest = async (
  loggedUser: DocumentData | null,
  user: DocumentData,
  id: string
) => {
  const requestRef = ref(realtimeDB, "requests/" + id);

  const data = {
    _id: id,
    client: loggedUser,
    serviceProvider: user,
  };
  set(requestRef, data);
};

//accept service request

export const createChat = async (data: DocumentData) => {
  const chatRef = ref(realtimeDB, "chats/" + data._id);

  set(chatRef, data).then(() => {
    sendMessage(data._id, data.client);
  });
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

//fetch all products

export const getProducts = async () => {
  const productsRef = collection(firestoreDB, "products");

  const querySnapshot = await getDocs(productsRef);
  const products: DocumentData[] = [];
  querySnapshot.forEach((doc) => {
    products.push(doc.data());
  });

  return products;
};

//fetch all reviews

export const getReviews = async () => {
  const reviewsRef = collection(firestoreDB, "reviews");

  const reviews: DocumentData[] = [];

  const querySnapshot = await getDocs(reviewsRef);
  querySnapshot.forEach((doc) => {
    reviews.push(doc.data());
  });
  return reviews;
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

  setDoc(transRef, transaction).then(() => {});
};

//fetch all transactions

export const getTransactions = async () => {
  const transactionsRef = collection(firestoreDB, "transactions");

  const transactions: DocumentData[] = [];

  const querySnapshot = await getDocs(transactionsRef);
  querySnapshot.forEach((doc) => {
    transactions.push(doc.data());
  });
  return transactions;
};

//fetch all cvs

export const getCV = async () => {
  const cvRef = collection(firestoreDB, "resume");

  const cvs: DocumentData[] = [];

  const querySnapshot = await getDocs(cvRef);
  querySnapshot.forEach((doc) => {
    cvs.push(doc.data());
  });
  return cvs;
};

//delete file from storage

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
