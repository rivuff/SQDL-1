import React from "react";
import Student from "./pfp/Student.js";
import Teacher from "./pfp/Teacher.js";
import { type, check } from "./Cookies";

function Profile() {
  //cookie c=heck
  const userData = check();
  if (userData == null) {
    //redirect user to login page to access pfp
    window.location.href = "/login";
  } else if (userData.type == "admin") {
    window.location.href = "/dashboard"; //reddirect admins to admin dashboard
  } else if (userData.type == "student") {
    console.log("redirecting...");

    return <Student />;
  } else if (userData.type == "teacher") {
    console.log("teacher page");
    return <Teacher />;
  }
}

export default Profile;
