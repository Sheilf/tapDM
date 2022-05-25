
import React, { useEffect, useState } from 'react';
import 'firebase/compat/auth';

import '../../database/firebase';
import { firebaseAuth, firestoreDB } from '../../database/firebase';
import { CenterThePage, SideInputLabel } from '../../styles/globalStyles';
import { useNavigate } from 'react-router';
import { productList } from '../../common/commonElements';
import { USERS, CHATS, COLLECTIONS } from '../../common/commonElements';



let CreateChat = () => {




  let navigate = useNavigate();

  const [dbUser, setDbUser] = useState({});
  const [nameOfChat, setNameOfChat] = useState('');



  const [selectedTopics, setSelectedTopics] = useState([

  ]);

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
       <input type="text" onChange={handleNameOfChatChanged} />  

      <br />

      <label>Topics</label>

      {
        Object.keys(productList).map(item => (
          <div style={SideInputLabel}>
            <input type="checkbox" id={item} name={item} value={item} onChange={handleSelectedTopics}/>
            <label for={item}>{productList[item].label}</label>
            <br/>
          </div>
        ))
      }


      <button onClick={createChat}>Create</button>
    </section>
  )

}

export default CreateChat;
