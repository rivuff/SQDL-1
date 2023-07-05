import {
    Card,
    Input,
    Button,
    Typography,
    input,
} from "@material-tailwind/react";
import React from "react";
import axios from 'axios'
import { useState, useEffect } from 'react'
import { UserState } from "../../context/contextProvider.js";
import {check, set} from './../Cookies.js'
import {GLOBAL_URL} from '../config.js'
export default function Login() {
  console.log(GLOBAL_URL)
    //console.log(UserState);
   const {logged, setLogged} = UserState();
    //initializing states
    const [useEmail, setUseEmail] = useState(true);
    // let [formData, setData] = useState({
    //     email : '',
    //     password : '',
    //     errmsg: ''
    // })

    const [formData, setFormData] = useState({
        email: '',
        studentId: '',
        password: '',
        errmsg: '',
      });
     

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
          errmsg: '',
        }));
      };

    const loginHandler = async(e)=>{
        e.preventDefault();

        try {
            const res ={
                headers:{
                    "Content-type":"application/json",
                }
            }

            let data;
            if (useEmail) {
                data = await axios.post(
                  GLOBAL_URL+`user/login`,
                  { email: formData.email, password: formData.password },
                  res
                );
              } else {
                data = await axios.post(
                  GLOBAL_URL`user/login`,
                  { studentId: formData.studentId, password: formData.password },
                  res
                );
              }
            
            data = await axios.post(GLOBAL_URL+`user/login`, {email: formData.email, password:formData.password},res)
            setLogged(true)
            set(data.data.data);
            console.log('Logged In')
            window.location.href = '/dashboard'
            // props.set(true);
        } catch (error) {
            console.log(error);
            setFormData({...formData, errmsg: error.response.data.message})
        }
    }

    
    const {email , password} = formData;


    useEffect(()=>{
        let errmsg = document.getElementById('errmsg')
        let email = formData.email
        console.log()
        if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
            errmsg.style.visibility = 'block'
            errmsg.value = 'Please enter valid email address'
        }
    }, [formData.email])


    return (
        <div className="align-center p-10 flex items-center justify-center h-screen ">
          <div className="border-blue-400 border-4 rounded-lg p-10">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray" className="capitalize">
                Login
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                Enter your details to Login
              </Typography>
              <Typography color="red" className="mt-1 font-normal" id="errmsg">
                {formData.errmsg !== '' ? formData.errmsg : ''}
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id="loginForm">
                <div className="mb-4 flex flex-col gap-6">
                  {useEmail ? (
                    <Input
                      id="email"
                      type="email"
                      label="Email address"
                      size="lg"
                      value={formData.email}
                      name="email"
                      onChange={handleInputChange}
                    ></Input>
                  ) : (
                    <Input
                      id="studentId"
                      type="text"
                      label="Student ID"
                      size="lg"
                      value={formData.studentId}
                      name="studentId"
                      onChange={handleInputChange}
                    ></Input>
                  )}
                  <Input
                    id="password"
                    type="password"
                    label="Password"
                    size="lg"
                    value={formData.password}
                    name="password"
                    onChange={handleInputChange}
                  ></Input>
                </div>
                <Button
                  disabled={
                    formData.errmsg !== '' ||
                    formData.password === '' ||
                    (useEmail && formData.email === '') ||
                    (!useEmail && formData.studentId === '')
                  }
                  className="mt-6 capitalize"
                  fullWidth
                  onClick={loginHandler}
                >
                  Login
                </Button>
              </form>
            </Card>
          </div>
        </div>
      );
    }
    
    // return (
    //     <div className="align-center p-10 flex items-center justify-center h-screen ">
    //         <div className="border-blue-400 border-4 rounded-lg p-10">
    //             <Card color="transparent" shadow={false}>
    //             <Typography variant="h4" color="blue-gray" className='capitalize'>
    //                 Login
    //             </Typography>
    //             <Typography color="gray" className="mt-1 font-normal">
    //                 Enter your details to Login
    //             </Typography>
    //             <Typography color="red" className="mt-1 font-normal" id ='errmsg'>
    //                 {formData.errmsg!=''?formData.errmsg:''}
    //             </Typography>
    //             <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id='loginForm'>
    //                 <div className="mb-4 flex flex-col gap-6">
    //                         <Input id='email' type='email' label="Email address" size='lg' value={formData.email} onChange={(e) => { setData({ ...formData, email: e.target.value, errmsg: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) ? 'Invalid Email Address' :'' })} }></Input>
    //                         <Input id='password' type='password' label="Password" size='lg' value={formData.password} onChange={(e) => setData({...formData, password: e.target.value})}></Input>
    //                 </div>
    //                     <Button disabled={((formData.errmsg != '') || (formData.password == '') || (formData.email == '')) ?true:false} className="mt-6 capitalize" fullWidth onClick={loginhandler}>
    //                     Login
    //                 </Button>

    //             </form>
    //         </Card>
            
    //     </div>
    //     </div>
    // );
//}