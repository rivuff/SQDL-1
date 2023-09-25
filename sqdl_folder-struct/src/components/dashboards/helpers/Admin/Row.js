import React from "react";
import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import "./StudentTable.css";
import react from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const Row = ({ _id, handler }) => {
  const [formData, editForm] = useState({
    email: "",
    name: "",
    status: "",
    type: "",
    enrollmentNumber: "",
    rollNumber: "",
    updatedAt: "",
    _id: "",
    deleted: false,
    isFetched: false,
  });
  async function getData() {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(`http://localhost:5000/api/v1/user/getID`, { _id: _id }, res)
      .then((response) => {
        let data = response.data.data;
        editForm({ ...data, isFetched: true });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function deleteUser(email) {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    if (window.confirm("Delete user?")) {
      try {
        const response = await axios.delete(
          "http://localhost:5000/api/v1/user/delete",
          { data: { email: email } },
          res
        );
        editForm({ ...formData, isFetched: false, deleted: true }); //update other fields with returned response data
      } catch (error) {}

      axios
        .post("http://localhost:5000/api/v1/user/delete", { email: email }, res)
        .then((response) => {
          editForm({ ...formData, isFetched: false, deleted: true }); //update other fields with returned response data
          handler();
        })
        .catch((error) => {});
    } else {
      return null;
    }
  }

  const updateHandler = async (e, _id, type) => {
    e.preventDefault();
    //creating data struct
    let info = {};
    if (type != "student") {
      info = {
        name: document.getElementById("name" + _id).value,
        email: document.getElementById("email" + _id).value,
        enrollmentNumber: formData.enrollmentNumber,
        rollNumber: formData.rollNumber,
        _id: formData._id,
        status: document.getElementById("status" + _id).value,
        type: document.getElementById("type" + _id).value,
      };
    } else {
      info = {
        name: document.getElementById("name" + _id).value,
        email: document.getElementById("email" + _id).value,
        enrollmentNumber: document.getElementById("enrollmentNumber" + _id)
          .value,
        rollNumber: document.getElementById("rollNumber" + _id).value,
        _id: formData._id,
        status: document.getElementById("status" + _id).value,
        type: document.getElementById("type" + _id).value,
      };
    }
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    //posting data to the server
    axios
      .post(
        `http://localhost:5000/api/v1/user/update`,
        JSON.stringify(info),
        res
      )
      .then((response) => {
        editForm({ ...response.data.data, isFetched: true }); //update other fields with returned response data
        document.getElementById("click" + formData._id).click();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  if (!formData.isFetched) {
    getData();
  }
  if (formData.deleted) {
    return null;
  }
  if (formData.type == "student") {
    //student edit form
    return (
      <tr
        className={formData.deleted ? "hidden" : "font-bold"}
        key={formData._id}
      >
        <td className="odd  p-4 ">
          <Typography>{formData.name}</Typography>
        </td>
        <td className="even">
          <Typography>{formData.email}</Typography>
        </td>
        <td className="odd">
          <Typography>{formData.enrollmentNumber}</Typography>
        </td>
        <td className="even">
          <Typography>{formData.rollNumber}</Typography>
        </td>
        <td className="odd">
          <Typography>
            <Popover>
              <PopoverHandler>
                {/* <Button size="sm" id={"click" + formData._id}>
                  Edit
                </Button> */}

                <button
                  id={"click" + formData._id}
                  size="sm"
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Edit
                </button>
              </PopoverHandler>
              <PopoverContent className="p-4">
                <form className="flex flex-col items-center justify-center">
                  <div className="p-2">
                    <Input
                      id={"name" + formData._id}
                      label="Name"
                      defaultValue={formData.name}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <Input
                      id={"email" + formData._id}
                      label="email"
                      disabled
                      defaultValue={formData.email}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <Input
                      id={"enrollmentNumber" + formData._id}
                      label="Enrollment Number"
                      defaultValue={formData.enrollmentNumber}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <Input
                      id={"rollNumber" + formData._id}
                      label="Roll Number"
                      defaultValue={formData.rollNumber}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <select
                      id={"status" + formData._id}
                      label="Status"
                      defaultValue={formData.status}
                    >
                      <option value="active">Active</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <select
                      id={"type" + formData._id}
                      label="Account type"
                      defaultValue={formData.type}
                    >
                      <option value="student">Student</option>
                    </select>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      updateHandler(
                        e,
                        formData._id,
                        document.getElementById("type" + formData._id).value
                      );
                    }}
                  >
                    Update
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </Typography>
        </td>{" "}
        <td className="even">
          <button
            type="button"
            size="sm"
            color="red"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              onClick={() => {
                deleteUser(formData.email);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  } else {
    //teacher edit form
    return (
      <tr className="font-bold ">
        <td className="odd p-4 ">
          <Typography>{formData.name}</Typography>
        </td>
        <td className="even">
          <Typography>{formData.email}</Typography>
        </td>
        <td className="odd">
          <Typography>{formData._id}</Typography>
        </td>
        <td className="even">
          <Typography>{formData.updatedAt}</Typography>
        </td>
        <td className="odd">
          <Typography>
            <Popover>
              <PopoverHandler>
                <button
                  id={"click" + formData._id}
                  size="sm"
                  type="button"
                  class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
                >
                  Edit
                </button>
              </PopoverHandler>
              <PopoverContent className="p-4">
                <form className="flex flex-col items-center justify-center">
                  <div className="p-2">
                    <Input
                      id={"name" + formData._id}
                      label="Name"
                      defaultValue={formData.name}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <Input
                      id={"email" + formData._id}
                      label="email"
                      disabled
                      defaultValue={formData.email}
                    ></Input>
                  </div>
                  <div className="p-2">
                    <select
                      id={"status" + formData._id}
                      label="Status"
                      defaultValue={formData.status}
                    >
                      <option value="active">Active</option>
                      <option value="invited">Invited</option>
                      <option value="blocked">Blocked</option>
                    </select>
                  </div>
                  <div className="p-2">
                    <select
                      id={"type" + formData._id}
                      label="Account type"
                      defaultValue={formData.type}
                    >
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <Button
                    size="sm"
                    onClick={(e) => {
                      updateHandler(
                        e,
                        formData._id,
                        document.getElementById("type" + formData._id).value
                      );
                    }}
                  >
                    Update
                  </Button>
                </form>
              </PopoverContent>
            </Popover>
          </Typography>
        </td>{" "}
        <td className="even">
          <button
            type="button"
            size="sm"
            color="red"
            class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              onClick={() => {
                deleteUser(formData.email);
              }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
              />
            </svg>
          </button>
        </td>
      </tr>
    );
  }
};

export default Row;
