
import './App.css';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './database/firebase';
import { firebaseAuth } from './database/firebase';
import { CenterThePage } from './styles/globalStyles';


//Display the landing page that allows a user to log in and enter the application.
function App() {

  // This set of data will be passed into the firebase auth UI component that handles the login process.
  const uiConfig = {

    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',

    // Redirect to /profile after sign in is successful.
    signInSuccessUrl: '/profile',

    // We will display Google as the auth providers. "Sign in with Google"
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    ],
  };


  //display the landing page. https://tapdm3.web.app
  return (
    <div style={CenterThePage}>
      <h1>TapDM.</h1>
      <h3>Clubhouse without the commitment lol</h3>
      <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebaseAuth} />
    </div>
  );
}

export default App;
