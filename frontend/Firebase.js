// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "foodjet-food-delivery.firebaseapp.com",
  projectId: "foodjet-food-delivery",
  storageBucket: "foodjet-food-delivery.firebasestorage.app",
  messagingSenderId: "865147821473",
  appId: "1:865147821473:web:1d3b984ccf43e9b0b27fe0",
  measurementId: "G-YP8WS1LG6R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
export  {app,auth}