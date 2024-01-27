import React from "react";
import {
  Collapse,
  Card,
  Typography,
  CardBody,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import { Button } from "flowbite-react";
import { useState } from "react";
import { GLOBAL_URL } from "../../../config";

export default function TeacherInvite({ handler }) {
  const [msg, setMsg] = useState("");
  const [subjects, setSub] = useState([]);
  const [open, setOpen] = useState(false);
  const toggleOpen = () => setOpen((cur) => !cur);
  async function submitHandler(e) {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    console.log("posted");
    axios
      .post(
        GLOBAL_URL + "admin/invite",
        {
          email: document.getElementById("invitationEmail").value,
          name: document.getElementById("invitationName").value,
          subject: document.getElementById("subject").value,
        },
        res
      )
      .then((response) => {
        console.log(response);
        if (response.status == 200) {
          //update hook to show success
          setMsg("");
          setMsg(response.data.message);
          document.getElementById("invitationEmail").value = "";
          document.getElementById("invitationName").value = "";
          handler();
        }
      })
      .catch((error) => {
        setMsg("");
        setMsg("ERROR: ");
        //update hook to show error
      });
  }
  async function getSubjects() {
    const data = await axios.get(GLOBAL_URL + "subject/getAll");
    setSub(data.data.data);
  }
  if (subjects.length == 0) {
    getSubjects();
  }

  return (
    <div>
      <div className="w-full flex flex-col items-center mt-8 p-3">
        {/* <Button onClick={toggleOpen} className="w-2/3">
          Invite Teacher
        </Button> */}
        <button
          onClick={toggleOpen}
          class="relative inline-flex items-center justify-center w-2/3 p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-cyan-500 to-blue-500 group-hover:from-cyan-500 group-hover:to-blue-500 hover:text-black dark:text-white focus:ring-4 focus:outline-none focus:ring-cyan-200 dark:focus:ring-cyan-800"
        >
          <span class="relative px-5 py-2.5 transition-all ease-in duration-75 w-2/3 bg-blue dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
            Invite Teacher
          </span>
        </button>
      </div>
      <Collapse open={open}>
        <Card className="my-4 mx-auto w-8/12">
          <CardBody>
            <div className="mb-4 flex flex-col gap-6 items-center">
              <Typography
                className={msg == "" ? "hidden" : "visible font-semibold"}
              >
                {msg}
              </Typography>
              <Input size="md" label="Name" id="invitationName" />
              <Input size="md" label="Email" id="invitationEmail" />
              <select id="subject">
                {subjects.map((subject) => {
                  return <option value={subject._id}>{subject.name}</option>;
                })}
              </select>
              <Button
                className="w-1/4"
                variant="outlined"
                onClick={(e) => {
                  submitHandler(e);
                }}
              >
                Submit
              </Button>
            </div>
          </CardBody>
        </Card>
      </Collapse>
    </div>
  );
}
