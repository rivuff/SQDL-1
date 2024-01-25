import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GLOBAL_URL, SOCKET_URL } from "../../../../../config";
import { io } from "socket.io-client";
import { useState } from "react";
import {
  check,
  set,
  getSpecificData,
  setSpecificData,
} from "../../../../../Cookies";
import axios from "axios";
import {
  Card,
  CardBody,
  Typography,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import QuestionForm from "../../../../../questionPosing/questionForm";
const socket = io(SOCKET_URL);
const res = {
  headers: {
    "Content-type": "application/json",
  },
};

const SelectedQuestions = ({ session }) => {
  const params = useParams();
  const [questions, setQuestion] = useState(null);

  async function getQuestion() {
    let payload = await axios.post(GLOBAL_URL + "question/get", {
      index: session.iteration,
      session: params.sessionid,
    });
    //needs to be dynamically updated
    payload = payload.data;
    //consider making payload sortable here
    setQuestion(payload);
  }
  if (questions == null) {
    getQuestion();
  } else {
    return (
      <div>
        {questions.map((question) => {
          return (
            <div className="w-full flex-row border-2 border-blue-gray-200">
              <Typography variant="h6">{question.questionText}</Typography>
              <Typography variant="small">
                Type: {question.questionTag}
              </Typography>
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
        })}
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

const Allowed = () => {
  const params = useParams();

  const [sessionMode, setSessionMode] = useState(null);
  const [dcFinished, setDCFinished] = useState(getSpecificData("DCState"));
  const [editState, setEditState] = useState(false);
  const [userPriorityArray, setUserPriorityArray] = useState([]);

  function socketBroadcast() {
    console.log("Send update to teacher interface using socket");
    socket.emit(params.sessionid + "teacherstateUpdate", { fetch: true });
  }

  const [sessionData, setSession] = useState(null);
  const [teacherRes, setTeacherRes] = useState(null);
  const [userQuestions, setUserQuestions] = useState(null);
  // false -> not clicked , true -> clicked
  const [videoState, setVideoState] = useState(false);
  const [questionState, setQuestionState] = useState(false);
  const [Z, setZ] = useState(0);
  const [isDistributed, setIsDistributed] = useState("Delivering");
  const [priorityQuestions, setPriorityQuestion] = useState([]);

  const [teacherQuestions, setTeacherQuestions] = useState([]);

  const getUserQuestions = (act) => {
    console.log("Getting question posed by user");
    console.log(check().questions);
    setUserQuestions([]);
    setUserPriorityArray([]);
    check().questions.map(async (ques) => {
      const response = await axios.post(
        GLOBAL_URL + "question/getById",
        { _id: ques },
        res
      );
      console.log(response);
      let session = await axios.post(
        GLOBAL_URL + "session/get",
        { _id: params.sessionid },
        res
      );
      session = session.data.data;
      if ((response.data.data[0].iteration === session.iteration) && (response.data.data[0].session === session._id)) {
        if (act === "Peer Prioritization") {
          setUserPriorityArray((prev) => [
            ...prev,
            {
              id: response.data.data[0]._id,
              Priority: 1,
            },
          ]);
          console.log(userPriorityArray);
        } else if (act === "Not Peer Prioritization") {
          console.log(sessionData?.current_activity);
          setUserPriorityArray((prev) => [
            ...prev,
            {
              id: response.data.data[0]._id,
              Priority: response.data.data[0].priorityBySelf,
            },
          ]);
        }
        setUserQuestions((prev) => [...prev, response.data.data[0]]);
      }
    });
  };

  useEffect(() => {
    socket.on("receive-link", (link) => {
      setTeacherRes(link);
      setVideoState(true);
      console.log("Link received");
    });

    socket.on(params.sessionid + "session-mode", (arg) => {
      if (arg === "offline") {
        setTeacherRes(null);
      }
      setSessionMode(arg);
    });

    socket.on(params.sessionid + "Z", (sessionid, z) => {
      setZ(z);
    });

    socket.on(params.sessionid + check()._id + "UpdateQuestions", (student) => {
      setIsDistributed("Deliverd");
      set(student);
      getUserQuestions("Peer Prioritization");
    });

    socket.on(params.sessionid + "EndActivity-Student", (arg) => {
      window.location.href = `/course/${params.subjectid}/${params.moduleid}/${params.sessionid}/end`;
    });

    socket.on(params.sessionid + "PriorityQuestions", (questions) => {
      setPriorityQuestion(questions);
    });

    socket.on(params.sessionid + "PriorityQuestionChange", (questions) => {
      setSpecificData("TeacherPriorityQuestions", questions);
    });

    socket.on(params.sessionid + 'sendQuestionToStudent', (questions) => {
      console.log("received", questions.questionText);
      // console.log(teacherQuestions.indexOf(questions))
      const ind = teacherQuestions.findIndex((ques) => ques === questions);
      console.log(ind);
      if (ind === -1) {
        setTeacherQuestions(prev => [...prev, questions]);
      } else {
        // let x = teacherQuestions;
        // x.splice(ind, 1);
        setTeacherQuestions(prev => teacherQuestions.filter(ques => ques !== questions));
      }
      console.log(teacherQuestions);
    })

    if (sessionData !== null) {
      getUserQuestions("Not Peer Prioritization");
    }
  }, [socket]);

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
      return () => {};
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

  async function getSession() {
    let payload = await axios.post(
      GLOBAL_URL + "session/get",
      { _id: params.sessionid },
      res
    );
    try {
      payload = payload.data.data;
      setSession(payload);
      console.log("----------------------------------------------");
      console.log("From allowed get session", payload);
      console.log("----------------------------------------------");
    } catch (e) {
      console.log("Error fetching data");
    }
  }

  

  const setPeerPriority = async () => {
    console.log(userPriorityArray);
    userPriorityArray.map(async (q) => {
      try {
        const response = await axios.post(
          GLOBAL_URL + "question/priorityByPeer",
          { rating: q.Priority, questionId: q.id, studentId: check()._id },
          res
        );
        console.log(response);
        setIsDistributed("sometext");
      } catch (error) {
        console.log(error);
      }
    });
  };

  const updateQuestionPriority = (e, id) => {
    console.log(e.target.value, id);
    console.log(userQuestions);
    const x = userPriorityArray.map((q) => {
        if (q.id === id) {
          return { ...q, Priority: Number(e.target.value) };
        } else {
          return q;
        }
      })
      console.log(x);
    // setUserPriorityArray(
      
    // );
  };

  const updateQuestion = () => {
    console.log(userPriorityArray);
    // setUserQuestions([]);
    userPriorityArray.map(async (p) => {
      try {
        const response = await axios.post(
          GLOBAL_URL + "question/update",
          { _id: p.id, priorityBySelf: p.Priority },
          res
        );
        console.log(response);
        setUserQuestions((prev) => [...prev, response.data.data]);
      } catch (error) {
        console.log(error);
      }
    });
  };

  const finishActivity = (act) => {
    if (act === "DCState") {
      setDCFinished(true);
    }
    setSpecificData(act, true);
  };

  if (sessionData == null) {
    getSession();
  }
  socket.on(params.sessionid + "student" + "stateUpdate", (args) => {
    console.log("Reloading Session Data");
    if (args.current_activity === "Deliver Content & Question Posing") {
      setDCFinished(false);
      setEditState(false);
      setVideoState(false);
      setQuestionState(false);
    }
    setSession(args);
    // getSession(); //perform request everytime socket broadcast is received
  });

  return (
    <div>
      <div className="flex flex-col items-center justify-center min p-10">
        <Typography variant="h2" className="mb-4">
          Hello {check().name}
        </Typography>
        <Typography variant="h3" className="mb-4">
          {sessionData?.current_activity
            ? `Current Activity is ${sessionData?.current_activity}`
            : "Session has not started yet"}
        </Typography>
        <hr />
        {sessionData?.current_activity == "Deliver Content & Question Posing" &&
          !dcFinished && (
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 h-screen w-full">
              {/* For youtube video */}
              <div class="p-4 h-full flex flex-col items-center row-span-2">
                {teacherRes ? (
                  <>
                    <div
                      className="embed-responsive aspect-w-4 aspect-h-3 mb-4"
                      dangerouslySetInnerHTML={{ __html: teacherRes }}
                    />
                  </>
                ) : sessionMode === "offline" ? (
                  <>
                    <p>
                      The Content delivery is offline so teacher will physically
                      teach you concept
                    </p>
                    <Checkbox
                      color="blue"
                      label="Submitted All my questions"
                      onClick={() => {
                        setQuestionState(true);
                      }}
                      disabled={questionState}
                    />
                    {questionState && (
                      <Button
                        color="green"
                        onClick={() => {
                          finishActivity("DCState");
                        }}
                      >
                        Finish Activity
                      </Button>
                    )}
                  </>
                ) : !videoState && !questionState ? (
                  <p>The teacher shared resources will be shown here</p>
                ) : (
                  <p>
                    If you are finished please wait, else complete your
                    remaining work
                  </p>
                )}
                {videoState && (
                  <>
                    <Checkbox
                      color="blue"
                      label="I have seen the full video"
                      onClick={() => {
                        setTeacherRes(null);
                      }}
                      disabled={teacherRes === null}
                    />
                    <Checkbox
                      color="blue"
                      label="Submitted All my questions"
                      onClick={() => {
                        setQuestionState(true);
                      }}
                      disabled={questionState}
                    />
                    {teacherRes === null && questionState && (
                      <Button
                        color="green"
                        onClick={() => {
                          finishActivity("DCState");
                        }}
                      >
                        Finish Activity
                      </Button>
                    )}
                  </>
                )}
              </div>

              {/* For posing question */}
              <div class="bg-green-500 p-4 text-white h-screen">
                <Typography>
                  Teacher is accepting questions. Please submit question
                </Typography>
                <QuestionForm
                  onSubmit={socketBroadcast}
                  iteration={sessionData.iteration}
                  userQues={getUserQuestions}
                  questionState={questionState}
                ></QuestionForm>
                <Card className="overflow-x-auto overflow-y-auto h-[50%] mt-4">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
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
                      {userQuestions &&
                        userQuestions.map(
                          ({ questionText, priorityBySelf, questionTag }) => (
                            <tr
                              key={questionText}
                              className="even:bg-blue-gray-50/50"
                            >
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
              </div>

              {/* checkboxes */}
              {/* <div class="bg-yellow-500 p-4 text-white h-full">Item 3</div> */}

              {/* all questions */}
              {/* <div class="bg-red-500 p-4 text-white h-full">Item 4</div> */}
            </div>
          )}
        {sessionData?.current_activity == "Deliver Content & Question Posing" &&
          dcFinished && (
            <>
              {check().name}
              <Typography variant="h2">
                Teacher has not started next session Yet
              </Typography>
              <Typography variant="p">
                Mean time you can edit the question priority you have posed
              </Typography>
              <Card className="overflow-x-auto overflow-y-auto h-[50%] mt-4">
                <table className="w-full min-w-max table-auto text-left">
                  <thead>
                    <tr>
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
                    {console.log(userQuestions)}
                    {userQuestions &&
                      userQuestions.map((ques) => (
                        <tr key={ques._id} className="even:bg-blue-gray-50/50">
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {ques.questionText}
                            </Typography>
                          </td>
                          <td className="p-4">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {ques.questionTag}
                            </Typography>
                          </td>
                          <td className="p-4">
                            {!editState ? (
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {ques.priorityBySelf}
                              </Typography>
                            ) : (
                              <input
                                type="number"
                                placeholder={ques.priorityBySelf}
                                min={1}
                                max={5}
                                onChange={(e) => {
                                  updateQuestionPriority(e, ques._id);
                                  console.log(userPriorityArray);
                                }}
                              ></input>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </Card>
              <div class="mt-5">
                {!editState ? (
                  <Button
                    color="blue"
                    onClick={() => {
                      setEditState(true);
                    }}
                  >
                    Edit Priority
                  </Button>
                ) : (
                  <Button
                    color="blue"
                    onClick={() => {
                      setEditState(false);
                      updateQuestion();
                    }}
                  >
                    Done Editing
                  </Button>
                )}
              </div>
            </>
          )}
        {sessionData?.current_activity == "Deliver Content" ? (
          <>
            <Typography>
              Teacher is delivering lecture. Please await further action
            </Typography>
            {teacherRes && <h1>Resources provided by the teacher</h1>}
            <ul>
              {teacherRes &&
                teacherRes.map((res) => (
                  <li className="mt-4">
                    <div dangerouslySetInnerHTML={{ __html: res }} />
                  </li>
                ))}
            </ul>
          </>
        ) : sessionData?.current_activity == "Question Posing" ? (
          <>
            <Typography>
              Teacher is accepting questions. Please submit question
            </Typography>
            <QuestionForm
              onSubmit={socketBroadcast}
              iteration={sessionData.iteration}
            ></QuestionForm>
          </>
        ) : sessionData?.current_activity == "Peer Prioritization" ? (
          <>
            <Typography>Please prioritize these other questions</Typography>
            {isDistributed === "Delivering" ? (
              <p>Teacher will distribute the question please wait</p>
            ) : isDistributed === "Deliverd" ? (
              <>
                <Card className="overflow-x-auto overflow-y-auto h-[50%] mt-4">
                  <table className="w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
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
                            Priority By Onwer
                          </Typography>
                        </th>
                        <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal leading-none opacity-70"
                          >
                            Your Priority
                          </Typography>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {userQuestions &&
                        userQuestions.map((ques, ind) => (
                          <tr key={ind} className="even:bg-blue-gray-50/50">
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {ques.questionText}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {ques.questionTag}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                {ques.priorityBySelf}
                              </Typography>
                            </td>
                            <td className="p-4">
                              <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-normal"
                              >
                                <input
                                  type="Number"
                                  placeholder={userPriorityArray[ind].Priority}
                                  min={1}
                                  max={5}
                                  onChange={(e) => {
                                    updateQuestionPriority(e, ques._id);
                                  }}
                                ></input>
                              </Typography>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </Card>
                <Button color="blue" onClick={setPeerPriority}>
                  Done with Assigning priority
                </Button>
              </>
            ) : (
              <p>Please wait until next session starts</p>
            )}
          </>
        ) : sessionData?.current_activity == "Question Answering" ? (
          <>
            <Typography>
              Please Listen to teacher as she answers the questions
            </Typography>
            <div>
              {
                teacherQuestions && teacherQuestions.map((ques) => (
                  <div key={Math.random()} className="w-full p-5 my-5 bg-blue-gray-200 text-orange-500 flex flex-col items-center justify-center">
                    <h1 className="text-3xl font-redHatMono font-redHatMonoWeight underline">{ques.questionText}</h1>
                  </div>
                ))
              }
              {/* {getSpecificData("TeacherPriorityQuestions").map((ques) => (
                <div className="w-full p-5 my-5 bg-blue-gray-200 text-orange-500 flex flex-col items-center justify-center">
                  <h1 className="text-3xl font-redHatMono font-redHatMonoWeight underline">
                    {ques.questionText}
                  </h1>
                </div>
              ))} */}
            </div>
            {/* <Typography>Here are the questions teacher is answering</Typography>
            <PriorityQuestion /> */}
          </>
        ) : (
          ""
        )}
      </div>
      {/* <button onClick={() => {console.log(JSON.parse(localStorage.getItem("DCState")))}}>Click</button> */}
    </div>
  );
};

export default Allowed;
