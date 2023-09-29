import React from 'react';

import Input from '../Helper/Input';

const Register = ({ display, handler }) => {
  return (
    <div className={`flex flex-col h-screen text-center bg-lightesh-gray md-1/2:w-[30%] w-[80%] justify-center ${display}`}>
      <h1 className='text-5xl text-dark-gray font-montserrat font-extrabold mt-6 mb-10'>Register</h1>
      <form className='flex flex-col gap-8 mx-auto items-center w-60 '>
        <Input placeholder="Name" type='text' />
        <Input placeholder="Email" type='email' />
        <Input placeholder="Password" type='password' />
        <Input placeholder="Confirm Password" type='password' />
        <Input placeholder="Enrollment Number" type='text' />
        <Input placeholder="Roll No" type='Number' />
        <button type='submit' 
          className='w-[75%] py-3 px-10 bg-greenish-blue text-lightesh-gray font-lg font-bold rounded-xl
          hover:shadow-xl'>
          Register
        </button>
        <button type='button' 
          onClick={handler}
          className='w-[75%] py-3 px-10 bg-greenish-blue text-lightesh-gray font-lg font-bold rounded-xl
          hover:shadow-xl md-1/2:hidden block'>
          SignIn
        </button>
      </form>
    </div>
  )
}

export default Register