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
import {check, set} from './../Cookies'

const Student = () => {
  const userData = check();
  const [state, setState] = useState({
    editing: false,
    name: userData.name,
    email: userData.email,
    enrollmentNumber: userData.enrollmentNumber,
    rollNumber: userData.rollNumber,
    type: userData.type,
    errmsg: ''
  })

  async function updateHandler() {
    let submissionData = userData
    submissionData = { ...submissionData, name: state.name, email: state.email, rollNumber: state.rollNumber, enrollmentNumber: state.enrollmentNumber }
    console.log(submissionData)
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    //posting data to the server
    axios.post(`http://localhost:5000/api/v1/user/update`, JSON.stringify(submissionData), res)
      .then((response) => {
        console.log(response.data.data)
        setState({ ...state, name: response.data.data.name, email: response.data.data.email, enrollmentNumber: response.data.data.enrollmentNumber, rollNumber:response.data.data.rollNumber,  editing: false })//update other fields with returned response data
        //update cookie
        set(response.data.data);
      })
      .catch((error) => {
        setState({ ...state, errmsg: error.message })
      })
  }
  return (
    <div className="align-center p-10 flex items-center justify-center ">
      <div className="border-blue-400 border-4 rounded-lg p-10" >
        <Card className='w-96'>
          <CardHeader floated={false} className="h-80">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-45 h-45">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>

          </CardHeader>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              {userData.name}
            </Typography>
            <Typography color="blue" className="font-medium" textGradient>
              Student
            </Typography>
            <div>
              <Typography className={state.errmsg == '' ? 'hidden' : 'visible text-red-800'}>
                {state.errmsg}
              </Typography>
              <div className='p-2'>
                <Input label='Name' value={state.name} disabled={state.editing ? false : true} onChange={(e) => { setState({ ...state, name: e.target.value }) }}></Input>
              </div>
              <div className='p-2'>
                <Input label='Email' value={state.email} disabled={state.editing ? false : true} onChange={(e) => { setState({ ...state, email: e.target.value }) }}></Input>
              </div>
              <div className='p-2'>
                <Input label='Enrollment Number' value={state.enrollmentNumber} disabled={state.editing ? false : true} onChange={(e) => { setState({ ...state, enrollmentNumber: e.target.value }) }}></Input>
              </div>
              <div className='p-2'>
                <Input label='Roll Number' value={state.rollNumber} disabled={state.editing ? false : true} onChange={(e) => { setState({ ...state, rollNumber: e.target.value }) }}></Input>
              </div>
              <Button color={state.editing ? 'red' : 'blue'} onClick={() => { setState({ ...state, editing: !state.editing, errmsg: '' }); }}>{state.editing ? 'Discard' : 'Edit'}</Button>
              <Button className={state.editing ? 'visible' : 'hidden'} onClick={() => { updateHandler() }}>Save</Button>
            </div>
          </CardBody>
        </Card>
      </div>
      <div className="p-10 w-2/3" >
        <Card className='w-192'>
          <CardBody className="text-center">
            <Typography variant="h4" color="blue-gray" className="mb-2">
              Enrolled Subjects
            </Typography>
            <div>

            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}

export default Student