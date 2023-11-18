"use client";

import { React, useState, useRef } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Button } from "flowbite-react";
import {
  Drawer,
  Spinner,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  Input,
  Checkbox,
} from "@material-tailwind/react";
import { GLOBAL_URL, SOCKET_URL } from "../../../../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { io } from "socket.io-client";
import { getSessionCode } from "../../../../../Cookies";

const res = {
  headers: {
    "Content-type": "application/json",
  },
};

const socket = io(SOCKET_URL);

const QuestionCard = ({ question, index, dropHandler }) => {
  return (
    <div className="w-full flex-row border-2 border-blue-gray-200">
      <Typography variant="h6">{question.questionText}</Typography>
      <Typography variant="small">Type: {question.questionTag}</Typography>
      <div className="inline-block align-middle">
        <Typography variant="small">
          {" "}
          Overall Priority: {question.priorityBySystem}
        </Typography>
      </div>{" "}
      &nbsp; &nbsp; &nbsp;
      {/* <button className='underline text-red-400'onClick={()=>{dropHandler(question, index)}} >x</button> */}
    </div>
  );
};

const QuestionSelect = ({ iteration, sessionHandler, broadcaster }) => {
  const params = useParams();
  const [questions, setQuestion] = useState(null);

  function dropHandler(q, index) {
    let copy = questions;
    copy.splice(index, 1);
    setQuestion(copy);
  }

  async function handleOnDragEnd(result) {
    const items = Array.from(questions);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    //adding to selected questions

    let session = await axios.post(
      GLOBAL_URL + "session/get",
      { _id: params.sessionid },
      res
    );
    session = session.data.data;

    let selected = session.selected_questions;
    let found;
    for (let i = 0; i < selected.length; i++) {
      if (selected[i].iteration == iteration) {
        found = i;
      }
    }
    if (found == null) {
      try {
        session.selected_questions = session.selected_questions.concat({
          iteration: iteration,
          questions: items,
        });
        console.log(session.selected_questions);
      } catch (e) {
        session.selected_questions = {
          iteration: iteration,
          questions: items,
        };
      }
    } else {
      let obj = {
        iteration: iteration,
        questions: items,
      };

      session.selected_questions[found] = obj;
    }

    //update session send broadcast and rerender page
    let payload = await axios.post(GLOBAL_URL + "session/update", session, res);
    payload = payload.data.data;
    session = payload;
    broadcaster();
    sessionHandler(session);
    setQuestion(items);
  }
  async function getSession() {
    let payload = await axios.post(
      GLOBAL_URL + "session/get",
      { _id: params.sessionid },
      res
    );
    payload = payload.data.data;
    let session = payload;
    console.log(session);
  }
  async function getQuestions() {
    //fetch questions with current iteration and session
    let payload = await axios.post(GLOBAL_URL + "question/get", {
      index: iteration,
      session: params.sessionid,
    });
    //needs to be dynamically updated
    payload = payload.data;
    //consider making payload sortable here
    setQuestion(payload);
  }
  if (questions == null) {
    getQuestions();
  } else {
    return (
      <div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="questionSelect">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="questionSelect"
              >
                {questions.map((q, index) => {
                  return (
                    <Draggable key={q._id} draggableId={q._id} index={index}>
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <QuestionCard
                            question={q}
                            index={index}
                            dropHandler={dropHandler}
                          ></QuestionCard>
                        </li>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};

const Questions = ({ iteration }) => {
  const params = useParams();

  const [questions, setQuestion] = useState(null);
  async function getQuestions() {
    //fetch questions with current iteration and session
    let payload = await axios.post(GLOBAL_URL + "question/get", {
      index: iteration,
      session: params.sessionid,
    });
    //needs to be dynamically updated
    payload = payload.data;
    //consider making payload sortable here

    setQuestion(payload);
  }
  socket.on(params.sessionid + "teacher" + "stateUpdate", (args) => {
    console.log("Reloading questions...");
    getQuestions();
  });

  if (questions == null) {
    getQuestions();
  } else {
    return (
      <div className="w-full overflow-auto">
        <h4 className="text-xl mb-2"> Submitted Questions </h4>
        <table className="w-full min-w-max table-auto text-left overflow-auto">
          <thead>
            <tr className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-gray-800">
              <th>Question Text</th>
              <th>Type</th>
              <th>Posed By</th>
              <th>Self-Priority</th>
              <th>Peer-Priority</th>
            </tr>
          </thead>
          <tbody>
            {questions.map((object) => {
              return (
                <tr className="p-4 border-b border-blue-gray-50">
                  <td className="px-1">{object.questionText}</td>
                  <td className="px-1">{object.questionTag}</td>
                  <td className="px-1">{object.raisedBy}</td>
                  <td className="px-1">{object.priorityBySelf}</td>
                  <td className="px-1">{object.priorityByPeer}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
};

const Creator = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [sessionData, setSession] = useState(null);
  const [students, setStudents] = useState([]);

  const resref = useRef("");

  const boradCastResource = () => {
    // console.log(getSessionCode())
    const code = getSessionCode();
    const link = resref.current.value;
    socket.emit("send-link", link, code, (response) => {
      console.log(response);
    });
    resref.current.value = "";
  };

  socket.on(params.sessionid + "teacher" + "stateUpdate", (args) => {
    console.log("Reloading page data...");
    getSession();
  });

  function broadcastState(state) {
    socket.emit(params.sessionid + "student" + "stateUpdate", params.sessionid);
  }
  async function getSession() {
    let session = await axios.post(
      GLOBAL_URL + "session/get",
      { _id: params.sessionid },
      res
    );
    session = session.data.data;
    setSession(session);
  }

  async function getStudents() {
    let studentList = sessionData.access_request;
    if (sessionData.approved_request.length != 0) {
      studentList = studentList.concat(sessionData.approved_request);
    }
    if (sessionData.blocked_request.length != 0) {
      studentList = studentList.concat(sessionData.blocked_request);
    }
    let payload = await axios.post(
      GLOBAL_URL + "user/getIDs",
      { _ids: studentList },
      res
    );
    payload = payload.data.data;
    setStudents(payload);
  }

  async function statusChangeHandler(e, _id) {
    const status = e.target.value;
    console.log(typeof _id);
    if (typeof _id == "object") {
      const stulist = students.map((stu) => stu._id);
      sessionData.approved_request = stulist;
      console.log(sessionData.approved_request);
      sessionData.access_request = [];
      sessionData.blocked_request = [];
    } else {
      if (sessionData.approved_request.includes(_id)) {
        let index = sessionData.approved_request.indexOf(_id);
        sessionData.approved_request.splice(index, 1);
      } else if (sessionData.access_request.includes(_id)) {
        let index = sessionData.access_request.indexOf(_id);
        sessionData.access_request.splice(index, 1);
      } else if (sessionData.blocked_request.includes(_id)) {
        let index = sessionData.blocked_request.indexOf(_id);
        sessionData.blocked_request.splice(index, 1);
      }

      if (status == "approved") {
        sessionData.approved_request.push(_id);
      } else if (status == "requested") {
        sessionData.access_request.push(_id);
      } else if (status == "blocked") {
        sessionData.blocked_requested.push(_id);
      }
    }
    // try {
    //   //drop element from approved
    //   let index = approved.indexOf(_id);
    //   approved.splice(index, 1);
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   //drop element from blocked
    //   let index = blocked.indexOf(_id);
    //   blocked.splice(index, 1);
    // } catch (error) {
    //   console.log(error);
    // }
    // try {
    //   //drop element from requested
    //   let index = req.indexOf(_id);
    //   req.splice(index, 1);
    // } catch (error) {
    //   console.log(error);
    // }
    //send updated session Data to server
    let payload = await axios.post(
      GLOBAL_URL + "session/update",
      {
        _id: params.sessionid,
        access_request: sessionData.access_request,
        approved_request: sessionData.approved_request,
        blocked_request: sessionData.blocked_requested,
      },
      res
    );
    payload = payload.data.data;
    broadcastState(payload);
    console.log("session state modified");
    setSession(payload);
  }

  // function approveAll() {
  //   students.map(stu => {
  //     statusChangeHandler({target: {value: "approved"}}, stu._id);
  //   })
  // }

  async function activityChange() {
    let current = sessionData.current_activity;
    let iteration = sessionData.iteration;
    if (current == null) {
      current = sessionData.activity_order[0];
    } else {
      //find index of current activity
      let index = sessionData.activity_order.indexOf(current);
      console.log(index, sessionData.activity_order);
      if (index == sessionData.activity_order.length - 1) {
        current = sessionData.activity_order[0]; //reset iteration
        iteration += 1; //go to first activity of next iteration
        console.log(iteration);
      } else {
        current = sessionData.activity_order[index + 1];
      }
    }
    //update session
    let response = await axios.post(
      GLOBAL_URL + "session/update",
      {
        _id: params.sessionid,
        current_activity: current,
        iteration: iteration,
      },
      res
    );
    broadcastState(response.data.data);
    console.log("Session Modified");
    setSession(response.data.data);
  }

  //fetch Data in case state hook is null
  if ((students.length == 0) & (sessionData != null)) {
    getStudents();
  }

  if (sessionData == null) {
    getSession();
  }

  return (
    <div>
      <div>
        <br />
        <div className="flex flex-col items-center justify-center inline-block">
          <Card className="bg-blue-500 w-3/5 text-center text-white">
            <CardBody>
              <Typography variant="h4">
                {sessionData?.title}{" "}
                <Button
                  size="sm"
                  color="blue"
                  className="bg-blue-700 text-white m-auto"
                  onClick={() => {
                    openDrawer();
                    console.log(sessionData);
                  }}
                >
                  Students
                </Button>
              </Typography>
              <br />
              <div className="w-1/5 inline-block">
                <Typography className="text-left mb-2" variant="h6">
                  This is a Offline Session
                </Typography>
                <Typography className="text-left mb-2" variant="h6">
                  Enter youtube video link
                </Typography>
                <Input
                  className="mb-4"
                  color="white"
                  variant="outlined"
                  label="youtube link"
                />
              </div>
              <div className="w-3/5 ml-20 inline-block">
              <div className="flex flex-col overflow-x-auto overflow-y-auto max-h-80">
                <div className="sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-x-auto">
                      <table className="min-w-full text-left text-sm font-light">
                        <thead className="border-b font-medium dark:border-neutral-500">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              #
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Student Name
                            </th>
                            <th scope="col" className="px-6 py-4">
                              List of Questions posed
                            </th>
                            <th scope="col" className="px-6 py-4">
                              tagging
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Priority
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium">
                              1
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          </tr>
                          <tr className="border-b dark:border-neutral-500">
                            <td className="whitespace-nowrap px-6 py-4 font-medium ">
                              2
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          </tr>
                          <tr className="border-b ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium ">
                              3
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          </tr>
                          <tr className="border-b ">
                            <td className="whitespace-nowrap px-6 py-4 font-medium ">
                              4
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                            <td className="whitespace-nowrap px-6 py-4">Cell</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              </div>
              <br/>
              <br/>
              {sessionData?.current_activity == null ? (
                <>No activity in progress</>
              ) : (
                <>
                  Current Activity: {sessionData?.current_activity}
                  <br />
                </>
              )}
              Current Iteration: {sessionData?.iteration}
              <br />
              <br />
              <Button
                size="sm"
                color="blue"
                className="bg-blue-700 text-white m-auto"
                onClick={() => {
                  activityChange();
                }}
              >
                {sessionData?.current_activity == null
                  ? "Start Activity"
                  : "Next Activity"}
              </Button>
              <br />
              {/* <Button size="sm" gradientMonochrome="failure" className="m-auto">
                End Session
              </Button> */}
              <hr className="mt-6 mb-0" />
            
            </CardBody>
            {sessionData?.current_activity ==
              "Deliver Content & Question Posing" && (
              <>
                <h1>Hello</h1>
              </>
            )}
            {sessionData?.current_activity == "Deliver Content" && (
              <>
                <Input
                  label="Resources(if any)"
                  type="text"
                  inputRef={resref}
                  color="purple"
                  className="text-white"
                />
                <Button
                  className="mt-4 bg-green-500"
                  color="green"
                  onClick={boradCastResource}
                >
                  Send the Resources to students
                </Button>
              </>
            )}
            {sessionData?.current_activity == "Question Posing" ||
            sessionData?.current_activity == "Peer Prioritization" ? (
              <CardBody>
                <Questions iteration={sessionData.iteration} />
              </CardBody>
            ) : sessionData?.current_activity == "Question Answering" ? (
              <CardBody>
                Select Questions to be answered
                <QuestionSelect
                  iteration={sessionData.iteration}
                  sessionHandler={setSession}
                  broadcaster={broadcastState}
                />
              </CardBody>
            ) : (
              <div>No ongoing activity to display</div>
            )}
          </Card>
          <br />
        </div>
      </div>

      <Drawer
        open={open}
        onClose={closeDrawer}
        className="p-4"
        placement="left"
      >
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Students
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <div>
          <Checkbox
            color="green"
            label="Approve All"
            ripple={false}
            onClick={() => {
              statusChangeHandler(
                {
                  target: {
                    value: "approved",
                  },
                },
                students
              );
            }}
          />
        </div>
        <div className="flex flex-row overflow-y-auto w-full">
          <table className="w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-2/3 ">
                  Name
                </th>
                <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-1/3 ">
                  Permission
                </th>
              </tr>
            </thead>
            <tbody>
              {students.length != 0 ? (
                students.map((student) => {
                  if (student == null) {
                    return null;
                  }
                  return (
                    <tr>
                      <td>{student.name}</td>
                      <td>
                        <select
                          defaultValue={
                            sessionData.approved_request.includes(student._id)
                              ? "approved"
                              : sessionData.blocked_request.includes(
                                  student._id
                                )
                              ? "blocked"
                              : "requested"
                          }
                          onChange={(e) => {
                            statusChangeHandler(e, student._id);
                          }}
                        >
                          <option value={"approved"}>Approved</option>
                          <option value={"requested"}>Requested</option>
                          <option value={"blocked"}>Blocked</option>
                        </select>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  {" "}
                  <Spinner />
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Drawer>
    </div>
  );
};

export default Creator;
