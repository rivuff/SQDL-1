// src/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { UserState } from '../../context/contextProvider';


const QuestionForm = ({onSubmit}) => {
  const [questionText, setQuestionText] = useState('');

    const {user} = UserState();
    const name = user?._id
    const session = user?.currSession

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Replace 'http://your-backend-api.com' with your actual backend API URL

      const questionData = {
        questionText : questionText,
        session: session,
        iterationIndex: 1,
        raisedBy: name,
      }

      const response = await axios.post('http://localhost:5000/api/v1/question/create', questionData);

      console.log('Response from the backend:', response.data);

      const addData = {
        questionId: '64b6ede3bab186cad1ef79cb',
        studentId: name
      }

      const addingtoUser = await axios.post('http://localhost:5000/api/v1/user/addquestion', addData)

      onSubmit();
      
      // Handle the response from the backend (if needed)
     
      console.log('Response from the backend:', addingtoUser)
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


