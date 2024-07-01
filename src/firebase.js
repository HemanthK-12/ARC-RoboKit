// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { getFirestore, collection, addDoc, deleteDoc, doc, onSnapshot, query, where, getDocs } from "firebase/firestore"; 

const firebaseConfig = {
    apiKey: "AIzaSyDvIH6eBe8ezFAYZWm4oNOhmWW4Car1zk8",
    authDomain: "pwa-webapp-svelte.firebaseapp.com",
    projectId: "pwa-webapp-svelte",
    storageBucket: "pwa-webapp-svelte.appspot.com",
    messagingSenderId: "965497794517",
    appId: "1:965497794517:web:43d6cbf926eaed6d85575c",
    measurementId: "G-8Y8H0815VY"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, signInWithPopup, GoogleAuthProvider, signOut, collection, addDoc, deleteDoc, doc, onSnapshot, query, where, getDocs };
