import Student from "./Student.js";
import Teacher from "./Teacher.js";
import Admin from "./Admin.js";
import { useContext, useState } from "react";
import StudentLandingPage from "./StudentLanding.js";
import React from "react";
import { type, check } from "./../Cookies";

const LandingPage = () => {
  //cookie check
  const userData = check();
  console.log(userData);
  if (userData == null) {
    window.location.href = "/";
  } else if (userData.type == "admin") {
    console.log("Admin dashboard");
    return <Admin />;
  } else if (userData.type == "student") {
    console.log("Student dashboard");
    return <StudentLandingPage />;
  } else if (userData.type == "teacher") {
    console.log("Teacher dashboard");
    window.location.href = "/course";
  }
};

export default LandingPage;
