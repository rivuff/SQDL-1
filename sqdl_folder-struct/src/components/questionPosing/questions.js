// src/QuestionForm.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserState } from "../../context/contextProvider";
import {
  Typography,
  Textarea,
  Button,
  Card,
  Input,
} from "@material-tailwind/react";
import { useParams } from "react-router-dom";
import { check } from "../Cookies";


// export const QuestionPosed =async () => {
//   const [questions, setQuestions] = useState([]);
//   const {user} = UserState();
//   const userId = user._id
//   const sessionId = user.currSession;
//   const params = useParams();
  
//  // const session  = await axios.get('http://localhost:5000/api/v1/session/getsessionquestion', params.sessionid)
//   useEffect(() => {

//     fetchQuestions();

//     console.log("trying to connect");
//     // socket.on('question_enabled', () => {
//     //   fetchAllQuestions(); // Fetch all questions again when the event is received
//     //   console.log("connected to socket");
//     // });

//     // return () => {
//     //   socket.disconnect(); // Disconnect the socket when the component unmounts
//     // };

//   }, []);
// }

//   // const fetchQuestions = async () => {

//   //   try {
//   //     // Replace 'http://your-backend-api.com' with your actual backend API URL
//   //     const response = await axios.get('http://localhost:5000/api/v1/question/usrId', {
//   //       params: {
//   //         userId: userId,
//   //       },
//   //     });

//   //     console.log("Question fetched");
//   //     setQuestions(response.data);
//   //     console.log(response.data);
//   //   } catch (error) {
//   //     console.error('Error fetching user questions:', error);
//   //   }
//   // };

//   const fetchQuestions = async (sessionIteration) => {
//     try {
//         const session = await axios.get('http://localhost:5000/api/v1/session/getsessionquestion',{
//           params:{
//             sessionid: sessionId
//           }
//         });
//         const response = await axios.get('http://localhost:5000/api/v1/question/usrId', {
//           params: {
//             userId: userId,
//             sessionIteration: session.iteration,
//           } // Pass the session iteration as a parameter
//     })     
//     } catch (error) {
//       console.log(error);
//     }
//   }

export const QuestionForm = ({ onSubmit }) => {
  const [questionText, setQuestionText] = useState("");
  const params = useParams();
  const { user } = UserState();
  const name = user?._id;
  const session = user?.currSession;

  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("Button").disabled = true;
    try {
      // Replace 'http://your-backend-api.com' with your actual backend API URL

      const questionData = {
        questionText: questionText,
        session: session,
        questionType: document.getElementById("questionType").value,
        questionTag: document.getElementById("questionPriority").value,
        iterationIndex: 1,
        raisedBy: name,
        session: params.sessionid,
      };

      const response = await axios.post(
        "http://localhost:5000/api/v1/question/create",
        questionData,
      );

      console.log("Response from the backend:", response.data);

      const addData = {
        questionId: "64b6ede3bab186cad1ef79cb",
        studentId: name,
      };

      const addingtoUser = await axios.post(
        "http://localhost:5000/api/v1/user/addquestion",
        addData,
      );

      onSubmit();

      // Handle the response from the backend (if needed)

      console.log("Response from the backend:", addingtoUser);
      document.getElementById("questionType").value = "";
      document.getElementById("questionPriority").value = "";
      document.getElementById("Button").disabled = false;
      setQuestionText("");
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error submitting question:", error);
    }
  };

  const fetchQuestions1 = async (sessionIteration) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/question/usrId",
        {
          params: {
            userId: check()._id,
            sessionIteration: sessionIteration, // Pass the session iteration as a parameter
          },

        },
      );

      console.log("Question fetched");
      setQuestionText(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user questions:", error);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v1/session/getsessionquestion",
        params.sessionid,
      );

      console.log("All question fetched");
      setQuestionText(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleQuestionSubmit = async () => {
    // Refetch questions after a new question is submitted
    fetchQuestions1();
  };

  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="p-4 border border-gray-300 rounded "
      >
        <div className="mb-2">
          <label htmlFor="questionText" className="block mb-2 font-bold">
            Your Question:
          </label>
          <Textarea
            id="questionText"
            name="questionText"
            value={questionText}
            label="Question"
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>
        <div className="inline-block">
          <div className="inline-block py-2">
            Type: &nbsp;{" "}
            <select label="Type" id="questionType">
              <option value={"Clarification"}>Clarification</option>
              <option value={"Exploratory"}>Exploratory</option>
            </select>
          </div>{" "}
          &nbsp;&nbsp;&nbsp;
          <div className="inline-block py-3">
            <Input
              type="number"
              label="Priority"
              id="questionPriority"
              min="1"
              max="10"
              defaultValue={5}
            ></Input>
          </div>
        </div>
        <br />
        <Button
          id="Button"
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
        >
          Submit Question
        </Button>
      </form>
    </Card>
  );
};
