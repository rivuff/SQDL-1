import React from "react";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";
import "./NewSubject.css";
import { check, set } from "../Cookies";
import axios from "axios";
import { GLOBAL_URL } from "../config";
import { useState } from "react";

const NewSubject = () => {
  const [subject, setSubject] = useState({
    name: "",
    description: "",
    year: "",
    semester: 0,
    taughtBy: '',
    division: '',
    createdBy: check()._id,
    msg: "",
    disabled: false,
  });

  const [teachers, setTeachers] = useState([])

  async function getAllTeachers() {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.get(
        GLOBAL_URL + "user/getall", res
      )
      setTeachers(response.data.data.filter(ele => {
        return ele.type === 'teacher'
      }))
    } catch(error) {
      console.log(error);
      setSubject({...subject, msg: error.message})
    }
  }

  async function submissionHandler() {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .post(
        GLOBAL_URL + "subject/create",
        {
          name: subject.name,
          description: subject.description,
          year: subject.year,
          semester: subject.semester,
          createdBy: subject.createdBy,
          taughtBy: subject.taughtBy,
          division: subject.division,
        },
        res
      )
      .then((response) => {
        setSubject({
          ...subject,
          disabled: true,
          msg: "Created Subject Successfully",
        });
        //add too cookie
        const user = check();
        user.subjects.push(response.data.data._id);
        set(user);
        window.location.href = "/dashboard";
      })
      .catch((error) => {
        console.log(error);
        setSubject({ ...subject, msg: error.message });
      });
  }

  if (check() == null) {
    window.location.href = "/login";
  } else if (check().type != "admin") {
    return "only admin can create a subject";
  } else {
    getAllTeachers();
    return (
      <div className="subject align-center p-10 flex flex-col items-center h-screen ">
        <div className="">
          <Breadcrumbs className="">
            <a href="/course" className="opacity-60">
              Courses
            </a>
            <a href="#" className="">
              <span className="text-blue-300">New Subject</span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <div className="bg-white border-blue-400 border-4 rounded-lg p-5 py-10 items-center justify-center flex">
          <Card color="white" shadow={false}>
            <Typography variant="h4" className="text-center text-blue-800">
              New Subject
            </Typography>
            <Typography className="text-center text-red-500">
              {subject.msg}
            </Typography>
            <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
              <div className="mb-4 flex flex-col gap-6">
                <Input
                  label="Name"
                  onChange={(e) => {
                    setSubject({ ...subject, name: e.target.value });
                  }}
                  value={subject.name}
                ></Input>
                <Textarea
                  label="Description"
                  onChange={(e) => {
                    setSubject({ ...subject, description: e.target.value });
                  }}
                  value={subject.description}
                ></Textarea>
                <select
                  onChange={(e) => {
                    setSubject({...subject, year: e.target.value})
                  }}
                >
                  <option selected>Select Year</option>
                  <option value="F.E">F.E</option>
                  <option value="S.E">S.E</option>
                  <option value="T.E">T.E</option>
                  <option value="B.E">B.E</option>
                </select>
                <Input
                  label="Semester"
                  onChange={(e) => {
                    setSubject({ ...subject, semester: e.target.value });
                  }}
                  type="number"
                  value={subject.semester}
                ></Input>
                <select
                  onChange={(e) => {
                    setSubject({...subject, division: e.target.value})
                  }}
                >
                  <option selected>Select Division</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                  <option value="A/B">A/B</option>
                </select>
                <select
                  onChange={(e) => {
                    setSubject({...subject, taughtBy: e.target.value})
                  }}
                >
                  <option selected>Select The Teacher</option>
                  {teachers.map(ele => {
                    return <option value={ele.name}>{ele.name}</option>
                  })}
                </select>
                <Button
                  className="bg-blue-800 hover:bg-sky-700"
                  disabled={
                    subject.name == "" ||
                    subject.description == "" ||
                    subject.taughtBy == "" ||
                    subject.year == "" ||
                    subject.division == "" ||
                    subject.semester == "" ||
                    subject.disabled
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

export default NewSubject;
