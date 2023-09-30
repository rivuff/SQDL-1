import React from "react";
import { useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { GLOBAL_URL } from "../../../config";
import { check, set } from "../../../Cookies";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
  Drawer,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import "./Session.css";
import { XMarkIcon } from "@heroicons/react/24/outline";

const Session = () => {
  const params = useParams();

  //headers for axios requests
  const res = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //component state
  const [session, setSession] = useState({
    title: "",
    description: "",
    createdBy: check()._id,
    topic: "",
    conductedBy: check().name,
    enrollmentLimit: 40,
    activity_order: [null],
    iteration: [],
    access_request: [],
    approved_access: [],
    blocked_request: [],
    fetched: false,
    parentModule: {
      name: "",
      _id: params.moduleid,
      createdBy: "",
      parentSubject: {
        name: "",
        _id: params.subjectid,
        description: "",
      },
    },
  });

  //edit drawer state
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  function handleSub() {
    const title = document.getElementById("title").value;
    const desc = document.getElementById("desc").value;
    const topic = document.getElementById("topic").value;
    const conductedBy = document.getElementById("conductedBy").value;
    const enrollmentLimit = document.getElementById("enrollmentLimit").value;
    axios
      .post(GLOBAL_URL + "session/update", {
        title: title,
        description: desc,
        _id: params.sessionid,
        topic: topic,
        description: desc,
        conductedBy: conductedBy,
        enrollmentLimit: enrollmentLimit,
        activity_order: session.copy,
      })
      .then((response) => {
        console.log(response);
        setSession({
          ...session,
          title: response.data.data.title,
          description: response.data.data.description,
          topic: response.data.data.topic,
          enrollmentLimit: response.data.data.enrollmentLimit,
          conductedBy: response.data.data.conductedBy,
          activity_order: response.data.data.activity_order,
          copy: response.data.data.activity_order,
        });
        closeDrawer();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getAllData() {
    var newsess = session; //setting a copy of the component state

    //fetching user data
    axios
      .post(GLOBAL_URL + "user/getID", { _id: check()._id }, res)
      .then((response) => {
        set(response.data.data);
        if (!response.data.data.subjects.includes(params.subjectid)) {
          console.log("not in user subject");
          window.location.href = "/course"; //redirect user to /course route if current course not enrolled for
        }
      })
      .then(() => {
        //requesting subject data
        return axios.post(
          GLOBAL_URL + "subject/getByID",
          { _id: params.subjectid },
          res
        );
      })
      .then((response) => {
        //updating duplicate state hook
        newsess.parentModule.parentSubject.name = response.data.data.name;
        newsess.parentModule.parentSubject._id = response.data.data._id;
      })
      .then(() => {
        //requesting moduledata
        return axios.post(
          GLOBAL_URL + "module/getID",
          { _id: params.moduleid },
          res
        );
      })
      .then((response) => {
        //updating duplicate state hook
        newsess.parentModule.name = response.data.data.name;
        newsess.parentModule.description = response.data.data.description;
        newsess.parentModule.createdBy = response.data.data.createdBy;
      })
      .then(() => {
        //requesting sessiondata
        return axios.post(
          GLOBAL_URL + "session/get",
          { _id: params.sessionid },
          res
        );
      })
      .then((response) => {
        //updating duplicate state hook
        newsess.title = response.data.data.title;
        newsess.description = response.data.data.description;
        newsess.createdBy = response.data.data.createdBy;
        newsess.conductedBy = response.data.data.conductedBy;
        newsess.enrollmentLimit = response.data.data.enrollmentLimit;
        newsess.activity_order = response.data.data.activity_order;
        newsess.copy = response.data.data.activity_order; //copy to manage edit form states
        if (newsess.copy == []) {
          newsess.copy = [null];
        }
        newsess.iteration = response.data.data.iteration;
        newsess.access_request = response.data.data.access_request;
        newsess.blocked_request = response.data.data.blocked_request;
        newsess.approved_access = response.data.data.approved_access;
      })
      .then(() => {
        newsess.fetched = true;
        console.log(newsess);
        setSession({ ...newsess });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  console.log(session.copy);
  function updateArray(index, val) {
    const value = session.copy;
    value[index] = val;
    return value;
  }
  function removeArray(index) {
    const update = session.copy;
    if (update.length == 1) {
      return [null];
    }
    const x = update.splice(index, 1);

    return update;
  }
  const ActivitySelect = () => {
    if (session.copy.length == 0) {
      return (
        <div className="inline-block">
          <select
            label="Activity"
            className="inline-block w-2/3 h-7 mx-2"
            onChange={(e) => {
              session.copy = updateArray(0, e.target.value);
            }}
          >
            <option label="" value={null}></option>
            <option label="Deliver Content" value=" "></option>
            <option label="Question Posing" value="Question Posing"></option>
            <option
              label="Personal Prioritization"
              value="Personal Prioritization"
            ></option>
            <option label="Prioritization" value="Priortization"></option>
            <option
              label="Question Answering"
              value="Question Answering"
            ></option>
          </select>
          <Button
            size="sm"
            onClick={() => {
              setSession({ ...session, copy: session.copy.concat([null]) });
            }}
          >
            +
          </Button>
          <Button
            color="red"
            size="sm"
            onClick={() => {
              setSession({ ...session, copy: removeArray(0) });
            }}
          >
            -
          </Button>
        </div>
      );
    } else {
      return session.copy.map((activity, index) => {
        return (
          <div className="inline-block">
            <select
              label="Activity"
              className="inline-block w-2/3 h-7 mx-2"
              value={activity}
              onChange={(e) => {
                session.copy = updateArray(index, e.target.value);
              }}
            >
              <option label="" value={null}></option>
              <option label="Deliver Content" value="Deliver Content"></option>
              <option label="Question Posing" value="Question Posing"></option>
              <option
                label="Personal Prioritization"
                value="Personal Prioritization"
              ></option>
              <option label="Prioritization" value="Priortization"></option>
              <option
                label="Question Answering"
                value="Question Answering"
              ></option>
            </select>
            <Button
              size="sm"
              onClick={() => {
                setSession({ ...session, copy: session.copy.concat([null]) });
              }}
            >
              +
            </Button>
            <Button
              color="red"
              size="sm"
              onClick={() => {
                setSession({ ...session, copy: removeArray(index) });
              }}
            >
              -
            </Button>
          </div>
        );
      });
    }
  };

  if (!session.fetched) {
    getAllData();
    return (
      <div className="align-center p-10 flex flex-col items-center h-screen ">
        <Spinner></Spinner>
      </div>
    );
  }
  return (
    <>
      <div className="bgSession align-center p-10 flex flex-col items-center h-screen ">
        <div className="bg-white rounded-md">
          <Breadcrumbs className="">
            <a href="/course" className="opacity-80">
              Courses
            </a>
            <a href={"/course/" + params.subjectid} className="opacity-80">
              {session.parentModule.parentSubject.name}
            </a>
            <a
              href={"/course/" + params.subjectid + "/" + params.moduleid}
              className="opacity-80"
            >
              {session.parentModule.name}
            </a>
            <a
              href={
                "/course/" +
                params.subjectid +
                "/" +
                params.moduleid +
                "/" +
                params.moduleid
              }
              className=""
            >
              <span className="text-blue-500">{session.title}</span>
            </a>
          </Breadcrumbs>
        </div>
        <br />
        <Card className="mt-6 w-2/5 p-10">
          <div className="text-center">
            <Typography variant="h3">{session.title}</Typography>
            <a href={"/course/" + session.parentModule._id}>
              <Typography variant="paragraph" className="text-blue-400">
                {session.parentModule.name}
              </Typography>
            </a>
            <a onClick={openDrawer} href="#">
              <Typography
                variant="small"
                className={
                  check()._id == session.createdBy
                    ? "text-blue-300 underline"
                    : "hidden"
                }
              >
                Configure
              </Typography>
            </a>
            <hr></hr>
            <br />
            <Typography variant="paragraph" className="text-left">
              Description: {session.description}
            </Typography>
            <Typography variant="paragraph" className="text-left">
              Conducted by: {session.conductedBy}
            </Typography>
            <hr />
            <Typography className="font-semibold text-left">
              Activities :
            </Typography>
            {session.activity_order.map((activity) => {
              return (
                <div>
                  <Typography>{activity}</Typography>
                  <hr />
                </div>
              );
            })}
            <hr></hr>
          </div>
        </Card>
        <Drawer open={open} onClose={closeDrawer} className="p-4" size={400}>
          <div className="mb-6 flex items-center justify-between">
            <Typography variant="h5" color="blue-gray">
              Edit Session Configuration
            </Typography>
            <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
              <XMarkIcon strokeWidth={2} className="h-5 w-5" />
            </IconButton>
          </div>
          <form className="flex flex-col gap-6 p-4">
            <Input id="title" label="Title" defaultValue={session.title} />
            <Textarea
              id="desc"
              rows={6}
              label="Description"
              defaultValue={session.description}
            />
            <Input id="topic" label="Topic" defaultValue={session.topic} />
            <Input
              id="conductedBy"
              label="Conducted By"
              defaultValue={session.conductedBy}
            />
            <Input
              id="enrollmentLimit"
              label="Enrollment Limit"
              defaultValue={session.enrollmentLimit}
            />
            <ActivitySelect />
            <Button
              onClick={() => {
                handleSub();
              }}
            >
              Update
            </Button>
          </form>
        </Drawer>
      </div>
    </>
  );
};

export default Session;
