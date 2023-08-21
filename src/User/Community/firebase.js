import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCfFzuPDrycXDTzflVQgakgiK2Diou0e6k",
    authDomain: "student-shelter-2023.firebaseapp.com",
    projectId: "student-shelter-2023",
    storageBucket: "student-shelter-2023.appspot.com",
    messagingSenderId: "219850694616",
    appId: "1:219850694616:web:d43c8c44dd0f446e185cad",
    measurementId: "G-KTPJRX8DPB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

