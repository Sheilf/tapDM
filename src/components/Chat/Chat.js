
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';

import { CenterThePage, CenterColumnWithFlexbox } from '../../styles/globalStyles';
import { useParams } from 'react-router';
import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';

// Empty feature we created. Good job, you now have the start of a chat app.

// This chat ID easily lets you link the user that owns it thats stored in the database.
let Chat = () => {

  const { chatID } = useParams();
  const [chatDisplayData, setChatDisplayData] = useState({})
  
  const [updateDM, setUpdateDM] = useState('');
  const [messages, setMessages] = useState([]);


  const getAndSetMessages = () => {
    CHATS.doc(chatID).collection("messages").get().then((querySnapshot) =>{
      const messages = querySnapshot.docs.map((doc)=>{
        return { id: doc.id, ...doc.data() }
      })

      setMessages(messages)
    })
  }

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
      var messages = [];
      querySnapshot.forEach((doc) => {
        return { id: doc.id, ...doc.data() }
      });

      setMessages(messages)

    })

  }, [])

  useEffect(() => {
    getAndSetMessages();

  }, [messages])



  const sendDM = (event) => {

    console.log("event.target.value");
    CHATS.doc(chatID).collection("messages").doc().set({message: updateDM})

  }



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
      </div>

    </section>
  )
}

  export default Chat;