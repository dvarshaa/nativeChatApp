// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFMNp-X1-cGd4IOQwc05PJ_2G4obqlJts",
  authDomain: "native-chatapp-21282.firebaseapp.com",
  projectId: "native-chatapp-21282",
  storageBucket: "native-chatapp-21282.firebasestorage.app",
  messagingSenderId: "656307208419",
  appId: "1:656307208419:web:808f357f97dd0dcce945d6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export const db = getFirestore(app);

export const usersRef = collection(db, 'users');
export const roomRef = collection(db, 'room');