import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Button, Card } from "@material-tailwind/react";
import { GLOBAL_URL, SOCKET_URL } from "../../../../../config";
import { io } from "socket.io-client";
import FileDownload from "js-file-download";
import { CSVLink } from "react-csv";
import axios from "axios";
import { check } from "../../../../../Cookies";
import { useParams } from "react-router-dom";

const socket = io(SOCKET_URL);

const res = {
  headers: {
    "Content-type": "application/json",
  },
};

const StudentEnd = () => {
  const labels = {
    0.5: "Learned 0-10%",
    1: "Learned 10-20%",
    1.5: "Learned 20-30%",
    2: "Learned 30-40%",
    2.5: "Learned 40-50%",
    3: "Learned 50-60%",
    3.5: "Learned 60-70%",
    4: "Learned 70-80%",
    4.5: "Learned 80-90%",
    5: "Learned 90-100%",
  };

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const params = useParams();

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  async function addRating() {
    const response = await axios.post(
      GLOBAL_URL + "session/update",
      {
        _id: params.sessionid,
        rating: value,
      },
      res
    );
    console.log(response);
    socket.emit(params.sessionid + "ratingChange", params.sessionid);
    window.location.href = "/profile";
  }

  return (
    <div className="w-full h-screen bg-blue-gray-100 grid place-items-center">
      <div className="w-4/5 flex flex-col gap-10 justify-center items-center">
        <p className="text-3xl font-montserrat font-montserratWeight text-green-800">
          How much efficient was the lecture?
        </p>
        <div className="flex gap-1 text-center">
          <Rating
            name="size-large"
            defaultValue={2}
            size="large"
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <p className="text-xl font-poppins font-semibold mt-1">
              {labels[hover !== -1 ? hover : value]}
            </p>
          )}
        </div>
      </div>
      <Button onClick={addRating}>Done Rating</Button>
    </div>
  );
};

