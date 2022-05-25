  
import 'firebase/compat/auth';

import '../database/firebase';
import { firestoreDB } from '../database/firebase';


  
  export let USERS = firestoreDB.collection("users");
  export let CHATS  = firestoreDB.collection("chats");

  export let COLLECTIONS = {
    socialMedia: firestoreDB.collection("socialMedia"),
    crypto: firestoreDB.collection("crypto"),
    XR: firestoreDB.collection("XR"),
    art: firestoreDB.collection("art"),
    politics: firestoreDB.collection("politics"),
    education: firestoreDB.collection("education"),
    stockMarket: firestoreDB.collection("stockMarket"),
    design: firestoreDB.collection("design"),
    engineering: firestoreDB.collection("engineering"),
    health: firestoreDB.collection("health"),
  }

  export const productList = {

    socialMedia: {
      label: "Social Media"
    },

    crypto: {
      label: "Crypto"
    },

    XR: {
      label: "AR/VR"
    },

    art: {
      label: "Art"
    },

    politics: {
      label: "Politics" 
    },

    education: {
      label: "Education" 
    },

    stockMarket: {
      label: "Stock Market"
    },

    design: {
      label: "Design"
    },

    engineering: {
      label: "Engineering"
    },

    health: {
      label: "Health"
    }
  }
