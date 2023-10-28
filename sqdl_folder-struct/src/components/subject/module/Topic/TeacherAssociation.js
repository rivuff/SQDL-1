import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GLOBAL_URL } from '../../../config';
import { useParams } from 'react-router-dom';
import {
    Input,
    Typography,
    Textarea,
    Card,
    Button,
    Breadcrumbs,
    Select,
    Option
  } from "@material-tailwind/react";
import { set } from '../../../Cookies';

function TeacherAssociation() {

  const { subjectid } = useParams();
  console.log(subjectid);
  const [teachers, setTeachers] = useState({allteachers: [], selectedteacher: ''});
  const [subject, setSubject] = useState('');

  useEffect(() => {

    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }

    const getInfo = async() => {
      try {
        const response = await Promise.all([
          axios.get(GLOBAL_URL + "user/getAll", res),
          axios.post(GLOBAL_URL + "subject/getById", { _id: subjectid }, res), 
        ])
        const [userData, subjectData] = response;
        const tchs = userData.data.data.filter(ele => ele.type === 'teacher');
        setTeachers(prev => {
          return {...prev, allteachers: tchs}
        })
        setSubject(subjectData.data.data);
      } catch(error) {
        console.log(error);
      }
    }

    getInfo();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = {
      headers: {
        "Content-type": "application/json",
      }
    }
    console.log(teachers.selectedteacher);
    console.log(teachers.allteachers);
    const {name} = teachers.allteachers.filter(tch => {
      return tch._id === teachers.selectedteacher;
    })[0]

    console.log(name);

    try {
      const response = await axios.post(
        GLOBAL_URL + "user/request",
        {request: {
          _id: teachers.selectedteacher,
          type: 'send',
          subjectid: subjectid,
          from: 'admin',
          name: subject.name, 
          year: subject.year,
          division: subject.division,
          semester: subject.semester
        }}, res
      )
      console.log(response);
      window.location.href = "/dashboard";
    } catch(error) {
      console.log(error);
    }

    // updating subject with teacher
    // try {
    //   const response = await Promise.all([
    //     axios.post(GLOBAL_URL + "subject/addUserSubject", {
    //       userId: teachers.selectedteacher,
    //       subjectIds: [subject._id,]
    //     }, res),
    //     axios.post(GLOBAL_URL + "subject/update", {
    //       _id: subject._id,
    //       name: subject.name,
    //       description: subject.description,
    //       taughtBy: name
    //     })
    //   ])
    //   console.log(response);
    //   window.location.href = '/dashboard';
    // } catch(error) {
    //   console.log(error);
    // }

    // try {
    //   const response = await axios.post(
    //     GLOBAL_URL + "subject/addUserSubject", {
    //       userId: teachers.selectedteacher, 
    //       subjectIds: [subject._id],
    //     }, res
    //   )
    //   console.log(response);
    //   // window.location.href = '/dashboard';
    // } catch(error) {
    //   console.log(error);
    // }
  }


  return (
    <div className="bgForm align-center flex flex-col items-center p-8">
        {/* <div className="bg-white rounded-lg">
          <Breadcrumbs className="">
            <a href="/course" className="">
              Courses
            </a>
            <a href={"/course/" + subjectid} className="">
              {session.parentModule.parentSubject.name}
            </a>
            <a href={"/course/" + subjectid} className="">
              {session.parentModule.name}
            </a>
            <a href="#" className="">
              <span className="text-blue-800">New Session</span>
            </a>
          </Breadcrumbs>
        </div> */}
        <br />
        <div className="formDiv bg-white border-blue-800 border-4 rounded-lg py-10 items-center justify-center flex w-4/5">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" className="text-center text-black">
              Teacher Association
            </Typography>

            <form className="form mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" onSubmit={handleSubmit}>
              <div className="mb-4 flex flex-col gap-6">
                <select label='Select Teacher' onChange={(e) => {
                  setTeachers(prev => {
                    return {...prev, selectedteacher: e.target.value}
                  })
                }}>
                  <option selected>Select Teacher</option>
                  {teachers.allteachers && teachers.allteachers.map(tch => {
                    return (
                      <option value={tch._id} key={tch._id} className='cursor-pointer'>{tch.name}</option>
                    )
                  })}
                </select>
                <Input label="Division" disabled value={subject.division}/>
                <Input label="Semester" disabled value={subject.semester}/>
                <Input label="Year" disabled value={subject.year}/>
                <Input label="subject" disabled value={subject.name}></Input>

                <Button type='submit' disabled={teachers.selectedteacher === ''}>Submit</Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
  )
}

export default TeacherAssociation