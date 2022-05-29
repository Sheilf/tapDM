
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth, firestoreDB } from '../../database/firebase';
import { CenterColumnWithFlexbox, CenterThePage } from '../../styles/globalStyles';
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
  // start the component
  useEffect(() => {

    //get the collection of users stored in the database
    USERS = firestoreDB.collection("users");

    //this process will run since you've logged in.
    // It will grant you basic data about the user that just logged in.
    // this data can be used to define the user by user ID, 
    // which is how you will identify the user in the database
    // Firestore uses Collection > document > collection > document > collection ... and so on.
    // So in this case it's Collection(Users) > Document(userID).
    // In the future it may grow. Perhaps the user will have a collection of chats with chat ids and so on.
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

      CHATS.get().then((querySnapshot)=>{
        const publicChatrooms = querySnapshot.docs.map((doc)=>{
          const { createdBy, nameOfChat, topics, dateCreated } = doc.data()
          return { id: doc.id, createdBy, nameOfChat, topics, dateCreated }
        })

        setPublicChats(publicChatrooms)
      })

    })
  

  }, [])


  // display the /profile page: https://tapdm3.web.app/profile

  console.log("public chatrooms", publicChats);
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


          <h3>Your Chats</h3>

          
          {
            usersChats.length === 0 ? <div>You haven't created a chat yet silly goose!</div> : null
          }
          {/* 

          This will create a list of links that send you to a chat room based on the ID created
          
          */}
          {/* {usersChats ? usersChats.map(item => <Link style={{textAlign: 'center'}} to={`/chat/${item}`}>{item}</Link>) : null} */}

        {usersChats ? ( 
          <div style={{ width: '600px', display: 'flex', flexWrap: 'wrap'}}>
          {usersChats.map(item => (
            <Link 
            to={`/chat/${item}`}
            key={item} 
            style={{ 
              width: 150, height: 200, 
              padding: 10, margin: 12, 
              borderRadius: 12, border: '1px solid black',
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
            }}>
              {item.split("-")[1]}
              {/* <div>{item.nameOfChat}</div>
              <div style={{
                display: 'flex', flexDirection: 'column', justifyContent: 'center'
              }}>
                {item.topics.map(topicItem => <div key={topicItem}>{topicItem}</div>)}
              </div> */}
            </Link>
          ))}
         </div>  
        ) : null}
  




        </div>
          <h3>Public Chats</h3>
          <div style={{ width: '600px', display: 'flex', flexWrap: 'wrap'}}>
            {publicChats.map(item => (
              <Link 
              to={`/chat/${item.id}`}
              key={item.id} 
              style={{ 
                width: 150, height: 200, 
                padding: 10, margin: 12, 
                borderRadius: 12, border: '1px solid black',
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>{item.nameOfChat}</div>
                <div style={{
                  display: 'flex', flexDirection: 'column', justifyContent: 'center'
                }}>
                  {item.topics.map(topicItem => <div key={topicItem}>{topicItem}</div>)}
                </div>
              </Link>
            ))}

          </div>


    </section>
  )

}

export default UserProfile
