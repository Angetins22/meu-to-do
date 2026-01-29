export * as FirebaseController from './TarefaController'

import { doc, deleteDoc, query, where } from "firebase/firestore";
import { addDoc, collection, getDocs, getFirestore, updateDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import type { ITarefa } from "@/components/Tarefa";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
    apiKey: "AIzaSyB4PBCL4NtCcDkFW6A5_Fj2Biao5bz7aFo",
    authDomain: "todolist-83c47.firebaseapp.com",
    projectId: "todolist-83c47",
    storageBucket: "todolist-83c47.firebasestorage.app",
    messagingSenderId: "362612689016",
    appId: "1:362612689016:web:3f88d040d0ce15489a058d",
    measurementId: "G-QK5FQ4JHQ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const firebase = getFirestore(app);