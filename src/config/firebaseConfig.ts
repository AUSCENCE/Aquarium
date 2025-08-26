// src/config/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA9_uTpRP6PMjxHr1DO43q8G3hutaEk3fs",
  authDomain: "aquarium-c92ff.firebaseapp.com",
  projectId: "aquarium-c92ff",
  storageBucket: "aquarium-c92ff.appspot.com",
  messagingSenderId: "459167429389",
  appId: "1:459167429389:android:3ebe2f344cba18132c7644",
};

// 🔹 Initialiser Firebase
const app = initializeApp(firebaseConfig);

// 🔹 Exporter Firestore
export const db = getFirestore(app);
