import React, { useState, useRef } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import NavCard from "../dashboards/helpers/NavCard";
import axios from "axios";
import { check, set } from "./../Cookies";
import { GLOBAL_URL } from "../config";

import StudentSubjects from "./StudentSubjects";
import StudentEdit from "./StudentEdit";
import { NavLink } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Student = () => {

  const [edit, setEdit] = useState(false);
  const [codeInput, setCodeInput] = useState(false);
  const [isFetched, setIsFetched] = useState(false);
  const codeRef = useRef("");

  const userData = check();

  console.log(userData);
  const [state, setState] = useState({
    editing: false,
    name: userData.name,
    email: userData.email,
    enrollmentNumber: userData.enrollmentNumber,
    rollNumber: userData.rollNumber,
    type: userData.type,
    errmsg: "",
  });

  const notify = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }


  async function updateHandler() {
    setIsFetched('not fetched')
    let submissionData = userData;
    submissionData = {
      ...submissionData,
      name: state.name,
      email: state.email,
      rollNumber: state.rollNumber,
      enrollmentNumber: state.enrollmentNumber,
    };
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //posting data to the server
    axios
      .post(GLOBAL_URL + `user/update`, JSON.stringify(submissionData), res)
      .then((response) => {
        console.log(response.data.data);
        setState({
          ...state,
          name: response.data.data.name,
          email: response.data.data.email,
          enrollmentNumber: response.data.data.enrollmentNumber,
          rollNumber: response.data.data.rollNumber,
          editing: false,
        }); //update other fields with returned response data
        //update cookie
        set(response.data.data);
      })
      .catch((error) => {
        setState({ ...state, errmsg: error.message });
      });
  }

  const handleEditProfile = () => {
    setEdit(true);
  }

  const handleDashboard = () => {
    setEdit(false);
  }

  const codeSubmission = async() => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        GLOBAL_URL + "session/getByCode", {sessionCode: codeRef.current.value}, res
      );
      console.log(response);
      const session = response.data.data;
      if (session.approved_request.includes(check()._id)) {
        setIsFetched(`/course/${session.subject}/${session.parentModule}/${session._id}`);
        notify("Join The session")
        return ;
      }
      else if (check().subjects.includes(session.subject)) {
        if (!(session.approved_request.includes(check()._id)))
          session.approved_request.push(check()._id)
        else {
          setIsFetched(`/course/${session.subject}/${session.parentModule}/${session._id}`);
          notify("Request already sent")
          return ;
        }
      } else {
        if (!(session.access_request.includes(check()._id)))
          session.access_request.push(check()._id);
        else {
          setIsFetched(`/course/${session.subject}/${session.parentModule}/${session._id}`);
          notify("Request already sent")
          return ;
        }
      }
      console.log(session);
      console.log(session.parentModule);

      setIsFetched(`/course/${session.subject}/${session.parentModule}/${session._id}`);
      
      const response2 = await axios.post(
        GLOBAL_URL + "session/update",
        {
          _id: session._id,
          title: session.title,
          description: session.description,
          conductedBy: session.conductedBy,
          createdBy: session.createdBy,
          parentModule: session.parentModule,
          parentTopic: session.parentTopic,
          sessionCode: session.sessionCode,
          enrollmentLimit: session.enrollmentLimit,
          access_request: session.access_request,
          approved_request: session.approved_request,
          blocked_request: session.blocked_request,
          activity_order: session.activity_order,
          iteration: session.iteration,
          current_activity: session.current_activity,
          selected_questions: session.selected_questions
        }, res
      );
      console.log(response2);
      notify('Request Sent');
    } catch (error) {
      console.log(error);
      setIsFetched('error');
    }
  }

  return (
    <div className="flex flex-wrap">
      <NavCard className="items-center">
        <div>
            <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold mx-auto">
              {check().name}
            </h1>
        </div>
        <ul>
          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200">About</li>
          <li 
            className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200"
            onClick={handleEditProfile}
          >Edit Profile</li>
          <li 
            className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200"
            onClick={handleDashboard}
          >Dashboard</li>
          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 hover:bg-teal-200">Logout</li>
        </ul>
      </NavCard>
      <div className="p-10 m-5 rounded-xl w-[75%]">
          <h1 
            className="w-[65%] border-b-2 border-brown-300 text-5xl font-montserratWeight font-montserrat mb-10"
          >{!edit ? "Enrolled Subjects" : "Edit Profile"}</h1>
          {!edit ? <StudentSubjects array={userData.subjects} /> : <StudentEdit data={state} setData={setState} updateData={updateHandler}/>}
          <NavLink to={`/addStudentSubject`}>
            <Button className="mt-4">
              Add Subject ➡️
            </Button>
          </NavLink>
          <Button className="mt-4" color="green" onClick={() => {setCodeInput(!codeInput)}}>
              Join Through Code
          </Button>
          {codeInput && <>
            <Input className="mt-4" placeholder="Enter Code" inputRef={codeRef}/>
            <Button onClick={codeSubmission} className="mt-8">Submit</Button>
            
            <ToastContainer />
            {isFetched === "not fetched" && <p>Fetching Session</p>}
            {isFetched === 'error' && <p>Session does not exist</p>}
            {isFetched[1] === 'c' && <NavLink to={isFetched} className="mt-4">
                <Button color="green">Join Sesssion</Button>
              </NavLink>}
          </>}
      </div>
    </div>
  );
  // return (
  //   <div className="align-center p-10 flex items-center justify-center ">
  //     <div className="border-blue-400 border-4 rounded-lg p-10">
  //       <Card className="w-96">
  //         <CardHeader floated={false} className="h-80">
  //           <svg
  //             xmlns="http://www.w3.org/2000/svg"
  //             fill="none"
  //             viewBox="0 0 24 24"
  //             strokeWidth={1.5}
  //             stroke="currentColor"
  //             className="w-45 h-45"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
  //             />
  //           </svg>
  //         </CardHeader>
  //         <CardBody className="text-center">
  //           <Typography variant="h4" color="blue-gray" className="mb-2">
  //             {userData.name}
  //           </Typography>
  //           <Typography color="blue" className="font-medium" textGradient>
  //             Student
  //           </Typography>
  //           <div>
  //             <Typography
  //               className={
  //                 state.errmsg == "" ? "hidden" : "visible text-red-800"
  //               }
  //             >
  //               {state.errmsg}
  //             </Typography>
  //             <div className="p-2">
  //               <Input
  //                 label="Name"
  //                 value={state.name}
  //                 disabled={state.editing ? false : true}
  //                 onChange={(e) => {
  //                   setState({ ...state, name: e.target.value });
  //                 }}
  //               ></Input>
  //             </div>
  //             <div className="p-2">
  //               <Input
  //                 label="Email"
  //                 value={state.email}
  //                 disabled={state.editing ? false : true}
  //                 onChange={(e) => {
  //                   setState({ ...state, email: e.target.value });
  //                 }}
  //               ></Input>
  //             </div>
  //             <div className="p-2">
  //               <Input
  //                 label="Enrollment Number"
  //                 value={state.enrollmentNumber}
  //                 disabled={state.editing ? false : true}
  //                 onChange={(e) => {
  //                   setState({ ...state, enrollmentNumber: e.target.value });
  //                 }}
  //               ></Input>
  //             </div>
  //             <div className="p-2">
  //               <Input
  //                 label="Roll Number"
  //                 value={state.rollNumber}
  //                 disabled={state.editing ? false : true}
  //                 onChange={(e) => {
  //                   setState({ ...state, rollNumber: e.target.value });
  //                 }}
  //               ></Input>
  //             </div>
  //             <Button
  //               color={state.editing ? "red" : "blue"}
  //               onClick={() => {
  //                 setState({ ...state, editing: !state.editing, errmsg: "" });
  //               }}
  //             >
  //               {state.editing ? "Discard" : "Edit"}
  //             </Button>
  //             <Button
  //               className={state.editing ? "visible" : "hidden"}
  //               onClick={() => {
  //                 updateHandler();
  //               }}
  //             >
  //               Save
  //             </Button>
  //           </div>
  //         </CardBody>
  //       </Card>
  //     </div>
  //     <div className="p-10 w-2/3">
  //       <Card className="w-192">
  //         <CardBody className="text-center">
  //           <Typography variant="h4" color="blue-gray" className="mb-2">
  //             Enrolled Subjects
  //           </Typography>
  //           <div>
  //             <StudentSubjects array={userData.subjects} />
  //           </div>
  //         </CardBody>
  //       </Card>
  //     </div>
  //   </div>
  // );
};

export default Student;
