import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBmyXonIT5GgIra1myW5RXbKOux5-AwRy4",
    authDomain: "reps-and-recipies.firebaseapp.com",
    projectId: "reps-and-recipies",
    storageBucket: "reps-and-recipies.firebasestorage.app",
    messagingSenderId: "649635844852",
    appId: "1:649635844852:web:226a125e92a88c4ce944a1"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export default app;
