"use client";

import { React, useState, useRef, useEffect } from "react";
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
  Select,
  Option,
} from "@material-tailwind/react";
import { GLOBAL_URL, SOCKET_URL } from "../../../../../config";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { io } from "socket.io-client";
import { getSessionCode } from "../../../../../Cookies";
import Carousel from "react-elastic-carousel";

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
    console.log(result);
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

  function calculatePriority(priorityArray, prioritySelf) {
    let sum = 0;
    priorityArray.forEach((p) => {
      sum += p.priority;
    });
    sum += prioritySelf;
    sum /= priorityArray.length + 1;
    return sum.toFixed(2);
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
              // <>
              //   <div
              //     className="w-full p-4 flex gap-5 justify-evenly"
              //     {...provided.droppableId}
              //     ref={provided.innerRef}
              //   >
              //     <h3>Raised By</h3>
              //     <h3>Question</h3>
              //     <h3>Overall Priority</h3>
              //   </div>
              //   {questions &&
              //     questions.map((ques, ind) => (
              //       <Draggable
              //         key={ques._id}
              //         draggableId={ques._id}
              //         index={ind}
              //         className="w-full p-4 flex gap-5 justify-evenly odd:bg-gray-300 border-2 border-black my-2"
              //       >
              //         {(provided) => (
              //           <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
              //               className="w-full p-4 flex gap-5 justify-evenly odd:bg-gray-300 border-2 border-black my-2"
              //           >
              //             <div index={ind} dropHandler={dropHandler}>
              //               <h3>{ques.raisedByName}</h3>
              //               <h3>{ques.questionText}</h3>
              //               <h3>
              //                 {calculatePriority(
              //                   ques.priorityByPeer,
              //                   ques.priorityBySelf
              //                 )}
              //               </h3>
              //             </div>
              //           </div>
              //         )}
              //       </Draggable>
              //     ))}
              // </>
              <>
                <div className="w-full p-4 flex gap-5 justify-evenly">
                  <h3 className="w-1/5 text-center font-montserrat font-montserratWeight text-xl">
                    Raised By
                  </h3>
                  <h3 className="w-1/5 text-center font-montserrat font-montserratWeight text-xl">
                    Question
                  </h3>
                  <h3 className="w-1/5 text-center font-montserrat font-montserratWeight text-xl">
                    Overall Priority
                  </h3>
                </div>
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
                            className="w-full p-4 flex gap-5 justify-evenly border-2 border-black my-2"
                          >
                            <h3 className="w-1/5 text-center">
                              {q.raisedByName}
                            </h3>
                            <h3 className="w-1/5 text-center">
                              {q.questionText}
                            </h3>
                            <h3 className="w-1/5 text-center">
                              {calculatePriority(
                                q.priorityByPeer,
                                q.priorityBySelf
                              )}
                            </h3>
                            {/* <QuestionCard
                            question={q}
                            index={index}
                            dropHandler={dropHandler}
                          ></QuestionCard> */}
                          </li>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </ul>
              </>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    );
  }
};

