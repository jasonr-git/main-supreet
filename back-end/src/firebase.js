// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Add this line for Firebase Storage

const firebaseConfig = {
    apiKey: "AIzaSyCDp2ZjsebPSy08BthKWHlwbsytCvNXHC4",
    authDomain: "supreet-souharda.firebaseapp.com",
    projectId: "supreet-souharda",
    storageBucket: "supreet-souharda.appspot.com",
    messagingSenderId: "533863631788",
    appId: "1:533863631788:web:3d947ebd5d76744d5f4809",
    measurementId: "G-9Q1RK9FMGY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage here

export { auth, db, storage }; // Export storage along with auth and db
