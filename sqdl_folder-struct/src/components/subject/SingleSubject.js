import React from 'react'
import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { GLOBAL_URL } from '../config'
import { check, set } from '../Cookies'
import { Input, Typography, Textarea, Card, Button, Breadcrumbs, Drawer, IconButton } from '@material-tailwind/react'
import { XMarkIcon } from "@heroicons/react/24/outline";


const ModuleCard = ({ obj }) => {
  const params = useParams();
  console.log(obj)
  if (obj== []){
    return null
  }
  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0">
      <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href = {'/course/'+ params.subjectid + '/'+ obj._id}>
          <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-400">{obj.name}</h5>
        </a>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{obj.description}</p>
        <div className="flex-grow"></div> {/* Fill remaining space */}
      </div>
    </div>
  )
}




const SingleSubject = () => {
  const params = useParams();

  //headers for axios requests
  const res = {
    headers: {
      "Content-type": "application/json",
    }
  }

  //component state
  const [subject, setSubject] = useState({
    name: '',         //module name
    description: '',  //module description
    createdBy: '',    //module creator
    _id: params.subjectid,          //module id --> obtained from url params
    childModule: [], //list of dicitionaries of child sessions
    fetched: false //variable to indicate whether data has been requested from server
  });

  //edit drawer state
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  function handleSub() {
    const name = document.getElementById('name').value
    const desc = document.getElementById('desc').value
    axios.post(GLOBAL_URL + 'subject/update', { name: name, description: desc, _id: params.subject })
      .then((response) => {
        setSubject({ ...subject, name: response.data.data.name, description: response.data.data.description })
        closeDrawer()
      })
      .catch((error) => {
        console.log(error)
      })
  }
  async function getAllData() {
    var newsub= subject //setting a copy of the component state
    //fetching user data
    axios.post(GLOBAL_URL + 'user/getID', { _id: check()._id }, res)
      .then((response) => {
        console.log(response)
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
        console.log(response)
        //updating duplicate state hook
        newsub.name = response.data.data.name
        newsub._id = response.data.data._id
        newsub._id = response.data.data._id
        newsub.description = response.data.data.description
        newsub.createdBy = response.data.data.createdBy
      })
      .then(() => { //requesting moduledata
        return axios.post(GLOBAL_URL + 'module/getAllFromSubjectID', { _id: params.subjectid }, res)
      })
      .then((response) => {       //updating duplicate state hook
        console.log(response)
        // push data into child module field
        subject.childModule = response.data.data

      })
      .then(() => {
        newsub.fetched = true
        setSubject({ ...newsub })
        console.log(subject)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  if (subject.fetched !=true) {
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
              {subject.name}
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <Card className="mt-6 w-3/5 p-5">
          <div className='text-center'>
            <Typography variant='h3'>
              {subject.name}
            </Typography>
            <a onClick={openDrawer} href='#'>
              <Typography variant='small' className={(check()._id == subject.createdBy) ? 'text-blue-300' : 'hidden'} >
                Edit
              </Typography>
            </a>



            <hr></hr><br />
            <Typography variant='paragraph' className='text-left'>{subject.description}</Typography>
            <br />
            <hr></hr>

            <Typography variant='h6' className='text-left text-black-200'>
              Modules                
              <Button size='sm' onClick={() => { window.location.href = '/course/' + params.subjectid + '/new' }} className={(check()._id == subject.createdBy) ? 'visible m-2' : 'hidden'} >
                New Module
              </Button>
            </Typography>
            <div>
              {subject.childModule.map((object)=>{
                return(
                  <ModuleCard obj = {object}/>
                )
              })}
            </div>
          </div>
        </Card>
        <Drawer open={open} onClose={closeDrawer} className="p-4">
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Edit Subject
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <form className="flex flex-col gap-6 p-4">
            <Input id='name' label="Name" defaultValue={subject.name} />
            <Textarea id='desc' rows={6} label="Description" defaultValue={subject.description} />
            <Button onClick={() => { handleSub() }}>Update</Button>
          </form>
        </Drawer>
      </div>
    </>
  )
}

export default SingleSubject