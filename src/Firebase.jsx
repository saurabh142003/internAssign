// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCqHJ6n6MXUIWvCDjru18QqHTb26KjheOc",
  authDomain: "student-e85f7.firebaseapp.com",
  projectId: "student-e85f7",
  storageBucket: "student-e85f7.appspot.com", // Fixed to use ".appspot.com"
  messagingSenderId: "790878940478",
  appId: "1:790878940478:web:14ecc912924e686341d06f",
  measurementId: "G-SFRMN8BKC1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and Firestore
export const auth = getAuth(app);
export const firestore = getFirestore(app);

export default app;
