import React from 'react'
import { useState } from 'react'
import {Outlet, useParams} from 'react-router-dom'
import axios from 'axios'
import { GLOBAL_URL } from '../../config'
import {check,set} from '../../Cookies'
import { Input, Typography, Textarea, Card, Button, Breadcrumbs } from '@material-tailwind/react'








const Module = () => {
  const params = useParams();
  
  //headers for axios requests
  const res = { 
    headers: {
      "Content-type": "application/json",
    }
  }

  //component state
  const [module, setModule] =  useState({
    name: '',         //module name
    description: '',  //module description
    createdBy: '',    //module creator
    _id: params.moduleid,          //module id --> obtained from url params
    parentSubject: {
      name: '', //name of parent Subject
      description: '', //description of parent subject
      createdBy: '', //creator of parent subject
      _id: params.subjectid //subject id --> obtained from url params
      },
    childSession:[], //list of dicitionaries of child sessions
    fetched: false //variable to indicate whether data has been requested from server
  });


  async function getAllData(){
    var newmod = module //setting a copy of the component state

    
    //fetching user data
    axios.post(GLOBAL_URL + 'user/getID', { _id: check()._id }, res)
    .then((response)=>{
      console.log(response)
      set(response.data.data)
      if (!(response.data.data.subjects).includes(params.subjectid)){
        console.log('not in user subject')
        window.location.href = '/course' //redirect user to /course route if current course not enrolled for
      }
    })
    .then(()=>{ //requesting subject data
      return axios.post(GLOBAL_URL + 'subject/getByID', { _id: params.subjectid }, res)
    })
    .then((response) => {
      console.log(response)
      //updating duplicate state hook
      newmod.parentSubject.name = response.data.data.name
      newmod.parentSubject._id = response.data.data._id
      newmod.parentSubject._id = response.data.data._id
      newmod.parentSubject.description = response.data.data.description
      newmod.parentSubject.createdBy = response.data.data.createdBy
    })
    .then(()=>{ //requesting moduledata
      return axios.post(GLOBAL_URL + 'module/getID', { _id: params.moduleid }, res)
    })
    .then((response) => {       //updating duplicate state hook
      console.log(response)
      newmod.name = response.data.data.name
      newmod.description = response.data.data.description
      newmod.createdBy = response.data.data.createdBy

    })
    .then(()=>{
      newmod.fetched = true
      setModule({ ...newmod })
    })
    .catch((error) => {
      console.log(error)
    })
  }

  if (!module.fetched){
    getAllData()
  }
  return (
   <>
      <div className='align-center p-10 flex flex-col items-center h-screen '>
        <div className=''>
          <Breadcrumbs className=''>
            <a href="/course" className="opacity-60">
              Courses
            </a>
            <a href={"/course/" + params.subjectid} className="opacity-60">
              {module.parentSubject.name}
            </a>
            <a href={'/course/'+params.subjectid+'/'+params.moduleid} className=''>
              <span className='text-blue-300'>
              {module.name}
              </span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <Card className="mt-6 w-2/5 p-5">
          <div className='text-center'>
            <Typography variant='h3'>
              {module.name}
            </Typography>
            <a href={'/course/' + module.parentSubject._id}>
              <Typography variant='paragraph'>{module.parentSubject.name}</Typography>
            </a>
            <Typography variant='paragraph' className='text-left'>{module.description}</Typography>
            <br/>
            <Typography variant='h6' className='text-left text-black-200'>
              Sessions
            </Typography>
            Load Session Cards here
          </div>
        </Card>
      </div>
   </>
  )
}

export default Module