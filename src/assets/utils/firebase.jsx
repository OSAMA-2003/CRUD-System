import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyAzqpoIrjVli6eZJx567Kkht047lT2XhLI",
  authDomain: "first-dashboard-a034a.firebaseapp.com",
  projectId: "first-dashboard-a034a",
  storageBucket: "first-dashboard-a034a.firebasestorage.app",
  messagingSenderId: "154288803531",
  appId: "1:154288803531:web:6bdb25c8afd4a017e2154e",
  measurementId: "G-HW574BNDJY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);

