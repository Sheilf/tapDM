import logo from './logo.svg';
import './App.css';

import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './database/firebase';
import { auth, db } from './database/firebase';

function App() {


  let USERS;

  const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // Redirect to /signedIn after sign in is successful. Alternatively you can 
    // provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/profile',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],

  };

  const [isSignedIn, setIsSignedIn] = useState({});

  // mounting 
  useEffect(() =>{
    USERS = db.collection("users");
    auth.onAuthStateChanged(user => {
      if(user){
        console.log("user mount", user)
        setIsSignedIn({ isSignedIn: !!user })
      }
    })  

 
  }, [])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh' }}>
      <h1>TapDM.</h1>
      <h3>Clubhouse without the commitment lol</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth}/>
    </div>
  );
}

export default App;
