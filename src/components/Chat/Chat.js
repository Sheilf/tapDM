
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth } from '../../database/firebase';
import { CenterThePage, SideInputLabel } from '../../styles/globalStyles';


import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';
import { useParams } from 'react-router';



let CreateChat = () => {




  useEffect(() => {



  }, [])



  const { chatID } = useParams();

  return (
    <section style={CenterThePage}>
      <h1>Your Chat</h1>
      <div>{chatID}</div>
    </section>
  )

}

export default CreateChat;
