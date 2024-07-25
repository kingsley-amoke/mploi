import { getApp, getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {initializeFirestore} from "firebase/firestore";
import {getDatabase} from "firebase/database";
import {getStorage} from "firebase/storage";
import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const apiKey = process.env.EXPO_PUBLIC_API_KEY as string
const projectId  = process.env.EXPO_PUBLIC_PROJECT_ID as string
const storageBucket = process.env.EXPO_PUBLIC_STORAGE_BUCKET as string
const messagingSenderId = process.env.EXPO_PUBLIC_MESSAGING_SENDER_ID as string
const appId = process.env.EXPO_PUBLIC_APP_ID as string
const measurementId = process.env.EXPO_PUBLIC_MEASUREMENT_ID as string
const authDomain = process.env.EXPO_PUBLIC_AUTH_DOMAIN as string
const rtDB = process.env.EXPO_PUBLIC_FIREBASE_RT_DB as string



const firebaseConfig = {
    apiKey: apiKey,

  authDomain: authDomain,

  projectId: projectId,

  storageBucket: storageBucket,

  messagingSenderId: messagingSenderId,

  appId: appId,

  measurementId: measurementId,

  databaseURL: rtDB
}




const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});

const auth = getAuth(app);
const firestoreDB = initializeFirestore(app, {experimentalAutoDetectLongPolling: true});

const realtimeDB = getDatabase(app)

const storage = getStorage(app)

export {app, auth, firestoreDB, realtimeDB, storage}

