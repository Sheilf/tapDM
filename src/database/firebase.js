// Import the functions you need from the SDKs you need

import { getAnalytics } from "firebase/analytics";
import { firebaseConfig } from "./firebaseConfig";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



// Initialize Firebase - this connects your code to firebase
const app = firebase.initializeApp(firebaseConfig);

// not used. This connects to the analytics product in firebase.
const analytics = getAnalytics(app);

// this connects to the firestore database.
const firestoreDB = app.firestore();

// this connects to firebase authentication product.
const firebaseAuth = firebase.auth();

// export these variables - allow them to be retrieved by other files in your codebase.
export { firestoreDB, firebaseAuth };