const PriorityQuestion = () => {
  const [priorityQuestions, setPriorityQuestion] = useState([]);
  const params = useParams();

  useEffect(async () => {
    try {
      let sessionInfo = await axios.post(
        GLOBAL_URL + "session/get",
        { _id: params.sessionid },
        res
      );

      let sessionIteration = sessionInfo.data.data.iteration - 1;
      let priorityQuestionIds =
        sessionInfo.data.data.selected_questions[sessionIteration].questions;

      priorityQuestionIds.map(async (ques) => {
        const quesData = await axios.post(
          GLOBAL_URL + "question/getById",
          { _id: ques },
          res
        );
        setPriorityQuestion((prev) => [
          ...prev,
          quesData.data.data[0].questionText,
        ]);
      });
    } catch (error) {
      console.log(error);
    }
    return () => {}
  }, []);

  return (

      priorityQuestions &&
        priorityQuestions.map((ques) => (
            <div className="w-full p-5 my-5 bg-blue-gray-200 text-orange-500 flex flex-col items-center justify-center">
              <h1 className="text-3xl font-redHatMono font-redHatMonoWeight underline">
                {ques}
              </h1>
            </div>
        ))
    // <div className="w-full p-5 bg-blue-gray-200 text-orange-500 grid place-items-center">
    //   {priorityQuestions && priorityQuestions.map(ques => (
    //     <h1 className="font-3xl font-redHatMono font-redHatMonoWeight underline">{ques}</h1>
    //   ))}
    // </div>
  );
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
      <Card className="overflow-x-auto overflow-y-auto h-[90%] mt-4">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Student Name
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Question Posed
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Tag
                </Typography>
              </th>
              <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  Priority
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody>
            {questions.map(
              ({ raisedByName, questionText, questionTag, priorityBySelf }) => (
                <tr key={questionText} className="even:bg-blue-gray-50/50">
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {raisedByName}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {questionText}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {questionTag}
                    </Typography>
                  </td>
                  <td className="p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {priorityBySelf}
                    </Typography>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </Card>
    );
    // return (
    //   <div className="w-full overflow-auto">
    //     <h4 className="text-xl mb-2"> Submitted Questions </h4>
    //     <table className="w-full min-w-max table-auto text-left overflow-auto">
    //       <thead>
    //         <tr className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 text-blue-gray-800">
    //           <th>Question Text</th>
    //           <th>Type</th>
    //           <th>Posed By</th>
    //           <th>Self-Priority</th>
    //           <th>Peer-Priority</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {questions.map((object) => {
    //           return (
    //             <tr className="p-4 border-b border-blue-gray-50">
    //               <td className="px-1">{object.questionText}</td>
    //               <td className="px-1">{object.questionTag}</td>
    //               <td className="px-1">{object.raisedBy}</td>
    //               <td className="px-1">{object.priorityBySelf}</td>
    //               <td className="px-1">{object.priorityByPeer}</td>
    //             </tr>
    //           );
    //         })}
    //       </tbody>
    //     </table>
    //   </div>
    // );
  }
};

const QuestionPriority = ({ iteration, sessionHandler }) => {
  const dragItem = useRef(0);
  const dragOverItem = useRef(0);
  const [questions, setQuestion] = useState(null);
  const params = useParams();

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

  function calculatePriority(priorityArray, prioritySelf) {
    let sum = 0;
    priorityArray.forEach((p) => {
      sum += p.priority;
    });
    sum += prioritySelf;
    sum /= priorityArray.length + 1;
    return sum.toFixed(2);
  }

  if (questions === null) {
    getQuestions();
  }

  function sortQuestions() {
    const questionsClone = [...questions];
    const draggedItemContent = questionsClone[dragItem.current];
    questionsClone.splice(dragItem, 1);
    questionsClone.splice(dragOverItem, 0, draggedItemContent);
    dragItem.current = null;
    dragOverItem.current = null;
    setQuestion(questionsClone);
  }

  return (
    <>
      <div className="w-full p-4 flex gap-5 justify-evenly" draggable>
        <h3>Raised By</h3>
        <h3>Question</h3>
        <h3>Overall Priority</h3>
      </div>
      {questions &&
        questions.map((ques, ind) => (
          <div
            className="w-full p-4 flex gap-5 justify-evenly odd:bg-gray-300 border-2 border-black my-2"
            draggable
            onDragStart={(e) => {
              dragItem.current = ind;
            }}
            onDragEnter={(e) => {
              dragOverItem.current = ind;
            }}
            onDragEnd={() => {
              sortQuestions();
            }}
            onDragOver={(e) => {
              e.preventDefault();
            }}
          >
            <h3>{ques.raisedByName}</h3>
            <h3>{ques.questionText}</h3>
            <h3>
              {calculatePriority(ques.priorityByPeer, ques.priorityBySelf)}
            </h3>
          </div>
        ))}
    </>
  );
};

const Creator = () => {
  const params = useParams();
  const [open, setOpen] = useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  const [sessionData, setSession] = useState(null);
  const [students, setStudents] = useState([]);
  const [linkState, setLinkState] = useState(false);

  const resref = useRef("");
  const zref = useRef(0);

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

  const getQuestionText = async (id) => {
    try {
      const response = await axios.post(
        GLOBAL_URL + "question/getById",
        { _id: id },
        res
      );
      return response.data.data[0].questionText;
    } catch (error) {
      return error;
    }
  };

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
    console.log("--------------------------------------------")
    console.log("Session Modified");
    console.log("--------------------------------------------")
    setSession(response.data.data);
  }

  const endActivity = async () => {
    const currDate = new Date();

    try {
      const response = await axios.post(
        GLOBAL_URL + "session/update", {_id: params.sessionid, endDateTime: new Date(currDate)}, res
      )
      console.log(response);
      socket.emit(params.sessionid + "EndActivity", params.sessionid)
      window.location.href = `/course`;
    } catch (error) {
      console.log(error);
    }
  }

  const getDistributedQuestion = async () => {
    try {
      const response = await axios.post(
        GLOBAL_URL + "session/distributedQuestions",
        {
          sessionId: params.sessionid,
          priority: Number(zref.current.value),
          iteration: sessionData.iteration
        },
        res
      );
      console.log(response);
      let students = response.data.studentUpdate;
      students.map((stu) => {
        socket.emit(params.sessionid + stu._id + "UpdateQuestions", stu);
      });
    } catch (error) {
      console.log(error);
    }
  };

  //fetch Data in case state hook is null
  if ((students.length == 0) & (sessionData != null)) {
    getStudents();
  }

  if (sessionData == null) {
    getSession();
  }

  function boradcastSessionMode(e) {
    if (e === "online") {
      console.log("online");
      setLinkState(true);
    } else if (e === "offline") {
      console.log("offline");
      setLinkState(false);
    }
    socket.emit(params.sessionid + "session-mode", e);
  }

  return (
    <div>
      <div>
        <br />
        <div className="flex flex-col items-center justify-center">
          <Card className="w-[95%] text-center">
            <Typography variant="h1">
              {sessionData?.current_activity == null ? (
                <>No activity in progress</>
              ) : (
                <>Current Activity: {sessionData?.current_activity}</>
              )}
            </Typography>
            <Typography variant="h3" className="my-5">
              Current Iteration: {sessionData?.iteration}
            </Typography>
            <Typography variant="h2">
              {sessionData?.title}{" "}
              <Button
                size="sm"
                color="blue"
                className="bg-blue-600 text-white my-5 mx-auto hover:text-black "
                onClick={() => {
                  openDrawer();
                  console.log(sessionData);
                }}
              >
                Students
              </Button>
            </Typography>
            {sessionData?.current_activity ==
              "Deliver Content & Question Posing" && (
              <div className="grid grid-cols-1 sm:grid-cols-2">
                <div className="flex flex-col gap-10 p-4 w-full h-screen">
                  <div className="h-1/4">
                    <div className="mb-4">
                      <Select
                        label="Session Mode"
                        onChange={boradcastSessionMode}
                      >
                        <Option selected value="online" className="text-black">
                          This is an Online Session
                        </Option>
                        <Option value="offline" className="text-black">
                          This is an Offline Session
                        </Option>
                      </Select>
                    </div>
                    {linkState && (
                      <>
                        <Input
                          className=""
                          color="black"
                          variant="outlined"
                          label="youtube link"
                          inputRef={resref}
                        />
                        <Button
                          className="mt-8 bg-green-500"
                          color="green"
                          onClick={boradCastResource}
                        >
                          Send the Resources to students
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="w-full flex flex-col gap-5 mt-4 border-2">
                    <Typography variant="h4">
                      Number of questions: {sessionData.questions.length}
                    </Typography>
                    <Typography variant="h4">
                      Number of Student:{" "}
                      {sessionData.access_request.length +
                        sessionData.approved_request.length +
                        sessionData.blocked_request.length}
                    </Typography>
                  </div>
                </div>

                <div className="bg-green-500 text-white sm:w-4/5 md:w-full h-screen">
                  <Questions iteration={sessionData.iteration} />
                </div>
              </div>

              // <>
              //   <CardBody>
              //     <div className="w-1/5 inline-block">
              //       <Typography className="text-left mb-2" variant="h6">
              //         This is a Offline Session
              //       </Typography>
              //       <Typography className="text-left mb-2" variant="h6">
              //         Enter youtube video link
              //       </Typography>
              // <Input
              //   className="mb-4"
              //   color="white"
              //   variant="outlined"
              //   label="youtube link"
              //   inputRef={resref}
              // />
              // <Button
              //   className="mt-4 bg-green-500"
              //   color="green"
              //   onClick={boradCastResource}
              // >
              //   Send the Resources to students
              // </Button>
              //     </div>
              //     <Questions iteration={sessionData.iteration} />
              //     {/* <Button size="sm" gradientMonochrome="failure" className="m-auto">
              //   End Session
              // </Button> */}
              //     <hr className="mt-6 mb-0" />
              //   </CardBody>
              // </>
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
                <div className="w-full flex gap-5 py-4 justify-center my-4 border-2">
                  <Typography variant="h4">
                    Number of questions: {sessionData.questions.length}
                  </Typography>
                  <Typography variant="h4">
                    Number of Student:{" "}
                    {sessionData.access_request.length +
                      sessionData.approved_request.length +
                      sessionData.blocked_request.length}
                  </Typography>
                </div>
                <p>Maximum Value: {sessionData.approved_request.length - 1}</p>
                <p>Minimum Value: 1</p>
                <Input
                  type="Number"
                  min={1}
                  max={
                    sessionData.access_request.length +
                    sessionData.approved_request.length +
                    sessionData.blocked_request.length -
                    1
                  }
                  inputRef={zref}
                  label="Number of student to review a single question"
                />
                <Button onClick={getDistributedQuestion}>Submit</Button>
                <Questions iteration={sessionData.iteration} />
              </CardBody>
            ) : sessionData?.current_activity == "Question Answering" ? (
              <CardBody>
                  <PriorityQuestion />
                {/* <QuestionSelect
                  iteration={sessionData.iteration}
                  sessionHandler={setSession}
                  broadcaster={broadcastState}
                /> */}
              </CardBody>
            ) : sessionData?.current_activity == "Teacher Priortization" ? (
              // <QuestionPriority iteration={sessionData.iteration} />
              <>
                <p>Select Questions to be answered</p>
                <QuestionSelect
                  iteration={sessionData.iteration}
                  sessionHandler={setSession}
                  broadcaster={broadcastState}
                />
              </>
            ) : (
              <div>No ongoing activity to display</div>
            )}
          </Card>
          <br />
        </div>
        <Button
          size="sm"
          color="blue"
          className="bg-blue-600 text-white my-5 mx-auto hover:text-black"
          onClick={() => {
            activityChange();
          }}
        >
          {sessionData?.current_activity == null
            ? "Start Activity"
            : "Next Activity"}
        </Button>
        {sessionData?.iteration > 1 && (
          <Button
            size="sm"
            color="blue"
            className="bg-blue-600 text-white my-5 mx-auto hover:text-black"
            onClick={endActivity}
          >
            End Activity
          </Button>
        )}
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
