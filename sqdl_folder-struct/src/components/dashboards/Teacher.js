import React, { useEffect } from 'react'
import {io} from 'socket.io-client'

const TeacherInterface = () => {

  const ENDPOINT = 'ws://localhost:5000';
  const socket = io(ENDPOINT); // Replace with your Socket.io server URL
  
  console.log(socket);
  console.log(ENDPOINT);
    
  useEffect(()=>{
      // Emit the "question_enabled" event to the server
      socket.on('FromAPI', (data) => {
        //setResponse(data);
        console.log("socket connected");
      });

  
      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
     
      // socket.emit('question_enabled');
      // console.log("something");
  },[]);

  

  return (
    <div>
      <h1>Teacher Interface</h1>
      <button>Enable Questions</button>
    </div>
  );

};

export default TeacherInterface;