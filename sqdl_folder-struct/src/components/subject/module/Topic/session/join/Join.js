import React, { useState } from "react";
import { check, set } from "../../../../../Cookies";
import { useParams } from "react-router-dom";
import { GLOBAL_URL } from "../../../../../config";
import axios from "axios";
import Creator from "./Creator";
import { Spinner } from "@material-tailwind/react";
import Allowed from "./Allowed";
import { io } from "socket.io-client";
import { SOCKET_URL } from "../../../../../config";

const Join = () => {
  const socket = io(SOCKET_URL);
  let session, subject;
  const [auth, setAuth] = useState(null);
  let user = check();
  if (user == null) {
    window.location.href = "/login";
  }
  let params = useParams();
  const res = {
    headers: {
      "Content-type": "application/json",
    },
  };

  console.log("Hello from join file");

  // initial location of socket.on

  async function detail() {
    subject = await axios.post(
      GLOBAL_URL + "subject/getByID",
      { _id: params.subjectid },
      res
    );
    session = await axios.post(
      GLOBAL_URL + "session/get",
      { _id: params.sessionid },
      res
    );
    console.log(subject);
    //removing HTTP headers from response
    subject = subject.data.data;
    session = session.data.data;
    console.log(subject);
    console.log(session);
    console.log(user._id);
    if (check().subjects.includes(subject._id)) {
      setAuth("Allowed");
    }
    if (session.createdBy == user._id && user.type == "teacher") {
      //user is the creator of session and has to be teacher
      setAuth("Creator");
    } else if (user.type == "student") {
      if (session.approved_request.includes(user._id)) {
        //add subject to user profile
        // user = check();
        // user.subjects = user.subjects.concat(subject._id);
        // let payload = await axios.post(GLOBAL_URL + "user/update", user, res);
        // set(payload.data.data);
        setAuth("Allowed");
        //redirect
      } else if (session.access_request.includes(user._id)) {
        setAuth("Requested");
        //redirect
      } else if (session.blocked_request.includes(user._id)) {
        setAuth("Blocked");
        //redirect
      } else if (
        user.subjects.includes(subject._id) &&
        user.allowedBy.includes(session.createdBy)
      ) {
        //function to add to  allowed access
        console.log("Allowed Access....");
        let aa = session.approved_request;
        aa.push(user._id);
        axios
          .post(
            GLOBAL_URL + "session/update",
            { approved_request: aa, _id: session._id },
            res
          )
          .then((response) => {
            console.log(response);
            setAuth("Allowed");
          });
      } else {
        //function to add to access reqeust
        console.log("Requesting access...");
        let ra = session.access_request;
        ra.push(user._id);
        console.log(ra);
        axios
          .post(
            GLOBAL_URL + "session/update",
            { access_request: ra, _id: session._id },
            res
          )
          .then((response) => {
            setAuth("Requested");
          });
      }
    } else {
      setAuth("Not Authorized");
    }
  }

  //websocket listener
  socket.on(params.sessionid + "student" + "stateUpdate", (args) => {
    console.log("hello from socket.on");
    detail();
  });

  if (auth == null) {
    //as soon as user is authorized to view pages, dynamic page updating stops
    detail(); //wait 10 seconds before updating status
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <Spinner className="w-12 h-12" />
      </div>
    );
  }
  if (auth == "Creator") {
    return <Creator />;
  }
  if (auth == "Allowed") {
    //render allowed page
    return <Allowed />;
  }

  if (auth == "Requested") {
    socket.emit(params.sessionid + "teacher" + "stateUpdate", { fetch: true });
    return (
      <div className="text-center h-screen flex flex-col items-center justify-center">
        You have requested access for this subject. Once the teacher approves,
        you will be able to join
      </div>
    );
  }
  if (auth == "Blocked") {
    return (
      <div className="text-center h-screen flex flex-col items-center justify-center">
        You have been blocked from this subject. Please reach out to the teacher
        for further assistance
      </div>
    );
  }

  return <h1>Nothing</h1>;
};

export default Join;
