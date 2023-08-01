import React from "react";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";
import { check, set } from "../Cookies";
import axios from "axios";
import { GLOBAL_URL } from "../config";
import { useState } from "react";

const NewSubject = () => {
  const [subject, setSubject] = useState({
    name: "",
    description: "",
    createdBy: check()._id,
    msg: "",
    disabled: false,
  });

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
          createdBy: subject.createdBy,
        },
        res,
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
        window.location.href = "/course/" + response.data.data._id;
      })
      .catch((error) => {
        console.log(error);
        setSubject({ ...subject, msg: error.message });
      });
  }

  if (check() == null) {
    window.location.href = "/login";
  } else if (check().type != "teacher") {
    return "Must be a teacher to access this page";
  } else {
    return (
      <div className="align-center p-10 flex flex-col items-center h-screen ">
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
        <div className="border-blue-400 border-4 rounded-lg p-5 py-10 items-center justify-center flex">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" className="text-center text-black">
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
                <Button
                  disabled={
                    subject.name == "" ||
                    subject.description == "" ||
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
