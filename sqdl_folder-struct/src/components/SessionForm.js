import React, { useState } from "react";
import SessionInput from "./Helper/SessionInput";

import { Button } from "@material-tailwind/react";
import { act } from "react-dom/test-utils";

const SessionForm = () => {
  const [activityArray, setActivityArray] = useState([null]);

  const updateActivity = (ele, index) => {
    const x = activityArray;
    x[index] = ele;
    return x;
  }

  const removeActivity = (index) => {
    const x = activityArray;
    x.splice(index, 1);
    return x;
  }

  const ActivityOrder = () => {
    return activityArray.map((ele, index) => {
      return (
        <div className="col-span-2 flex gap-5">
            <Button color="green">Add</Button>
            <select 
                className="w-full"
                onChange={(e) => {updateActivity(e.targer)}}
            >
            <option selected>Select Activity</option>
            <option value="Deliver Content">Deliver Content</option>
            <option value="Question Posing">Question Posing</option>
            <option value="Own Priortization">Own Priortization</option>
            <option value="Peer Priortization">Peer Priortization</option>
            <option value="Question Answering">Question Answering</option>
            </select>
            <Button color="red">Remove</Button>
        </div>
      );
    });
  };

  return (
    <div className="w-full h-screen bg-lightesh-gray p-4">
      <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold">
        Session Information
      </h1>
      <form className="my-4 p-8 grid grid-cols-2 gap-6">
        <SessionInput type="text" placeholder="Session Name" />
        <SessionInput type="text" placeholder="Description" />
        <SessionInput type="text" placeholder="Teacher Name" />
        <SessionInput type="number" placeholder="Enrollment Limit" />
        <SessionInput type="number" placeholder="Iterations" />
        <SessionInput type="number" placeholder="Semeseter" />
        <select className="col-span-2">
          <option selected>Select Your Year</option>
          <option value="F.E">F.E</option>
          <option value="S.E">S.E</option>
          <option value="T.E">T.E</option>
          <option value="B.E">B.E</option>
        </select>
        <ActivityOrder />
        <Button color="blue" variant="gradient" className="block">
          Create Session
        </Button>
      </form>
    </div>
  );
};

export default SessionForm;
