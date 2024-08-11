import {
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
} from "firebase/firestore";
import NaijaStates from "naija-state-local-government";
import { firestoreDB, realtimeDB } from "./firebaseConfig";
import { get, onValue, ref, serverTimestamp, set } from "firebase/database";

import Toast from 'react-native-root-toast'

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

//map coords

export const latitudeDelta = 0.0079;
export const longitudeDelta = 0.0079;

//social links 0.0922 .0421

export const socialLinks = {
  instagram: {
    link: "https://www.instagram.com/mploi24?igsh=MWpudmJuZWJrM3BwZA==",
    color: "#F560e4",
  },
  facebook: {
    link: "https://www.facebook.com/profile.php?id=61560893493484&mibextid=ZbWKwL",
    color: "blue",
  },
  whatsapp: {
    link: "https://whatsapp.com/channel/0029VadDAer5a23uDggtCK3d",
    color: "green",
  },
  twitter: {
    link: "https://x.com/MPLOi_Global?t=4Ct7lflX8xb-LtK-lN0emg&s=09",
    color: "#000",
  },
  youtube: {
    link: "https://youtube.com/@mploi_global?si=59YXxkVlqC75-LM3",
    color: "red",
  },
};

//states and lgas

export const getStates = () => {
  const states = NaijaStates.all();

  const data = states.map((state, index: number) => ({
    id: index,
    name: state.state,
  }));

  return data;
};

export const getLGAsByState = (state: string) => {
  const stateLGAs = NaijaStates.lgas(state);

  const data = stateLGAs.lgas.map((lga: string, index: number) => ({
    id: index,
    name: lga,
  }));
  return data;
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
  id: string;
}) => {
  const loggedUser = data.client;

  const user = data.serviceProvider;

  const id = data.id;
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
  set(requestRef, data).then(() => {
    sendMessage(data._id, data.client);
  });
};



//accept service request


export const createChat = async (
  data: DocumentData
) => {
  const requestRef = ref(realtimeDB, "chats/" + data._id);

  set(requestRef, data)
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

  const products: DocumentData[] = [];

  const querySnapshot = await getDocs(productsRef);
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

export const formatPrice = (price: number ) => {
  const formattedPrice = new Intl.NumberFormat('en-UK', { style:'currency', currency: 'NGN', currencySign: 'accounting'}).format(price);
  return formattedPrice;
}

//calculate average rating

export const averageRating = (items: DocumentData[]) => {

  if(items.length <1) return 0

  const totalPrice = items.reduce((accumulator ,item) => {
    return accumulator += item.rating;
  }, 0);

  const average = totalPrice/items.length;

  return average.toFixed(1);
}

 //toast

 export const CustomToast = (message: string, bgColor:string, textColor:string) => {

  return (Toast.show(message, {
    duration: Toast.durations.LONG,
    position: Toast.positions.TOP,
    shadow: true,
    animation: true,
  hideOnPress: true,
  delay: 0,
  backgroundColor: bgColor,
  textColor: textColor,
  textStyle:{
    fontSize: 16,
    fontWeight: 'bold'
  },
  containerStyle: {
    marginTop:70
  }
}))
}