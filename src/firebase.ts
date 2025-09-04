// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import auth from '@react-native-firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc4sF3JMhHaDBeg9Cua3Dkv68pIqhpThI",
  authDomain: "houserentingapp-57442.firebaseapp.com",
  projectId: "houserentingapp-57442",
  storageBucket: "houserentingapp-57442.firebasestorage.app",
  messagingSenderId: "1006265496639",
  appId: "1:1006265496639:web:8f92410939ed31c33e348a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const signUp = async (email: string, password: string) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signIn = async (email: string, password: string) => {
  try {
    const userCredential = await auth().signInWithEmailAndPassword(email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};


export const signOut = async () => {
  try {
    await auth().signOut();
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};

import { collection, addDoc } from 'firebase/firestore';

export const addProperty = async (propertyData: any) => {
  try {
    const docRef = await addDoc(collection(db, "properties"), propertyData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};