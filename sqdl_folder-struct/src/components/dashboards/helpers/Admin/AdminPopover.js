import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";

import react from "react";
import { useState, useEffect } from "react";
import EditForm from "./EditForm";
import axios from "axios";

export default function AdminPopover({ id }) {
  //query data
  let data;
  const [formData, editForm] = useState({
    email: "visitprakhar@gmail.com",
    name: "Prakhar",
    status: "active",
    type: "teacher",
    enrollment: "",
    rollno: "",
    id: id,
  });

  const updateHandler = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const data = await axios.post(
        `http://localhost:5000/api/v1/user/update`,
        formData,
        res
      );

      // setLogged(true);
      localStorage.setItem("userInfo", JSON.stringify(data));
      console.log("Updated info");
      // props.set(true);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  if (formData.type == "student") {
    //student edit form
    return (
      <Popover>
        <PopoverHandler>
          <Button size="sm">Edit</Button>
        </PopoverHandler>
        <PopoverContent className="p-4">
          <form>
            <div className="p-2">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => {
                  editForm({ ...formData, name: e.target.value });
                }}
              ></Input>
            </div>
            <Input
              label="email"
              value={formData.email}
              onChange={(e) => {
                editForm({ ...formData, email: e.target.value });
              }}
            ></Input>
            <Input
              label="Enrollment Number"
              value={formData.enrollment}
              onChange={(e) => {
                editForm({ ...formData, enrollment: e.target.value });
              }}
            ></Input>
            <Input
              label="Roll Number"
              value={formData.rollno}
              onChange={(e) => {
                editForm({ ...formData, rollno: e.target.value });
              }}
            ></Input>
            <Select
              label="Status"
              value={formData.status}
              onChange={(e) => {
                editForm({ ...formData, status: e.target.value });
              }}
            >
              <Option value="active">Active</Option>
              <Option value="invited">Invited</Option>
              <Option value="blocked">Blocked</Option>
            </Select>
            <Select
              label="Account type"
              value={formData.type}
              onChange={(e) => {
                editForm({ ...formData, type: e.target.value });
              }}
            >
              <Option value="student">Student</Option>
            </Select>
            <Button size="sm" onClick={updateHandler}>
              Update
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  } else if (formData.type == "teacher") {
    //teacher edit form
    return (
      <Popover>
        <PopoverHandler>
          <Button size="sm">Edit</Button>
        </PopoverHandler>
        <PopoverContent className="p-4">
          <form className="flex flex-col items-center justify-center">
            <div className="p-2">
              <Input
                label="Name"
                value={formData.name}
                onChange={(e) => {
                  editForm({ ...formData, name: e.target.value });
                }}
              ></Input>
            </div>
            <div className="p-2">
              <Input
                label="Email"
                value={formData.email}
                onChange={(e) => {
                  editForm({ ...formData, email: e.target.value });
                }}
              ></Input>
            </div>
            <div className="p-2">
              <Select
                label="Status"
                value={formData.status}
                onChange={(e) => {
                  editForm({ ...formData, status: e.target.value });
                }}
              >
                <Option value="active">Active</Option>
                <Option value="invited">Invited</Option>
                <Option value="blocked">Blocked</Option>
              </Select>
            </div>
            <div className="p-2">
              <Select
                label="Account type"
                value={formData.type}
                onChange={(e) => {
                  editForm({ ...formData, type: e.target.value });
                }}
              >
                <Option value="teacher">Teacher</Option>
                <Option value="admin">Admin</Option>
              </Select>
            </div>
            <Button size="sm" onClick={updateHandler}>
              Update
            </Button>
          </form>
        </PopoverContent>
      </Popover>
    );
  }
}