const TeacherEnd = () => {
  const [rating, setRating] = useState(0);
  const [sessionData, setSessionData] = useState(null);
  const [students, setStudents] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [sessionCSVData, setSessionCSVData] = useState([]);
  const [questionCSVData, setQuestionCSVData] = useState([]);
  const params = useParams();

  useEffect(() => {
    socket.on(params.sessionid + "ratingChange", async () => {
      let sum = 0;
      const session = await axios.post(
        GLOBAL_URL + "session/get",
        { _id: params.sessionid },
        res
      );
      session.data.data.rating.map((r) => (sum += r));
      setRating(sum / (session.data.data.rating.length * 5));
    });

    async function getSession() {
      const sessionId = params.sessionid;
      var stus = null;
      var ques = null;
      try {
        const response = await axios.post(
          GLOBAL_URL + "session/get",
          { _id: sessionId },
          res
        );
        console.log(response);
        stus = response.data.data.approved_request;
        ques = response.data.data.questions;
        setSessionData(response.data.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const response2 = await axios.post(
          GLOBAL_URL + "user/getIDs",
          { _ids: stus },
          res
        );
        console.log(response2);
        setStudents(response2.data.data);
      } catch (error) {
        console.log(error);
      }

      try {
        const response3 = await axios.post(
          GLOBAL_URL + "question/getByIds",
          { _ids: ques },
          res
        );
        console.log(response3);
        setQuestions(response3.data.data);
      } catch (error) {
        console.log(error);
      }
    }

    async function getSessionCSVData(){
      const sessionId = params.sessionid;
      try {
        const response = await axios.post(
          GLOBAL_URL + "session/sessionCSV", {_id: sessionId}, res
        )
        console.log(response);
        const sessioncsvData = [
          ['ID', "Session Title", 'Description', "Start Data and Time", "End Date and Time", 'Teacher for Session', 'Session Code', 'Total Questions', 'Question Posed in Session', 'Total Students', "Students in Session", 'Activity in Session'],
          response.data.data,
        ]
        setSessionCSVData(sessioncsvData)
      } catch (error) {
        console.log(error);
      }
    }

    async function getQuestionCSVData() {
      const sessionId = params.sessionid;
      let response;
      let ques;
      try {
        response = await axios.post(
          GLOBAL_URL + "session/get",
          { _id: sessionId },
          res
        );
        console.log(response)
        ques = response.data.data.questions;
      } catch (error) {
        console.log(error);
      }

      try {
        const response2 = await axios.post(
          GLOBAL_URL + "question/getQuestionCSV",
          // GLOBAL_URL + "question/getByIds",
          { _ids : ques }, res
        )
        console.log(response2);
        const questioncsvData = [
          ['ID', 'Question Text', 'Question Tag', "Question Posed By", "Priority by Student", "Peers Names Who Prioritized", "Priority By Peers"],
          ...response2.data.data
        ]
        setQuestionCSVData(questioncsvData);
      } catch (error) {
        console.log(error);
      }

      // try {
      //   const response2 = await axios.post(
      //     GLOBAL_URL + "question/getByIds",
      //     { _ids: ques },
      //     res
      //   );
      //   console.log(response2);
      //   const questioncsvData = [
      //     ['ID', 'Question Text', 'Question Tag', "Question Posed By", "Priority by Student", "Peers Names Who Prioritized", "Priority By Peers"],
      //     response2.data.data.map(ques => {
      //       let names = [];
      //       let priorities = [];
      //       for (let ele of ques[])
      //     })
      //   ]
      // } catch (error) {
      //   console.log(error);
      // }
    }

    getSession();
    getSessionCSVData();
    getQuestionCSVData();
  }, [socket]);

  function calculatePriority(priority_list = []) {
    let sum = 0;
    priority_list.map((p) => {
      sum += +p.priority;
    });
    return sum/priority_list.length;
  }

  return (
    <div className="w-full h-full bg-blue-gray-100 grid place-items-center">
      {sessionData && (
        <div className="flex flex-col gap-4">
          <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold">
            Session: {sessionData.title}
          </h1>
          <h2 className="text-3xl text-dark-gray font-montserrat font-extrabold">
            Session Code: {sessionData.sessionCode}
          </h2>
          <h2 className="text-3xl text-dark-gray font-montserrat font-extrabold">
            Iterations Done: {sessionData.iteration}
          </h2>
          <h2 className="text-3xl text-dark-gray font-montserrat font-extrabold">
            Student:
          </h2>
          <div className="flex gap-8">
            {students.map((stu) => (
              <p className="text-xl text-dark-gray font-poppins">{stu.name}</p>
            ))}
          </div>
          <h4 className="text-2xl text-dark-gray font-montserrat font-extrabold">
            Total Student: {sessionData.approved_request.length}
          </h4>
          <h4 className="text-2xl text-dark-gray font-montserrat font-extrabold">
            Total Question: {sessionData.questions.length}
          </h4>
          <Card className="h-full w-full overflow-scroll">
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Name
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Question
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Priority By Student
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Priority By Peers
                    </Typography>
                  </th>
                  <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      Question Tag
                    </Typography>
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((ques) => (
                  <tr className="even:bg-blue-gray-50/50">
                    <td className="p-4">
                      <Typography
                        variant="small" color="blue-gray" className="font-normal"
                      >
                        {ques[0].raisedByName}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small" color="blue-gray" className="font-normal"
                      >
                        {ques[0].questionText}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small" color="blue-gray" className="font-normal"
                      >
                        {ques[0].priorityBySelf}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small" color="blue-gray" className="font-normal"
                      >
                        {calculatePriority(ques[0].priorityByPeer)}
                      </Typography>
                    </td>
                    <td className="p-4">
                      <Typography
                        variant="small" color="blue-gray" className="font-normal"
                      >
                        {ques[0].questionTag}
                      </Typography>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
      <div className="w-4/5 my-5 flex flex-col gap-10 justify-center items-center">
        <p>You will see here to overall success rate of your lecture</p>
        {rating === 0 ? (
          <Typography variant="lead">
            Student are giving the rating please wait
          </Typography>
        ) : (
          <Typography variant="h1">SuccessRate: {rating * 100}%</Typography>
        )}
      </div>
      {/* <Button color="Blue">
        Get Session CSV
      </Button> */}
      <div className="flex gap-10">
        <CSVLink filename="session.csv" data={sessionCSVData}>
          <Button color="Blue">
            Get Session CSV
          </Button>
        </CSVLink>
        <CSVLink filename="question.csv" data={questionCSVData}>
          <Button color="Green">
            Get Question CSV
          </Button>
        </CSVLink>
      </div>
    </div>
  );
};

const EndActivity = () => {
  return check().type === "teacher" ? <TeacherEnd /> : <StudentEnd />;
};

export default EndActivity;
