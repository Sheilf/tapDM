
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';

import { CenterThePage, CenterColumnWithFlexbox } from '../../styles/globalStyles';
import { useParams } from 'react-router';
import { CHATS, USERS } from '../../common/commonElements';


let Chat = () => {

  // references the chat that belongs to the list of public chat collections
  const { chatID } = useParams();

  // displays basic data about the chat
  const [chatDisplayData, setChatDisplayData] = useState({})
  
  // state responsible for typing events or the DM you want to send
  const [updateDM, setUpdateDM] = useState('');

  // set of messages that belong to the chat
  const [messages, setMessages] = useState([]);



  const getUserIdFromParams = () => {
    const split = chatID.split("-")
    return split[0];
  }

  /**
   * @description this functions goes through each message document in the database and sets it to * state for rendering
   */
  const getAndSetMessages = () => {
    CHATS.doc(chatID).collection("messages").get().then((querySnapshot) =>{
      const dbMessages = querySnapshot.docs.map((doc)=>{
        return { id: doc.id, message: doc.data().message }
      })

      setMessages(dbMessages)
    })
  }

  // this mounts the component, or runs processes before initial render
  // A) we get basic data about the chat
  // B) we set a database listener. If the message collection ever updates, we update the screen
  useEffect(() => {
    CHATS.doc(chatID).get().then((document)=> {
      const { createdBy, nameOfChat, topics } = document.data()

      setChatDisplayData({
        createdBy,
        nameOfChat,
        topics
      })

    })

    CHATS.doc(chatID).collection("messages").onSnapshot((querySnapshot)=>{
      const dbMessages = [];
      querySnapshot.forEach((doc) => {
        dbMessages.push({ id: doc.id, message: doc.data().message })
      });

      setMessages(dbMessages)

    })

  }, [])


  // runs a process to update list of collections with a new update.
  const sendDM = (event) => {
    CHATS.doc(chatID).collection("messages").doc().set({message: updateDM}).then(()=>{
      getAndSetMessages();
    })
  }

  const subscribeToChat = (event) => {  

    // create a subscriber list under the chat
    CHATS.doc(chatID).collection("subscribers").doc(getUserIdFromParams()).set({
      dateSubscribed: Date.now()
    })
    
    // create a set of chat IDs to a user
    USERS.doc(getUserIdFromParams()).collection("subscriptions").doc(chatID).set({
      dateSubscribed: Date.now()
    })
  }


  //renders the chat's data, list of messages owned by the chat, and the input to create DMs.
  return (
    <section style={CenterThePage}>
      <h1>Chat</h1>
      <div style={{textAlign: 'center', marginBottom: 12 }}>
        Created by: {chatDisplayData.createdBy}
      </div>

      <div style={{textAlign: 'center', marginBottom: 12}}>
        Name of chat: {chatDisplayData.nameOfChat}
      </div>

      { 
        chatDisplayData.topics ? (
          <div style={{textAlign: 'center', marginBottom: 12}}>
            <b>Topics</b> 
            {chatDisplayData.topics.map(item => (<div key={item}>{item}</div>))}
          </div>
        ) 
        : null
      }

      <div style={CenterColumnWithFlexbox}>
        {messages.map(item => <div>{item.message}</div>).reverse()} 
      </div>

      <div style={CenterColumnWithFlexbox}>
        <label>Type your message here</label>
        <input type="text" onChange={(event) => setUpdateDM(event.target.value)} />
        <button onClick={sendDM}>send it!</button>

        <button onClick={subscribeToChat}>subscribe to chat</button>
      </div>

    </section>
  )
}

  export default Chat;