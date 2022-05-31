
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';
import '../../database/firebase';

import { firebaseAuth, firestoreDB } from '../../database/firebase';
import { CenterColumnWithFlexbox, CenterThePage, ChatLink, ChatsContainer } from '../../styles/globalStyles';
import { Link } from 'react-router-dom';
import { CHATS } from '../../common/commonElements';


//Display the initial page after a user logs in.
let UserProfile = () => {

  // initiate a database reference for user data that you will store to the database
  let USERS;

  //Part 2: Creating Users
  // initiate a react state variable to use as variable that may change before storing or updating the database
  const [dbUser, setDbUser] = useState({});

  // Part 3: Creating a chat feature
  // renders chats if it exists in the user object
  const [usersChats, setChats] = useState([]);

  const [publicChats, setPublicChats] = useState([]);

  const [subscribedChats, setSubscribedChats] = useState([]);

  // start the component
  useEffect(() => {

    //get the collection of users stored in the database
    USERS = firestoreDB.collection("users");



    /**
     * //This function initiates the user's profile after logging in.
     * 
     * 
     */
    firebaseAuth.onAuthStateChanged(user=>{

      // get the user's document based on the users ID
      USERS.doc(user.uid).get().then(doc =>{
        if(doc.data()){
          // if the user has logged in and been stored before, get the user and update firstVisit to false.
          USERS.doc(user.uid).update({
            firstVisit: false,
          })

          
          if(doc.data().chats){
            setChats(doc.data().chats);
          }else{
            //do nothing
          }
 
        }else{
          // if the user has never logged in before, create the user in the database. Add "basic first time" data.
          // in the future we can add more data to make this more welcoming, like "first time? lets show you how to use the app"
          USERS.doc(user.uid).set({
            firstVisit: true,
            displayName: user.displayName

          })

        }

        // when you're done processing the database, add some data to state so you can display a user profile. 
        // Do not add chats to state unless you wanna do some shiny CSS shit
        setDbUser({ 
          uid: user.uid, 
          displayName: user.displayName, 
          photoURL: user.photoURL
        })
      })

      // get a basic social feed of created chats
      CHATS.get().then((querySnapshot)=>{
        const publicChatrooms = querySnapshot.docs.map((doc)=>{
          const { createdBy, nameOfChat, topics, dateCreated } = doc.data()
          return { id: doc.id, createdBy, nameOfChat, topics, dateCreated }
        })

        setPublicChats(publicChatrooms)
      })


      // get the list of chats subscribed to by the logged in user
      USERS.doc(user.uid).collection("subscriptions").get().then((querySnapshot)=>{
        const subscribedChatrooms = querySnapshot.docs.map((doc)=>{
          return doc.id
        })

        setSubscribedChats(subscribedChatrooms)
      })
    })
  

  }, [])


  // display the /profile page: https://tapdm3.web.app/profile
  return (
    <section style={CenterThePage}>

        <div style={CenterColumnWithFlexbox}>
          <h1>Welcome to the app</h1>

          <h2>{dbUser.displayName}</h2>

          <h2>{dbUser.uid}</h2>

          <img src={dbUser.photoURL} style={{borderRadius: "50%"}} />
          <br />

          {/* Clicking this link will send you to the create chat page */}
          <Link to="/chat/create">Create chat</Link>          

          <br />
          <br />


        
        {
          usersChats.length === 0 ? null : <h3>Your Chats</h3>
        }
        {usersChats ? ( 
          <div style={ChatsContainer}>
            {usersChats.map(item => (
              <Link 
              to={`/chat/${item}`}
              key={item} 
              style={ChatLink}>
                {item.split("-")[1]}

              </Link>
            ))}
         </div>  
        ) : null}

        {
          subscribedChats.length === 0 ?  null : <h3>Subscriptions</h3>
        } 
        {subscribedChats ? ( 
          <div style={ChatsContainer}>
            {subscribedChats.map(item => (
              <Link 
              to={`/chat/${item}`}
              key={item} 
              style={ChatLink}>
                {item.split("-")[1]}

              </Link>
            ))}
         </div>  
        ) : null}


        {
          publicChats.length === 0 ?  null : <h3>Discovery</h3>
        }
        <div style={ChatsContainer}>
          {publicChats.map(item => (
            <Link 
            to={`/chat/${item.id}`}
            key={item.id} 
            style={ChatLink}>
              <div>{item.nameOfChat}</div>
              <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                {item.topics.map(topicItem => <div key={topicItem}>{topicItem}</div>)}
              </div>
            </Link>
          ))}

          </div>
        </div>

    </section>
  )

}

export default UserProfile
