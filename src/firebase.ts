import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCc4sF3JMhHaDBeg9Cua3Dkv68pIqhpThI",
  authDomain: "houserentingapp-57442.firebaseapp.com",
  projectId: "houserentingapp-57442",
  storageBucket: "houserentingapp-57442.firebasestorage.app",
  messagingSenderId: "1006265496639",
  appId: "1:1006265496639:web:8f92410939ed31c33e348a",
  measurementId: "G-5XZB385CMZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export { app };