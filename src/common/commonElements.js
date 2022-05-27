  
import 'firebase/compat/auth';

import '../database/firebase';
import { firestoreDB } from '../database/firebase';


  // these database variables are seperated into another file
  // because these variables will often be used.
  // So i might as well just write them once and import it when I need them.
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

  // Currently used to just display data for frontend and process a list.
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
