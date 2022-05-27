
import React, { useEffect } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';

import { CenterThePage } from '../../styles/globalStyles';
import { useParams } from 'react-router';


// Empty feature we created. Good job, you now have the start of a chat app.

// This chat ID easily lets you link the user that owns it thats stored in the database.
let Chat = () => {

  const { chatID } = useParams();

  return (
    <section style={CenterThePage}>
      <h1>Your Chat</h1>
      <div>{chatID}</div>
    </section>
  )

}

export default Chat;
