//imports
import {
  Card,
  Input,
  Button,
  Typography,
  input,
} from "@material-tailwind/react";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { GLOBAL_URL } from "../config";

const postData = async (type) => {
  //e.preventDefault();
  // let post_val = {
  // 'type': type,
  // 'email': email,
  // 'password': password
  // }

  if (type === "teacher") {
    const email = document.getElementById("teacherEmail").value;
    const password = document.getElementById("teacherPassword").value;
    const postVal = {
      email: email,
      password: password,
    };

    console.log(postVal.password);

    try {
      const response = await axios.post(GLOBAL_URL + "teacher/login", postVal);
      const data = response.data;
      console.log(response);
      if (data) {
        console.log("Sign in successful");
      } else {
        console.log("Data not found");
      }
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      console.log("User not found");
      //throw error; // Re-throw the error to handle it further up the call stack
    }
  } else if (type === "student") {
    try {
      let enrollment = document.getElementById("studentEnrollment").value;
      let password = document.getElementById("studentPassword").value;
      // var post_val = {
      //     'type':type,
      //     'enrollment': enrollment,
      //     'password': password,
      // }
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        GLOBAL_URL + `student/login`,
        { enrollment, password },
        res,
      );

      localStorage.setItem("userInfo", JSON.stringify(data));

      // props.set(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};

function formValidate(formStatus) {
  //querying email
  let err;
  if (formStatus == "valid" || formStatus == "empty") {
    err = false;
  } else err = true;
  let errmsg = [];

  let email = document.getElementById("email");
  if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
    errmsg.concat("Invalid Email Address");
    err = true;
  }
  let password = document.getElementById("password");
  let pstring = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
  if (!password.value.match(pstring)) {
    errmsg.concat(
      "Invalid Password (must include a number, lowercase, and uppercase letter, and be between 6-20 characters",
    );
    err = true;
  }
  if (err == true) {
    //display error message
    return "invalid";
  } else {
    //clear error message
    return "valid";
  }
}

function Form(props) {
  let type = props.type; //login, or register
  let user = props.user; // student or teacher
  var fields;
  if (type == "login") {
    fields = {
      email: "Email Address",
      password: "Password",
    };
  } else if (type == "register") {
    fields = {
      text: "Student Name",
      email: "Email Address",
      password: "Password",
      enrollment: "Enrollment Number",
      number: "Roll Number",
    };
  } else {
    console.log("Form type incorrect " + type);
  }
  //setting up react hook
  let [formStatus, setStatus] = useState("empty"); //form can either be empty, invalid, valid, and failed (invalid also used for respnse error handling)

  return (
    <Card color="transparent" shadow={false}>
      <Typography variant="h4" color="blue-gray" className="capitalize">
        {type == "register" ? "Student" : ""} {type}
      </Typography>
      <Typography color="gray" className="mt-1 font-normal">
        Enter your details to {type}.
      </Typography>
      <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id={user + type}>
        {formStatus}
        <div className="mb-4 flex flex-col gap-6">
          {Object.entries(fields).map(([key, val]) => {
            return (
              <Input
                size="lg"
                label={val}
                key={key}
                id={key}
                onChange={() => {
                  setStatus((formStatus = formValidate(formStatus)));
                }}
              ></Input>
            );
          })}
        </div>
        <Button
          className="mt-6 capitalize"
          fullWidth
          onClick={() => {
            postData(user);
          }}
        >
          {type}
        </Button>
      </form>
    </Card>
  );
}

export default Form;
