import React from 'react'
import { useState } from 'react'
import {Outlet, useParams} from 'react-router-dom'
import axios from 'axios'

const Module = () => {
  //get params
  const params = useParams()
  console.log(params)
  //fetching data
  const [moduleData, setModule] = useState({
    name:'',
    createdBy: '',
    parentSubject: '',
    description: '',
    fetched: false
  })
  if (!moduleData.fetched){
    //fetch moduleData

    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    axios.post('http://localhost:5000/api/v1/module/getModuleById',{_id: params.moduleid} )
    .then((response)=>{
      console.log(response)
    })
    .catch((error)=>{
      console.log(error)
    })
  }
  return (
   <>
      <Outlet />
      <div>Module</div>
   </>
  )
}

export default Module