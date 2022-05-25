
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth } from '../../database/firebase';
import { CenterThePage, SideInputLabel } from '../../styles/globalStyles';


import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';



let CreateChat = () => {




  useEffect(() => {



  }, [])




  return (
    <section style={CenterThePage}>
      <h1>Your Chat</h1>
    </section>
  )

}

export default CreateChat;
