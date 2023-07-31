import React from 'react'
import { useParams } from 'react-router-dom'
import { GLOBAL_URL, SOCKET_URL } from '../../../../config';
import {io} from 'socket.io-client'
import { useState } from 'react';
import axios from 'axios';
import { Card, CardBody, Typography } from '@material-tailwind/react';
import QuestionForm from '../../../../questionPosing/questionForm';
const socket = io(SOCKET_URL)
const res = {
  headers: {
    "Content-type": "application/json",
  }
}




const Allowed = () => {

  const params = useParams();

  function socketBroadcast(){
    console.log("Send update to teacher interface using socket")
    socket.emit(params.sessionid +'teacherstateUpdate', {fetch:true})
  }

  const [sessionData, setSession] = useState(null)

  async function getSession(){
    let payload = await axios.post(GLOBAL_URL +'session/get', {_id:params.sessionid}, res)
    try{
      payload = payload.data.data
      setSession(payload)
    }
    catch (e){
      console.log('Error fetching data')
    }
  }


  if (sessionData == null){
    getSession()
  }
  socket.on(params.sessionid + 'student' +'stateUpdate', (args)=>{
    getSession() //perform request everytime socket broadcast is received
  })

  console.log(sessionData?.current_activity == 'Question Answering')


  return (
   <div>

    <div className='flex flex-col items-center justify-center min p-10'>
    <Card>
      <CardBody>
            <Typography variant = 'h4'>
              Current Activity is {sessionData?.current_activity}
            </Typography>
      <hr/>
      {
        sessionData?.current_activity == 'Deliver Content'?
        (
          <Typography>Teacher is delivering lecture. Please await further action</Typography>
        )
        :
        (sessionData?.current_activity == 'Question Posing'?
            (
              <>
              <Typography>Teacher is accepting questions. Please submit question</Typography>
              <QuestionForm onSubmit={socketBroadcast} iteration = {sessionData.iterationIndex}></QuestionForm>
              </>
            )
        :
        (sessionData?.current_activity == 'Prioritization'?
        (<>
          <Typography>Please prioritize these other questions</Typography>
        </>)
        :
        (sessionData?.current_activity == 'Question Answering')?
        (
          <Typography>
            Here are the questions teacher is answering
          </Typography>
        )
        :''
        )
        )
      }

      </CardBody>
    </Card>
    </div>
   </div> 
  )
}

export default Allowed