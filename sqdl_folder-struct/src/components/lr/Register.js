import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import { Link, useSearchParams } from 'react-router-dom';
import React from "react";
import axios from "axios";
import {useState, useEffect} from 'react'
import { set, check } from './../Cookies'
import { useNavigate } from "react-router-dom";

// function registerhandler(formData){

// }

export default function Register() {
    //check if user is logged in
    if (check() != null) {
        window.location.href = '/dashboard'
    }
    //defining statehook
    const [formData, setData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: '',
        enrollment: '',
        rollno: '',
        errmsg: ''
     })
     //defining errorhook


    const registerhandler = async(e)=>{
        let success = false;
        e.preventDefault();

        const {name, email, password, enrollment, rollno} = formData;

            const res = {
                headers:{
                    "Content-type":"application/json",
                },
            };

            axios.post(`http://localhost:5000/api/v1/user/signup`, {email, name, password, enrollment, rollno}, res)
            .then((response)=>{
                //setting data in local storage
                // set(response.data.data);
                // window.location.href = '/dashboard'
                console.log(response.data.data);
            })
            .catch((error)=>{
                console.log(error)
                setData({...formData, errmsg: error.response.data.message})
            })

    }

    return (
        <div className="align-center p-10 flex items-center justify-center h-screen ">
            <div className="border-blue-400 border-4 rounded-lg p-10">
                <Card color="transparent" shadow={false} >
                    <Typography variant="h4" color="blue-gray" className='capitalize'>
                        Student Registration
                    </Typography>
                    <Typography color="gray" className="mt-1 font-normal">
                        Enter your details to Sign Up
                    </Typography>
                    <Typography color="red" className="mt-1 font-normal max-w-sm" id='errmsg'>
                        {formData.errmsg != '' ? formData.errmsg : ''}
                    </Typography>
                    <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id='loginForm'>
                        <div className="mb-4 flex flex-col gap-6">
                            <Input id='name' type='text' label="Name" size='lg' value={formData.name} onChange={(e) => setData({ ...formData, name: e.target.value })}></Input>
                            <Input id='email' type='email' label="Email address" size='lg' value={formData.email} onChange={(e) => { setData({ ...formData, email: e.target.value, errmsg: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) ? 'Invalid Email Address' : '' }) }}></Input>
                            <Input id='password' type='password' label="Password" size='lg' value={formData.password} onChange={(e) => setData({ ...formData, password: e.target.value, errmsg: (e.target.value.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/))?'':'Password must be between 6-14 characters, have at least one uppercase letter, lower case letter and number' })}></Input>
                            <Input id='cpassword' type='password' label="Confirm Password" size='lg' value={formData.cpassword} onChange={(e) => setData({ ...formData, cpassword: e.target.value, errmsg:(document.getElementById('password').value!=document.getElementById('cpassword').value)?'Passwords do not match':'' })}></Input>
                            <Input id='enrollment' type='text' label="Enrollment Number" size='lg' value={formData.enrollment} onChange={(e) => setData({ ...formData, enrollment: e.target.value })}></Input>
                            <Input id='rollno' type='text' label="Roll no" size='lg' value={formData.rollno} onChange={(e) => setData({ ...formData, rollno: e.target.value })}></Input>
                        </div>
                        <Button disabled={((formData.errmsg != '') || (formData.password == '') || (formData.email == '')||(formData.cpassword == '')||(formData.rollno == '')|| (formData.enrollment == '')) ? true : false} className="mt-6 capitalize" fullWidth onClick= {registerhandler}>
                            Register
                        </Button>

                    </form>
                    <Typography color="gray" className="mt-1 font-normal">
                        Already have an account? <Link to ='/login' className="hover:text-blue-800 text-blue-500 transition-colors">Login here</Link>
                    </Typography>
                </Card>

            </div>
        </div>
    );
}