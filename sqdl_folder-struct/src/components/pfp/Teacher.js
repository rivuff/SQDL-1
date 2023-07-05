import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Input,
    Button
} from "@material-tailwind/react";
import { useState } from 'react';
import axios from 'axios';
import StudentSubjects from './StudentSubjects';
import {check, set} from '../Cookies'
import { GLOBAL_URL } from '../config';

const Teacher = () => {
    const userData = check()
    const [state, setState] =  useState({
        editing: false,
        name:userData.name,
        email:userData.email,
        enrollmentNumber:userData.enrollmentNumber,
        rollNumber:userData.rollNumber,
        type:userData.type,
        errmsg: ''
    })

    async function updateHandler() {
        let submissionData = userData
        submissionData = { ...submissionData, name: state.name, email:state.email}
        console.log(submissionData)
        const res = {
            headers: {
                "Content-type": "application/json",
            }
        }
        //posting data to the server
        axios.post(GLOBAL_URL + `user/update`, JSON.stringify(submissionData), res)
            .then((response) => {
                console.log(response.data.data)
                setState({ ...state, name: response.data.data.name, email: response.data.data.email, editing: false})//update other fields with returned response data
                //update cookie
                set(response.data.data);
            })
            .catch((error) => {
                setState({ ...state, errmsg:error.message})
            })
    }
  return (
      <div className="align-center p-10 flex items-center justify-center ">
          <div className="border-blue-400 border-4 rounded-lg p-10" >
              <Card className='w-96'>
                  <CardHeader floated={false} className="h-80">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-45 h-45">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                      </svg>
                  </CardHeader>
                  <CardBody className="text-center">
                      <Typography variant="h4" color="blue-gray" className="mb-2">
                          {userData.name}
                      </Typography>
                      <Typography color="blue" className="font-medium" textGradient>
                          Teacher
                      </Typography>
                      <div>
                            <Typography className={state.errmsg == ''?'hidden':'visible text-red-800'}>
                                {state.errmsg}
                            </Typography>
                          <div className='p-2'>
                              <Input label='Name' value = {state.name}disabled= {state.editing?false:true} onChange={(e)=>{setState({...state, name: e.target.value})}}></Input>
                          </div>
                          <div className='p-2'>
                              <Input label='Email' value={state.email} disabled={state.editing ? false : true} onChange={(e) => { setState({ ...state, email: e.target.value }) }}></Input>
                          </div>
                          <Button color = {state.editing?'red':'blue'}onClick={() => { setState({ ...state, editing: !state.editing, errmsg:'' }); }}>{state.editing?'Discard':'Edit'}</Button>
                          <Button className = {state.editing?'visible':'hidden'}onClick={() => { updateHandler()}}>Save</Button>
                      </div>
                  </CardBody>
              </Card>
        </div>
        <div className="p-10 w-2/3" >
            <Card className='w-192'>
                  <CardBody className="text-center">
                      <Typography variant="h4" color="blue-gray" className="mb-2">
                         Subjects
                          <div>
                              <StudentSubjects array={userData.subjects} />
                          </div>
                      </Typography>
                      <div>
                        <a href = '/course/new'>
                              <Button>New Subject</Button>
                        </a>
                      </div>
                  </CardBody>
            </Card>
        </div>
    </div>
  )
}

export default Teacher