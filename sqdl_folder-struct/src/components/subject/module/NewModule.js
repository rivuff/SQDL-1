import React from 'react'
import { Outlet } from 'react-router-dom'
import { Input, Typography, Textarea, Card, Button, Breadcrumbs } from '@material-tailwind/react'
import { useParams } from 'react-router-dom'
import {check, set} from '../../Cookies'
import axios from 'axios'
import { GLOBAL_URL } from '../../config'
import { useState } from 'react'
const NewModule = () => {
  const subjectid = useParams().subjectid
  const [module,setModule] = useState({
    name: '',
    description: '',
    createdBy: check()._id,
    fetched: false,
    subject:{
      name:'',
      _id: subjectid,
    },
    msg: '',
    disabled: false
  })
  async function getSubjectInfo(){
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    axios.post(GLOBAL_URL +'subject/getByID', {_id: subjectid}, res)
    .then((response)=>{
      console.log(response.data.data)
      if (response.data.data.createdBy!=check()._id){//if user id not the smae as subject creator id - cannot make module
        console.log('Not the owner of model')
        window.location.href = '/course'
      }
      const newmod = module
      newmod.subject.name = response.data.data.name
      newmod.subject._id = response.data.data._id
      newmod.fetched = true
      setModule(newmod)
      console.log(module)
    })
    .catch((error)=>{
      console.log(error)
    })
    return null
  }

  async function submissionHandler(){
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    axios.post(GLOBAL_URL + 'module/create', { name: module.name, description: module.description, createdBy:module.createdBy, parentSubject:module.subject._id }, res)
      .then((response => {
        console.log(response)
        setModule({ ...module, disabled: true, msg: 'Created Module Successfully' })
        //add too cookie
        window.location.href = '/course/'+subjectid+'/' + response.data.data._id
      }))
      .catch((error) => {
        console.log(error)
        setModule({ ...module, msg: error.message })
      })
  }
  if(!module.fetched){
    getSubjectInfo()
  }

  if (check() == null) {
    window.location.href = '/login'
  }
  else if (check().type != 'teacher') {
    return 'Must be a teacher to access this page'
  }
  else {
    if (!module.fetched){
      getSubjectInfo()
    }
    return (
      <div className='align-center p-10 flex flex-col items-center h-screen '>
        <div className=''>
          <Breadcrumbs className=''>
            <a href="/course" className="opacity-60">
              Courses
            </a>
            <a href={"/course/" + subjectid} className="opacity-60">
              {module.subject.name}
            </a>
            <a href="#" className=''>
              <span className='text-blue-300'>New Module</span>
            </a>
          </Breadcrumbs>
        </div>
        <br/>
        <div className='border-blue-400 border-4 rounded-lg p-5 py-10 items-center justify-center flex'>
          <Card color="transparent" shadow={false}>
            <Typography variant='h4' className='text-center text-black'>
              New Module
            </Typography>
            <form className='mt-8 mb-2 w-80 max-w-screen-lg sm:w-96'>
              <div className='mb-4 flex flex-col gap-6'>
                <Input label='Name' value={module.name} onChange={(e)=>{setModule({...module, name:e.target.value})}}></Input>
                <Textarea label='Description' value={module.description} onChange={(e) => { setModule({ ...module, description: e.target.value }) }}></Textarea>
                <Button disabled = {(module.name=='')||(module.description== '')||module.disabled}onClick={()=>{submissionHandler()}}>Create</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    )
  }
}


export default NewModule