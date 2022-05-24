
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth, firestoreDB } from '../../database/firebase';
import { CenterColumnWithFlexbox, CenterThePage, SideInputLabel } from '../../styles/globalStyles';
import { Navigate, useNavigate } from 'react-router';




let CreateChat = () => {


  let USERS = firestoreDB.collection("users");
  let CHATS  = firestoreDB.collection("chats");

  let COLLECTIONS = {
    socialMedia: firestoreDB.collection("socialMedia"),
    crypto: firestoreDB.collection("crypto"),
    XR: firestoreDB.collection("XR"),
    ['industry4.0']: firestoreDB.collection("industry4.0"),
  }

  let navigate = useNavigate();

  const [dbUser, setDbUser] = useState({});
  const [nameOfChat, setNameOfChat] = useState('');



  const [selectedTopics, setSelectedTopics] = useState([

  ]);

  useEffect(() => {






    firebaseAuth.onAuthStateChanged(user=>{


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

        // when you're done processing the database, add some data to state so you can display itter
        setDbUser({ 
          uid: user.uid, 
          displayName: user.displayName, 
          photoURL: user.photoURL
        })
      })

    })
  

  }, [])




  const handleSelectedTopics = (event) => {
    if(event.target.checked) {
      setSelectedTopics([...selectedTopics, event.target.id])
    }else{
      let selectedTopicAfterDeselecting = selectedTopics.filter(item => item !== event.target.id);
      setSelectedTopics(selectedTopicAfterDeselecting);
    }

  }


  const handleNameOfChatChanged = (event) => {
    setNameOfChat(event.target.value);
  }

  const createChat = async () => {



    selectedTopics.forEach(topic => {
      COLLECTIONS[topic].doc().set({
        dateCreated: Date.now(),
        nameOfChat: nameOfChat,
        createdBy: dbUser.uid
      })
      
    })

    CHATS.doc(`${dbUser.uid}-${nameOfChat}`).set({
      dateCreated: Date.now(),
      nameOfChat: nameOfChat,
      createdBy: dbUser.uid,
      topics: selectedTopics,
    
    })


    CHATS.doc(`${dbUser.uid}-${nameOfChat}`).collection("messages").doc().set({

    });

   await USERS.doc(dbUser.uid).get().then((doc)=>{

      const checkForDuplicates = doc.data().chats.includes(`${dbUser.uid}-${nameOfChat}`);

      if(!checkForDuplicates){
        USERS.doc(dbUser.uid).update({
          chats: [...doc.data().chats, `${dbUser.uid}-${nameOfChat}`]
        })
      }

    })

    navigate("/profile");

  }

  return (
    <section style={CenterThePage}>
       <h1>Create a chat</h1>

       <label>Name of chat</label>
       <input type="text" onChange={handleNameOfChatChanged} />  

      <br />

      <label>Topics</label>

      <div style={SideInputLabel}>
        <input type="checkbox" id="socialMedia" name="socialMedia" value="Social Media" onChange={handleSelectedTopics}/>
        <label for="socialMedia">Social Media</label><br/>
      </div>

      <div style={SideInputLabel}>
        <input type="checkbox" id="crypto" name="crypto" value="Crypto" onChange={handleSelectedTopics}/>
        <label for="crypto">Crypto</label><br/>
      </div>

      <div style={SideInputLabel}>
        <input type="checkbox" id="XR" name="XR" value="xR" onChange={handleSelectedTopics}/>
        <label for="XR">XR</label><br/>
      </div>

      <div style={SideInputLabel}>
        <input type="checkbox" id="industry4.0" name="industry4.0" value="Industry 4.0" onChange={handleSelectedTopics}/>
        <label for="industry4.0">AR/VR</label><br/>
      </div>  


      <button onClick={createChat}>Create</button>
    </section>
  )

}

export default CreateChat;
