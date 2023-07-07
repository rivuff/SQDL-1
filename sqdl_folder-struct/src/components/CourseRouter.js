import React from 'react'
import { Outlet } from 'react-router-dom'
import {check} from './Cookies'
const CourseRouter = () => {
  const user = check()

  if (user == null){
    // window.location.href = '/login'
    return null
  }
  
  return (<Outlet user/>)
}

export default CourseRouter