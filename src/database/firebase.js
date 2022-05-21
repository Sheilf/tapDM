// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "../config/firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries



const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };