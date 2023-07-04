import React from 'react'
import { useState } from 'react'
import {Outlet, useParams} from 'react-router-dom'
import axios from 'axios'

const Module = () => {
  //fetching data
  const params = useParams()
  const [moduleData, setModule] = useState({
    name:'',
    createdBy: '',
    parentSubject: '',
    description: '',
    fetched: false
  })
  if (!moduleData.fetched){
    //fetch moduleData

  }
  return (
   <>
      <div>Module</div>
      <Outlet/>
   </>
  )
}

export default Module