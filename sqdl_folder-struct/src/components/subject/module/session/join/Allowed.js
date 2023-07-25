import React from 'react'
import { useParams } from 'react-router-dom'
import { SOCKET_URL } from '../../../../config';
import {io} from 'socket.io-client'
import { useState } from 'react';

const socket = io(SOCKET_URL)
const Allowed = () => {

  const params = useParams();
  const [sessionData, setSession] = useState()

  socket.on(params.sessionid + 'student' +'stateUpdate', (args)=>{
    console.log(args)
  })
  return (
    <div>Allowed</div>
  )
}

export default Allowed