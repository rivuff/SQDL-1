import React from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { GLOBAL_URL } from '../../../config'
import { check, set } from '../../../Cookies'
import { Input, Typography, Textarea, Card, Button, Breadcrumbs, Drawer, IconButton } from '@material-tailwind/react'
import { XMarkIcon } from "@heroicons/react/24/outline";





const Session = () => {
  const params = useParams();

  //headers for axios requests
  const res = {
    headers: {
      "Content-type": "application/json",
    }
  }

  //component state
  const [session, setSession] = useState({
    title: '',         //module name
    description: '',  //module description
    createdBy: '',    //module creator
    _id: params.sessionid,          //module id --> obtained from url params
    parentModule: {
      name: '', //name of parent Subject
      description: '', //description of parent subject
      createdBy: '', //creator of parent subject
      _id: params.moduleid, //subject id --> obtained from url params
      parentSubject:{
        name: '',
        _id: params.subjectid
      }
    },
    childSession: [], //list of dicitionaries of child sessions
    fetched: false //variable to indicate whether data has been requested from server
  });

  //edit drawer state
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  function handleSub() {
    const title = document.getElementById('title').value
    const desc = document.getElementById('desc').value
    axios.post(GLOBAL_URL + 'session/update', { title: title, description: desc, _id: params.sessionid })
      .then((response) => {
        console.log(response)
        setSession({ ...session, title: response.data.data.title, description: response.data.data.description })
        closeDrawer()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  async function getAllData() {
    var newsess = session //setting a copy of the component state


    //fetching user data
    axios.post(GLOBAL_URL + 'user/getID', { _id: check()._id }, res)
      .then((response) => {
        set(response.data.data)
        if (!(response.data.data.subjects).includes(params.subjectid)) {
          console.log('not in user subject')
          window.location.href = '/course' //redirect user to /course route if current course not enrolled for
        }
      })
      .then(() => { //requesting subject data
        return axios.post(GLOBAL_URL + 'subject/getByID', { _id: params.subjectid }, res)
      })
      .then((response) => {
        //updating duplicate state hook
        newsess.parentModule.parentSubject.name = response.data.data.name
        newsess.parentModule.parentSubject._id = response.data.data._id
      })
      .then(() => { //requesting moduledata
        return axios.post(GLOBAL_URL + 'module/getID', { _id: params.moduleid }, res)
      })
      .then((response) => {       //updating duplicate state hook
        newsess.parentModule.name = response.data.data.name
        newsess.parentModule.description = response.data.data.description
        newsess.parentModule.createdBy = response.data.data.createdBy
      })
      .then(() => { //requesting sessiondata
        return axios.post(GLOBAL_URL + 'session/getID', { _id: params.sessionid }, res)
      })
      .then((response) => {       //updating duplicate state hook
        newsess.title = response.data.data.title
        newsess.description = response.data.data.description
        newsess.createdBy = response.data.data.createdBy
      })
      .then(() => {
        newsess.fetched = true
        console.log(newsess)
        setSession({ ...newsess })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (!session.fetched) {
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
              {session.parentModule.parentSubject.name}
            </a>
            <a href={'/course/' + params.subjectid + '/' + params.moduleid} className='opacity-60'>
                {session.parentModule.name}
            </a>
            <a href={'/course/' + params.subjectid + '/' + params.moduleid + '/'+params.moduleid} className=''>
              <span className='text-blue-300'>
                {session.title}
              </span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <Card className="mt-6 w-2/5 p-5">
          <div className='text-center'>
            <Typography variant='h3'>
              {session.title}
            </Typography>
            <a href={'/course/' + session.parentModule._id}>
              <Typography variant='paragraph' className='text-blue-400'>{session.parentModule.name}</Typography>
            </a>
            <a onClick={openDrawer} href='#'>
              <Typography variant='small' className={(check()._id == session.createdBy) ? 'text-blue-300 underline' : 'hidden'} >
                Configure
              </Typography>
            </a>
            <hr></hr><br />
            <Typography variant='paragraph' className='text-left'>{session.description}</Typography>
            <br />
            <hr></hr>

           
          </div>
        </Card>
        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Edit Session Configuration
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <form className="flex flex-col gap-6 p-4">
            <Input id='title' label="Name" defaultValue={session.title} />
            <Textarea id='desc' rows={6} label="Description" defaultValue={session.description} />
            <Button onClick={() => { handleSub() }}>Update</Button>
          </form>
        </Drawer>
      </div>
    </>
  )
}

export default Session