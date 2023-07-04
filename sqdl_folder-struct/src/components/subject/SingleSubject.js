import React from 'react'
import { Outlet } from 'react-router-dom'

const SingleSubject = () => {
  console.log('Outlet working')
  return (
    <>
      <Outlet />
      <div>SingleSubject</div>
    </>
  )
}

export default SingleSubject