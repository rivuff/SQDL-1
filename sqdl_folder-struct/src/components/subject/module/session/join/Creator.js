import {React, useState} from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import {Drawer, Spinner, Typography, IconButton, Button, Card, CardHeader, CardBody} from '@material-tailwind/react';
import { GLOBAL_URL, SOCKET_URL } from '../../../../config';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {io} from 'socket.io-client'


const res = {
  headers: {
    "Content-type": "application/json",
  }
}

const socket = io(SOCKET_URL)

const Creator = () => {

  const params = useParams();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [sessionData, setSession] = useState()
  const [students, setStudents] =  useState([])

  
  async function getSession(){
    let session = await axios.post(GLOBAL_URL + 'session/get', { _id: params.sessionid }, res)
    session = session.data.data
    setSession(session)
  }

  async function getStudents(){
    let studentList = sessionData.access_request
    if (sessionData.approved_request.length !=0)
    {studentList.push(sessionData.approved_request)    }
    if (sessionData.blocked_request.length !=0) { studentList.push(sessionData.blocked_request) }
    let payload = await axios.post(GLOBAL_URL+'user/getIDs', {_ids: studentList}, res)
    payload = payload.data.data
    setStudents(payload)
  }

  if (sessionData!=null){
    //emit sessionData everytime component experiences change
    socket.emit("serversession"+sessionData?._id, sessionData);
  }

  async function statusChangeHandler(e, _id){
    const status = e.target.value
    let approved = sessionData.approved_request
    let req = sessionData.access_request
    let blocked = sessionData.blocked_request
    try{ //drop element from approved 
      let index = approved.indexOf(_id)
      approved.splice(index, 1)
    }
    catch(error){
      console.log(error)
    }    try{ //drop element from blocked
      let index = blocked.indexOf(_id)
      blocked.splice(index, 1)
    }
    catch(error){
      console.log(error)
    }    try{ //drop element from requested 
      let index = req.indexOf(_id)
      req.splice(index, 1)
    }
    catch(error){
      console.log(error)
    }
    if (status == 'approved'){
      approved.push(_id)
    }else if (status == 'requested'){
      req.push(_id)
    }else if (status == 'blocked'){
      blocked.push(_id)
    }
    console.log(approved, req, blocked)
    //send updated session Data to server
    let payload = await axios.post(GLOBAL_URL +'session/update', {_id: params.sessionid, access_request: req, approved_request: approved, blocked_request: blocked}, res)
    payload = payload.data.data
    setSession(payload)
  }

  async function activityChange(){
    let current = sessionData.current_activity
    if (current == null){
      current = sessionData.activity_order[0]
      console.log(current)
    }
    else{
      //find index of current activity
      let index = sessionData.activity_order.indexOf(current)
      if (index == sessionData.activity_order.length -1){
        //don't do anything
      }
      else{
        current = sessionData.activity_order[index+1]
      }
    }
    //update session
    let response = await axios.post(GLOBAL_URL + 'session/update', {_id: params.sessionid, current_activity:current},res)
    setSession(response.data.data)
  }

  if (sessionData == null){
    getSession()
  }
  else{
    if (students.length == 0){
      getStudents()
    }
  }
  socket.on('clientsession' + sessionData?._id, (arg) => {
    console.log(arg)
  })
  return (    
    <div>
        <div>
          <br/>
        <div className='flex flex-col items-center justify-center'>
          <Card className='w-3/5 text-center'>

              <CardBody>
              <Typography variant='h4'>
                {sessionData?.title}           <Button  size = 'sm' onClick={openDrawer}>Students</Button>

              </Typography>
              <br/>
              Current Acitivity: {sessionData?.current_activity}<br/>
              <Button size='sm' onClick={() => { activityChange()}}>{sessionData?.current_activity == null?'Start Activity': 'Next Activity'}</Button>
              <br/>
              <Button size='sm' color='red'>End Session</Button>
              </CardBody>
          </Card>
          <br/>

        </div>
        
      </div>
    



      <Drawer open={open} onClose={closeDrawer} className="p-4" placement = 'left'>
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Students
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div className="flex flex-row overflow-y-auto w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-2/3">
                    Name
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-1/3">
                    Permission
                  </th>
              </tr>
            </thead>
            <tbody>
              {students.length !=0?
                students.map((student) => {
                  return (
                    <tr>
                      <td>{student.name}</td>
                      <td>
                        <select defaultValue={sessionData.approved_request.includes(student._id) ? 'approved' : (sessionData.blocked_request.includes(student._id) ?'blocked':'requested')}
                          onChange={(e)=>{statusChangeHandler(e, student._id)}}
                        >
                          <option value={'approved'}>Approved</option>
                          <option value={'requested'}>Requested</option>
                          <option value={'blocked'}>Blocked</option>
                        </select>
                        </td>
                    </tr>
                  )
                }):
                  <tr> <Spinner/></tr>
                
              }
            </tbody>
          </table>
        </div>
      </Drawer>
    </div>
  )
}

export default Creator