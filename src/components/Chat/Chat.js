
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';

import { CenterThePage } from '../../styles/globalStyles';
import { useParams } from 'react-router';
import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';

// Empty feature we created. Good job, you now have the start of a chat app.

// This chat ID easily lets you link the user that owns it thats stored in the database.
let Chat = () => {

  const { chatID } = useParams();
  const [chatDisplayData, setChatDisplayData] = useState({})
  
  useEffect(()=>{
    CHATS.doc(chatID).get().then((document)=>{
      const { createdBy, nameOfChat, topics } = document.data()

      setChatDisplayData({
        createdBy,
        nameOfChat,
        topics
      })

    })
  })

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
              {chatDisplayData.topics.map(item => (<div>{item}</div>))}
            </div>
          ) 
          : null
        }
      </section>
    )
  }

  export default Chat;