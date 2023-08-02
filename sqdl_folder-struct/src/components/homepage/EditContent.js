import React from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Popover,
  PopoverHandler,
  Button,
  Input,
  PopoverContent,
} from "@material-tailwind/react";
import { useState } from "react";
import axios from "axios";

const EditContent = () => {
  //fetch user data from cookies
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [user, setUser] = useState({
    name: userInfo.name,
    rollNumber: userInfo.rollNumber,
    enrollmentNumber: userInfo.enrollmentNumber,
  });

  async function updateHandler() {
    let submissionData = userInfo;
    submissionData = {
      ...submissionData,
      name: user.name,
      rollNumber: user.rollNumber,
      enrollmentNumber: user.enrollmentNumber,
    };
    console.log(submissionData);
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //posting data to the server
    axios
      .post(
        `http://localhost:5000/api/v1/user/update`,
        JSON.stringify(submissionData),
        res,
      )
      .then((response) => {
        console.log(response.data.data);
        setUser({
          ...user,
          name: response.data.data.name,
          rollNumber: response.data.data.rollNumber,
          enrollmentNumber: response.data.data.enrollmentNumber,
        }); //update other fields with returned response data
      })
      .catch((error) => {
        console.log(error);
      });
  }
  if (userInfo.type == "student") {
    return (
      <PopoverContent className="w-96 flex flex-col items-center justify-center">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Edit Profile
        </Typography>
        <div className="flex gap-2">
          <Input
            label="Name"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <Input
            label="Roll Number"
            value={user.rollNumber}
            onChange={(e) => {
              setUser({ ...user, rollNumber: e.target.value });
            }}
          />
          <Input
            label="Ernollment Number"
            value={user.enrollmentNumber}
            onChange={(e) => {
              setUser({ ...user, enrollmentNumber: e.target.value });
            }}
          />
          <Button variant="gradient" onClick={updateHandler}>
            Update
          </Button>
        </div>
      </PopoverContent>
    );
  } else {
    return (
      <PopoverContent className="w-96 flex flex-col items-center justify-center">
        <Typography variant="h6" color="blue-gray" className="mb-6">
          Edit Profile
        </Typography>
        <div className="flex gap-2">
          <Input
            label="Name"
            value={user.name}
            onChange={(e) => {
              setUser({ ...user, name: e.target.value });
            }}
          />
          <Button variant="gradient" onClick={updateHandler}>
            Update
          </Button>
        </div>
      </PopoverContent>
    );
  }
};

export default EditContent;
