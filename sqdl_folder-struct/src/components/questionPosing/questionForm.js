// src/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { UserState } from '../../context/contextProvider';
import { useParams } from 'react-router-dom';


const QuestionForm = ({onSubmit}) => {
  const [questionText, setQuestionText] = useState('');

  const {user} = UserState();
  const name = user?._id
  const session = user?.currSession
  const params = useParams();
  const handleSubmit = async (e) => {
   e.preventDefault();
    e.preventDefault();
    
    try {
    
      const questionData = {
        questionText : questionText,
        session: session,
        iterationIndex: 1,
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
      console.log("Response from Session",addQuestionToSession);
      setQuestionText('');
    } catch (error) {
      // Handle errors if the request fails
      console.error('Error submitting question:', error);
    }
  };



  return (
    <form onSubmit={handleSubmit} className="p-4 border border-gray-300 rounded ">
    <div className="mb-2">
      <label htmlFor="questionText" className="block mb-2 font-bold">
        Your Question:
      </label>
      <textarea
        id="questionText"
        name="questionText"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded"
        rows={4}
        required
      />
    </div>
    <button type="submit" className="px-4 py-2 text-white bg-blue-500 rounded">
      Submit Question
    </button>
  </form>
  );
};

export default QuestionForm;






