// src/QuestionForm.js
import React, { useState } from "react";
import axios from "axios";
import { UserState } from "../../context/contextProvider";
import {
  Typography,
  Textarea,
  Button,
  Card,
  Input,
} from "@material-tailwind/react";
import { set } from "../Cookies";
import { useParams } from "react-router-dom";

const QuestionForm = ({ onSubmit, iteration, userQues, questionState }) => {
  const [questionText, setQuestionText] = useState("");
  const [questionPriority, setPriority] = useState(5);
  const [questionTag, setQuestionTag] = useState("Clarification")
  const params = useParams();
  const { user } = UserState();
  const id = user?._id;
  const name = user?.name;
  const session = user?.currSession;
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById("Button").disabled = true;
    console.log(questionTag)
    try {
      const questionData = {
        questionText: questionText,
        session: params.sessionid,
        questionTag: questionTag,
        iterationIndex: iteration,
        iteration: iteration,
        priorityBySelf: questionPriority,
        raisedBy: id,
        raisedByName: name,

        //questionTag: document.getElementById('questionType').value,
      };
      console.log(questionData);
      const response = await axios.post(
        "http://localhost:5000/api/v1/question/create",
        questionData,
      );

      console.log("Response from the backend:", response.data);

      console.log(response?.data?.data);
      const addData = {
        questionId: response?.data?.data?._id,
        studentId: id,
      };

      const addingtoUser = await axios.post(
        "http://localhost:5000/api/v1/user/addquestion",
        addData,
      );

      set(addingtoUser.data.data);

      console.log("Response from the backend:", addingtoUser);

      const addQuestionToSession = await axios.post(
        "http://localhost:5000/api/v1/session/addQuestion",
        {
          questionId: response?.data?.data?._id,
          sessionId: params.sessionid,
        },
      );

      onSubmit();
      userQues();

      // Handle the response from the backend (if needed)

      document.getElementById("questionPriority").value = "5";
      document.getElementById("Button").disabled = false;

      console.log("Response from Session", addQuestionToSession);
      setQuestionText("");
    } catch (error) {
      // Handle errors if the request fails
      console.error("Error submitting question:", error);
    }
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
            disabled={questionState}
            required
          />
        </div>
        <div className="inline-block">
          <div className="inline-block py-2">
            Type: &nbsp;{" "}
            <select label="Type" id="questionType" onChange={(e) => {setQuestionTag(e.target.value)}} disabled={questionState}>
              <option value="Clarification" selected>
                Clarification
              </option>
              <option value="Exploratory">Exploratory</option>
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
              onChange={(e) => {
                setPriority(e.target.value);
              }}
              disabled={questionState}
            ></Input>
          </div>
        </div>
        <br />
        <Button
          id="Button"
          type="submit"
          className="px-4 py-2 text-white bg-blue-500 rounded"
          disabled={questionState}
        >
          Submit Question
        </Button>
      </form>
    </Card>
  );
};

export default QuestionForm;
