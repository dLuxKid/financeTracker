import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDA4xW9c1ZBFr3S5_zk9QsV7fqnv70OpEI",
  authDomain: "financetracker-c6426.firebaseapp.com",
  projectId: "financetracker-c6426",
  storageBucket: "financetracker-c6426.appspot.com",
  messagingSenderId: "947099070299",
  appId: "1:947099070299:web:c59d1529b106f7bb94f47e",
  measurementId: "G-LLBC2MBRNV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
