
import './App.css';
import React, { useEffect, useState } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import './database/firebase';
import { firebaseAuth } from './database/firebase';
import { CenterThePage, transitionVisibility } from './styles/globalStyles';


//Display the landing page that allows a user to log in and enter the application.
function App() {

  //handle about button click event animation
  const [isVisible, setIsVisible] = useState(false);

  const [isHovering, setIsHovering] = useState(false);

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


      <h2 
        onClick={() =>setIsVisible(true)} 
        style = {{
          transition: '0.3s all ease-in-out',
          borderRadius: 6,
          backgroundColor: 'aquamarine',
          padding: isHovering ? 16 : 12,
          color: 'white',
        }}
        onMouseEnter={() => setIsHovering(true)}
        onMouseOut={() => setIsHovering(true)}
      >
        About 
      </h2>
      <div
        style={transitionVisibility(isVisible)}
      >
          wiretap people's DMs basically and make it social experience
      </div>
    </div>
  );
}

export default App;
