// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnG5q7Ucme7bS2RaWe5L1YqMGIw_OESgI",
  authDomain: "crud-a2b81.firebaseapp.com",
  projectId: "crud-a2b81",
  storageBucket: "crud-a2b81.firebasestorage.app",
  messagingSenderId: "8104141839",
  appId: "1:8104141839:web:6a3a5180ceacc91580af7a",
  measurementId: "G-5PG9XLYJKW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)