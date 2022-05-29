
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth } from '../../database/firebase';
import { CenterThePage, SideInputLabel } from '../../styles/globalStyles';
import { useNavigate } from 'react-router';
import { productList } from '../../common/commonElements';
import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';



let CreateChat = () => {
  
  // navigate will be used after a chat is created, sending the user back to their profile
  let navigate = useNavigate();

  // information about the user in the database used locally in case data must change safely on the frontend first.
  const [dbUser, setDbUser] = useState({});

  // value of the name of that chat as you type new letters into the message box.
  // this value will be stored to the database
  const [nameOfChat, setNameOfChat] = useState('');

  // set of topics selected by the checkbox inputs.
  // this value will be stored to the database.
  const [selectedTopics, setSelectedTopics] = useState([]);


  // mounting function. Run this process before anything.
  // since we're in a new route, we query the user from the database
  // this process can probably be sent to the "commonElements" folder.
  useEffect(() => {

    firebaseAuth.onAuthStateChanged(user=>{

      USERS.doc(user.uid).get().then(doc =>{
        setDbUser({ 
          uid: user.uid, 
          displayName: user.displayName, 
          photoURL: user.photoURL
        })
      })

    })

  }, [])



  /**
   * 
   * @param {*} event checkbox event
   * @description updates the state of selectedTopics when a checkbox event occurs.
   * if the event is a check, update the selectedTopics.
   * if the event is de-selecting, remove it from selectedTopics state.
   */
  const handleSelectedTopics = (event) => {
    if(event.target.checked) {
      setSelectedTopics([...selectedTopics, event.target.id])
    }else{
      let selectedTopicAfterDeselecting = selectedTopics.filter(item => item !== event.target.id);
      setSelectedTopics(selectedTopicAfterDeselecting);
    }

  }



  /**
   * 
   * @param {*} event typing event
   * @description updates the name of chat state any time you type a key in the message box
   */
  const handleNameOfChatChanged = (event) => {
    setNameOfChat(event.target.value);
  }

  /**
   * @description creates a chat in the database
   * 
   * A) Create a topic to chat/user relationship
   *  goes through each selected topic,
   * autogenerates a topic ID with .doc(),
   * sets initial creation data
   * 
   * B) Creates a chat to topic/chat relationship
   * Creates a unique ID using user ID+name of chat
   * This means a user can't have duplicate chat names.
   * 
   * C) Creates a user to topic/chat relationship
   * creates a list of chats owned by the user
   * if the user is not using a duplicate chat name, update the list of chats
   * in the future, we may initiate a collection of messages defined by auto-generated
   * document IDs to store the messages created. Can easily allow for edit/delete.
   * 
   * D) Create an empty user to chat/messages relationship
   * When the process is complete, navigate back to the user profile page.
   * 
   */
  const createChat = async () => {

    // A) create topic-chat relationship in database
    selectedTopics.forEach(topic => {
      COLLECTIONS[topic].doc().set({
        dateCreated: Date.now(),
        nameOfChat: nameOfChat,
        createdBy: dbUser.uid
      })
    })

    // create user-chat data relationship in database
    CHATS.doc(`${dbUser.uid}-${nameOfChat}`).set({
      dateCreated: Date.now(),
      nameOfChat: nameOfChat,
      createdBy: dbUser.uid,
      topics: selectedTopics,
    
    })

    //create an empty user to chat/messages relationship
    CHATS.doc(`${dbUser.uid}-${nameOfChat}`).collection("messages").doc().set({
      dateCreated: Date.now(),
    });

    // create a relationship between users and chats
   await USERS.doc(dbUser.uid).get().then((doc)=>{

      if(!doc.data().chats){
        USERS.doc(dbUser.uid).set({
          chats: [`${dbUser.uid}-${nameOfChat}`]
        })
      }else{
        const checkForDuplicates = doc.data().chats.includes(`${dbUser.uid}-${nameOfChat}`);

        if(!checkForDuplicates){
          USERS.doc(dbUser.uid).update({
            chats: [...doc.data().chats, `${dbUser.uid}-${nameOfChat}`]
          })
        }
      }

    })

    navigate("/profile");

  }


  return (
    <section style={CenterThePage}>
       <h1>Create a chat</h1>

       <label>Name of chat</label>

       {/* handles typing events */}
       <input type="text" onChange={handleNameOfChatChanged} />  

      <br />

      <label>Topics</label>

      {/* Go through the list of imported prodcts and render a checkbox for it
          Handles the check/unchecking events 
      */}
      {
        Object.keys(productList).map(item => (
          <div style={SideInputLabel}>
            <input type="checkbox" id={item} name={item} value={item} onChange={handleSelectedTopics}/>
            <label for={item}>{productList[item].label}</label>
            <br/>
          </div>
        ))
      }

      {/* Handles the create event to change the database. */}
      <button onClick={createChat}>Create</button>
    </section>
  )

}

export default CreateChat;
