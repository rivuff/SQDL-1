"use client";
import React from "react";
import { Outlet } from "react-router-dom";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
  Select,
} from "@material-tailwind/react";

import { Label, TextInput } from "flowbite-react";
import "./NewSession.css";
import { useParams } from "react-router-dom";
import { check, set } from "../../../../Cookies";
import axios from "axios";
import { GLOBAL_URL } from "../../../../config";
import { useState } from "react";
import { Global } from "@emotion/react";

const NewSession = () => {
  const subjectid = useParams().subjectid;
  const moduleid = useParams().moduleid;
  const topicid = useParams().topicid;
  const [session, setSession] = useState({
    title: "",
    description: "",
    createdBy: check()._id,
    topic: "",
    conductedBy: check().name,
    enrollmentLimit: 40,
    activity_order: [null],
    iteration: [],
    fetched: false,
    parentModule: {
      name: "",
      _id: moduleid,
      createdBy: "",
      parentSubject: {
        name: "",
        _id: subjectid,
        description: "",
      },
    },
    startDateTime: {date: "", hours: 0, minutes: 0}, 
    msg: "",
    disabled: false,
  });
  async function getInfo() {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(GLOBAL_URL + "module/getID", { _id: moduleid }, res)
      .then((response) => {
        if (check().subjects.includes(response._id)) {
          //if user id not the smae as subject creator id - cannot make module
          console.log("Not the owner of model");
          window.location.href = "/course";
        }
        const newsess = session;
        newsess.parentModule.name = response.data.data.name;
        newsess.parentModule._id = response.data.data._id;
        newsess.parentModule.createdBy = response.data.data.createdBy;
        axios
          .post(GLOBAL_URL + "subject/getByID", { _id: subjectid }, res)
          .then((response) => {
            newsess.parentModule.parentSubject.name = response.data.data.name;
            newsess.parentModule.parentSubject._id = response.data.data._id;
            setSession({ ...newsess, fetched: true });
          });
      })
      .catch((error) => {
        console.log(error);
      });
    return null;
  }

  function generateCode() {
    const r1 = Math.random().toString(36).substring(2,7);
    const r2 = Math.random().toString(36).substring(2,7);
    return r1 + r2;
  }

  async function submissionHandler() {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    // console.log(session);
    const currDate = new Date(session.startDateTime.date);
    currDate.setHours(session.startDateTime.hours)
    currDate.setMinutes(session.startDateTime.minutes)
    currDate.setSeconds(0)

    console.log(currDate);
    // console.log(typeof(currDate));

    let response;
    try {
      response = await Promise.all([
        axios.post(
          GLOBAL_URL + "session/create",
          {
            title: session.title,
            description: session.description,
            parentModule: session.parentModule,
            parentTopic: topicid,
            startDateTime: new Date(currDate),
            conductedBy: session.conductedBy,
            sessionCode: generateCode(),
            enrollmentLimit: session.enrollmentLimit,
            activity_order: session.activity_order,
            topic: session.topic,
            createdBy: session.createdBy,
            subject: session.parentModule.parentSubject._id,
          }, res
        ), 
        axios.post(
          GLOBAL_URL + "topic/getById",
          {_id: topicid}, res
        )
      ]);
      console.log(response);
    } catch(error) {
      console.log("error while creating seesion or getting topic");
      console.log(error);
      setSession({ ...session, msg: error.message, disabled: true});
    }


    try {
      const update = await axios.post(
        GLOBAL_URL + "topic/update",{
          _id: topicid, 
          session: response[0].data.data
        }, res
      );
  
      console.log(update);
    } catch(error) {
      console.log(error);
      setSession({ ...session, msg: error.message, disabled: true});
    }

    window.location.href = `/course/${subjectid}/${moduleid}`;

    // const [sessionResponse, topicResponse] = ...response;

    // axios
    //   .post(
    //     GLOBAL_URL + "session/create",
    //     {
    //       title: session.title,
    //       description: session.description,
    //       parentModule: session.parentModule,
    //       parentTopic: topicid,
    //       conductedBy: session.conductedBy,
    //       enrollmentLimit: session.enrollmentLimit,
    //       activity_order: session.activity_order,
    //       topic: session.topic,
    //       createdBy: session.createdBy,
    //       subject: session.parentModule.parentSubject._id,
    //     },
    //     res
    //   )
    //   .then(async(response) => {
    //     console.log(response);
    //     setSession({
    //       ...module,
    //       disabled: true,
    //       msg: "Created Session Successfully",
    //     });
    //     //add too cookie
    //     try {
    //       const data = await axios.post(
    //         GLOBAL_URL + "topic/getById",
    //         {_id: topicid}, res
    //       )

    //       const topicData = data.data.data;
    //       topicData.sessions.push(response.data.data);
    //       console.log(topicData);

    //       const updata = await axios.post(
    //         GLOBAL_URL + "topic/update",
    //         {
    //           _id: topicid,
    //           session: response.data.data
    //         }, res
    //       )
    //       console.log(updata);
    //       window.location.href =
    //       "/course/" +
    //       subjectid +
    //       "/" +
    //       moduleid
    //     } catch (error) {
    //       console.log(error);
    //       setSession({ ...session, msg: error.message, disabled: true});
    //     }
        
        
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setSession({ ...session, msg: error.message, disabled: true });
    //   });
  }

  function updateArray(index, val) {
    const value = session.activity_order;
    value[index] = val;
    return value;
  }
  function removeArray(index) {
    const update = session.activity_order;
    if (update.length == 1) {
      return [null];
    }
    const x = update.splice(index, 1);

    return update;
  }
  const ActivitySelect = () => {
    return session.activity_order.map((activity, index) => {
      return (
        <div className="inline-block">
          <select
            label="Activity"
            className="inline-block w-2/3 h-11 mx-2 "
            value={activity}
            onChange={(e) => {
              setSession({
                ...session,
                activity_order: updateArray(index, e.target.value),
              });
            }}
          >
            <option label="" value={null}></option>
            <option label="Deliver Content & Question Posing" value="Deliver Content & Question Posing"></option>
            {/* <option label="Deliver Content" value="Deliver Content"></option>
            <option label="Question Posing" value="Question Posing"></option> */}
            <option
              label="Peer Prioritization"
              value="Peer Prioritization"
            ></option>
            <option label="Teacher Priortization" value="Teacher Priortization"></option>
            <option
              label="Question Answering"
              value="Question Answering"
            ></option>
          </select>
          <Button
            size="sm"
            className="mr-2"
            onClick={() => {
              setSession({
                ...session,
                activity_order: session.activity_order.concat([null]),
              });
            }}
          >
            +
          </Button>
          <Button
            color="red"
            size="sm"
            onClick={() => {
              setSession({ ...session, activity_order: removeArray(index) });
            }}
          >
            -
          </Button>
        </div>
      );
    });
  };

  if (check() == null) {
    window.location.href = "/login";
  } else if (check().type != "teacher") {
    return "Must be a teacher to access this page";
  } else {
    if (!session.fetched) {
      console.log(session.fetched);
      getInfo();
    }
    return (
      <div className="bgForm align-center flex flex-col items-center p-8">
        <div className="bg-white rounded-lg">
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
        </div>
        <br />
        <div className="formDiv bg-white border-blue-800 border-4 rounded-lg py-10 items-center justify-center flex w-4/5">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" className="text-center text-black">
              New Session
            </Typography>
            <span className="text-red-600 text-center">{session.msg}</span>
            <form className="form mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  label="Session Name"
                  value={session.title}
                  onChange={(e) => {
                    setSession({
                      ...session,
                      title: e.target.value,
                      disabled: false,
                    });
                  }}
                ></Input>
                <Textarea
                  label="Description"
                  value={session.description}
                  onChange={(e) => {
                    setSession({
                      ...session,
                      description: e.target.value,
                      disabled: false,
                    });
                  }}
                ></Textarea>
                <Input
                  label="Topic Name"
                  value={session.topic}
                  onChange={(e) => {
                    setSession({
                      ...session,
                      topic: e.target.value,
                      disabled: false,
                    });
                  }}
                ></Input>
                <Input
                  label="Conducted By"
                  value={session.conductedBy}
                  onChange={(e) => {
                    setSession({
                      ...session,
                      conductedBy: e.target.value,
                      disabled: false,
                    });
                  }}
                ></Input>
                <Input
                  label="Enrollment Limit"
                  value={session.enrollmentLimit}
                  type="number"
                  onChange={(e) => {
                    setSession({
                      ...session,
                      enrollmentLimit: e.target.value,
                      disabled: false,
                    });
                  }}
                ></Input>
                <div className="flex flex-col gap-5">
                  Enter Date and Time:
                  <Input type="number" label="Hours" min="1" max="24" onChange={(e) => {
                    setSession(prev => ({
                      ...prev, startDateTime: {...prev.startDateTime, hours: +e.target.value}
                    }))
                  }}/>
                  <Input type="number" label="Minutes" min="0" max="59" onChange={(e) => {
                    console.log(session);
                    setSession(prev => ({
                      ...prev, startDateTime: {...prev.startDateTime, minutes: +e.target.value}
                    }))
                  }}/>
                  <Input type="date" label="Date" onChange={(e) => {
                    setSession(prev => ({
                      ...prev, startDateTime: {...prev.startDateTime, date: e.target.value}
                    }))
                  }}/>
                </div>
                <ActivitySelect />
                <Button
                  disabled={
                    session.title == "" ||
                    session.description == "" ||
                    session.disabled ||
                    (session.activity_order.length == 1 &&
                      session.activity_order[0] == null)
                  }
                  onClick={() => {
                    submissionHandler();
                  }}
                >
                  Create
                </Button>
              </div>
            </form>
          </Card>
        </div>
      </div>
    );
  }
};

export default NewSession;
