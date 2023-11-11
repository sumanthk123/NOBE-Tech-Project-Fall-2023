// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';


const firebaseConfig = {
  apiKey: "AIzaSyBgUG2If8SkTTH5eMcYzX1wAU-dxlRowqQ",
  authDomain: "lie-detect-73c1f.firebaseapp.com",
  projectId: "lie-detect-73c1f",
  storageBucket: "lie-detect-73c1f.appspot.com",
  messagingSenderId: "890044421645",
  appId: "1:890044421645:web:129136da4adb10104c2744",
  measurementId: "G-SXVYSNGB5P"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
