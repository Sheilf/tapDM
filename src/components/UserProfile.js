
import React, { useEffect, useState } from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import '../database/firebase';
import { auth, db } from '../database/firebase';


let UserProfile = () => {


  let USERS;



  const [dbUser, setDbUser] = useState({});

  // mounting 
  useEffect(() => {
    USERS = db.collection("users");
    auth.onAuthStateChanged(user=>{
      console.log("userprofile", user)
      USERS.doc(user.uid).get().then(doc =>{
        if(doc.data()){
          USERS.doc(user.uid).update({
            firstVisit: false,
          })
        }else{
          USERS.doc(user.uid).set({
            firstVisit: true,
            displayName: user.displayName
          })
        }

        setDbUser({ uid: user.uid, displayName: user.displayName, photoURL: user.photoURL})
      })

    })
  

  }, [])

  console.log("state", dbUser)
  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%', minHeight: '100vh' }}>

        <div style={{display: 'flex', flexDirection:"column", justifyContent: 'center', alignItems: 'center' }}>
          <h1>Welcome to the app</h1>
          <h2>{dbUser.displayName}</h2>
          <h2>{dbUser.uid}</h2>
          <img src={dbUser.photoURL} style={{borderRadius: "50%"}} />

          <br />

          <button>Create a chat</button>

          
          <br />


          <button>Find a chat</button>

          
          <br />

          
          <h3>Your Chats</h3>
        </div>

       
    </section>
  )

}

export default UserProfile
