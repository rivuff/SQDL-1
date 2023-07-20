import {React, useState} from 'react'
import { XMarkIcon } from "@heroicons/react/24/outline";
import {Drawer, Spinner, Typography, IconButton, Button} from '@material-tailwind/react';
import { GLOBAL_URL } from '../../../../config';
import { useParams } from 'react-router-dom';
import axios from 'axios';
const res = {
  headers: {
    "Content-type": "application/json",
  }
}


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

  async function statusChangeHandler(e, _id){
    const status = e.target.value
    let approved = sessionData.approved_request
    let req = sessionData.access_request
    let blocked = sessionData.blocked_request
    //get user data data
    let user = await axios.post(GLOBAL_URL+'user/getID', {_id:_id}, res)
    user = user.data.data

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
    let subjects = user.subjects
    let allowedBy = user.allowedBy
    try{
      let index = subjects.indexOf(params.subjectid)
      subjects.splice(index, 1);
      index = allowedBy.indexOf(sessionData.createdBy)
      allowedBy.splice(index,1)
    }
    catch(error){
      console.log('Passing case')
    }
    if (status == 'approved'){
      approved.push(_id)
      subjects.push(params.subjectid)
      allowedBy.push(sessionData.createdBy)
    }else if (status == 'requested'){
      req.push(_id)
    }else if (status == 'blocked'){
      blocked.push(_id)
    }
    console.log(approved, req, blocked)
    //send updated session Data to server
    let payload = await axios.post(GLOBAL_URL +'session/update', {_id: params.sessionid, access_request: req, approved_request: approved, blocked_request: blocked}, res)
    payload = payload.data.data
    
    
    //change user data 
    let response = await axios.post(GLOBAL_URL + 'user/update', {_id:_id, allowedBy:allowedBy, subjects:subjects })
    console.log(response)
    setSession(payload)
  }

  if (sessionData == null){
    getSession()
  }
  else{
    if (students.length == 0){
      getStudents()
    }
  }

  return (    
    <div>
    <Button onClick={openDrawer}>Manage Students</Button>
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