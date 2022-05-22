// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use these for db & auth
const db = app.firestore();
const auth = firebase.auth();

export { auth, db };