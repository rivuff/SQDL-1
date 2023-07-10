import React from 'react'
import { Outlet } from 'react-router-dom'
import { Input, Typography, Textarea, Card, Button, Breadcrumbs } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import { check, set } from '../../../Cookies'
import axios from 'axios'
import { GLOBAL_URL } from '../../../config'
import { useState } from 'react'


const NewSession = () => {
  const subjectid = useParams().subjectid
  const moduleid = useParams().moduleid
  const [session, setSession] = useState({
    title: '',
    description: '',
    createdBy: check()._id,
    fetched: false,
    parentModule: {
      name: '',
      _id: moduleid,
      createdBy: '',
      parentSubject: {
        name: '',
        _id: subjectid,
        description: ''
      }
    },
    msg: '',
    disabled: false
  })
  async function getInfo() {
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    axios.post(GLOBAL_URL + 'module/getID', { _id: moduleid }, res)
      .then((response) => {
        if (response.data.data.createdBy != check()._id) {//if user id not the smae as subject creator id - cannot make module
          console.log('Not the owner of model')
          window.location.href = '/course'
        }
        const newsess = session
        newsess.parentModule.name = response.data.data.name
        newsess.parentModule._id = response.data.data._id
        newsess.parentModule.createdBy = response.data.data.createdBy
        axios.post(GLOBAL_URL + 'subject/getByID', { _id: subjectid }, res)
          .then((response) => {
            newsess.parentModule.parentSubject.name = response.data.data.name
            newsess.parentModule.parentSubject._id= response.data.data._id
            setSession({...newsess, fetched: true})
          })
      })
      .catch((error) => {
        console.log(error)
      })
    return null
  }

  async function submissionHandler() {
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    axios.post(GLOBAL_URL + 'session/create', { title: session.title, description: session.description, createdBy: session.createdBy, parentModule: session.parentModule._id }, res)
      .then((response => {
        console.log(response)
        setSession({ ...module, disabled: true, msg: 'Created Session Successfully' })
        //add too cookie
        window.location.href = '/course/' + subjectid + '/'+moduleid+'/' + response.data.data._id
      }))
      .catch((error) => {
        console.log(error)
        setSession({ ...session, msg: error.message, disabled: true})
      })
  }


  if (check() == null) {
    window.location.href = '/login'
  }
  else if (check().type != 'teacher') {
    return 'Must be a teacher to access this page'
  }
  else {
    if (!session.fetched) {
      getInfo()
    }
    return (
      <div className='align-center p-10 flex flex-col items-center h-screen '>
        <div className=''>
          <Breadcrumbs className=''>
            <a href="/course" className="opacity-60">
              Courses
            </a>
            <a href={"/course/" + subjectid} className="opacity-60">
              {session.parentModule.parentSubject.name}
            </a>
            <a href={"/course/" + subjectid} className="opacity-60">
              {session.parentModule.name}
            </a>
            <a href="#" className=''>
              <span className='text-blue-300'>New Session</span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <div className='border-blue-400 border-4 rounded-lg p-5 py-10 items-center justify-center flex'>
          <Card color="transparent" shadow={false}>
            <Typography variant='h4' className='text-center text-black'>
              New Session
            </Typography>
            <span className='text-red-600 text-center'>
              {session.msg}
            </span>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
              <div className='mb-4 flex flex-col gap-6'>
                <Input label='Name' value={session.title} onChange={(e) => { setSession({ ...session, title: e.target.value, disabled: false }) }}></Input>
                <Textarea label='Description' value={session.description} onChange={(e) => { setSession({ ...session, description: e.target.value, disabled:false }) }}></Textarea>
                <Button disabled={(session.title == '') || (session.description == '') || session.disabled} onClick={() => { submissionHandler() }}>Create</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}


export default NewSession