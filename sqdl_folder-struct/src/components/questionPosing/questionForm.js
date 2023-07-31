// src/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { UserState } from '../../context/contextProvider';
import { Typography, Textarea, Button, Card, Input } from '@material-tailwind/react';
import { useParams } from 'react-router-dom';

const QuestionForm = ({ onSubmit, iteration }) => {
  const [questionText, setQuestionText] = useState('');
  const params = useParams();

  const { user } = UserState();
  const name = user?._id
  const session = user?.currSession
  const handleSubmit = async (e) => {
    e.preventDefault();
    document.getElementById('Button').disabled = true
    try {

      const questionData = {
        questionText: questionText,
        session: params.sessionid,
        questionType: document.getElementById('questionType').value,
        questionTag: document.getElementById('questionPriority').value,
        iterationIndex: iteration,
        raisedBy: name,
        //questionTag: document.getElementById('questionType').value,
      }
      
      console.log(session);
      const response = await axios.post('http://localhost:5000/api/v1/question/create', questionData);

      console.log('Response from the backend:', response.data);

      console.log(response?.data?.data);
      const addData = {
        questionId: response?.data?.data?._id,
        studentId: name
      }

      const addingtoUser = await axios.post('http://localhost:5000/api/v1/user/addquestion', addData)


      const addQuestionToSession = await axios.post('http://localhost:5000/api/v1/session/addQuestion', {
        questionId: response?.data?.data?._id,
        sessionId: session,
      });

      onSubmit();

      // Handle the response from the backend (if needed)

      console.log('Response from the backend:', addingtoUser)

      document.getElementById('questionPriority').value = '5'
      document.getElementById('Button').disabled = false

      console.log("Response from Session",addQuestionToSession);
      setQuestionText('');

    } catch (error) {
      // Handle errors if the request fails
      console.error('Error submitting question:', error);
    }
  };



  return (
    <Card>
      <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded ">
        <div className="mb-2">
          <label htmlFor="questionText" className="block mb-2 font-bold">
            Your Question:
          </label>
          <Textarea
            id="questionText"
            name="questionText"
            value={questionText}
            label='Question'
            onChange={(e) => setQuestionText(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            rows={4}
            required
          />
        </div>
        <div className='inline-block'>
          <div className='inline-block py-2'>Type: &nbsp; <select label='Type' id='questionType'>
            <option value={'Clarification'} selected>Clarification</option>
            <option value={'Exploratory'}>Exploratory</option>
          </select></div> &nbsp;&nbsp;&nbsp;
          <div className='inline-block py-3'>
            <Input type='number' label='Priority' id='questionPriority' min='1' max='10' defaultValue={5}></Input>
          </div>
        </div>
        <br />
        <Button id='Button' type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
          Submit Question
        </Button>
      </form>
    </Card>
  );
};

export default QuestionForm;