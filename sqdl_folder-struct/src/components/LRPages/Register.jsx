import React, { useRef } from 'react';

import Input from '../Helper/Input';

import { set, check } from '../Cookies';
import axios from 'axios';

const Register = ({ display, handler }) => {

  const nameRef = useRef("");
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const cpasswordRef = useRef("");
  const enroRef = useRef("");
  const rnoRef = useRef("");
  const yearRef = useRef("");
  const semRef = useRef("");
  const divRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = {
      headers: {
        "Content-type": "application/json"
      }
    }

    axios
      .post(
        `http://localhost:5000/api/v1/user/signup`,
        { 
          email: emailRef.current.value,
          name: nameRef.current.value,
          password: passwordRef.current.value,
          enrollment: enroRef.current.value,
          rollNumber: rnoRef.current.value,
          year: yearRef.current.value,
          semester: semRef.current.value,
          division: divRef.current.value,
        },
        res
      ).then(response => {
        console.log(response);
        set(response.data.data);
        window.location.href = '/dashboard';
      }).catch(error => {
        console.log(error)
      })
  }



  return (
    <div className={`flex flex-col h-screen text-center bg-white md-1/2:w-[30%] w-[80%] justify-center ${display}`}>
      <h1 className='text-5xl text-dark-gray font-montserrat font-extrabold my-6'>Register</h1>
      <form className='flex flex-col gap-5 mx-auto items-center w-60 '>
        <Input placeholder="Name" type='text' inputRef={nameRef}/>
        <Input placeholder="Email" type='email' inputRef={emailRef}/>
        <Input placeholder="Password" type='password' inputRef={passwordRef}/>
        <Input placeholder="Confirm Password" type='password' inputRef={cpasswordRef}/>
        <Input placeholder="Enrollment Number" type='text' inputRef={enroRef}/>
        <Input placeholder="Roll No (Example: 753)" type='Number' inputRef={rnoRef}/>
        <select ref={yearRef} className='cursor-pointer w-full'>
          <option selected>Select Your Year</option>
          <option value="F.E">F.E</option>
          <option value="S.E">S.E</option>
          <option value="T.E">T.E</option>
          <option value="B.E">B.E</option>
        </select>
        <Input placeholder="Semester" type="number" inputRef={semRef} />
        <select ref={divRef} className='cursor-pointer w-full'>
          <option selected>Choose your Division</option>
          <option>A</option>
          <option>B</option>
          <option>N/A</option>
        </select>
        {/* <Input placeholder="Division" type="text" inputRef={divRef} /> */}
        <button 
          type='submit' 
          onClick={handleSubmit}
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