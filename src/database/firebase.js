// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "tapdm3.firebaseapp.com",
  projectId: "tapdm3",
  storageBucket: "tapdm3.appspot.com",
  messagingSenderId: "818353276964",
  appId: "1:818353276964:web:524e672d4286e13e1bb0b1",
  measurementId: "G-RM1ZCHHDEZ"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Use these for db & auth
const db = firebaseApp.firestore();
const auth = firebase.auth();

export { auth, db };