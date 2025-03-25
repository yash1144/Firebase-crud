// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
  apiKey: "AIzaSyApIjK66Tv35PP5MluL9IE_3EV4ax-5GE4",
  authDomain: "fir-9f6dd.firebaseapp.com",
  projectId: "fir-9f6dd",
  storageBucket: "fir-9f6dd.firebasestorage.app",
  messagingSenderId: "1096307075897",
  appId: "1:1096307075897:web:316e92d2c5cee45e66d6e8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
