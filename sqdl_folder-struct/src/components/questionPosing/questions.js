// src/App.js
import React, { useState, useEffect } from 'react';
import QuestionForm from './questionForm';
import axios from 'axios';
import { UserState } from '../../context/contextProvider';

const QuestionPosed = () => {
  const [questions, setQuestions] = useState([]);
  const {user} = UserState();
  const userId = user._id

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {

    try {
      // Replace 'http://your-backend-api.com' with your actual backend API URL
      const response = await axios.get('http://localhost:5000/api/v1/question/usrId', {
        params: {
          userId: userId,
        },
      });

      console.log("Question fetched");
      setQuestions(response.data);
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };


  const handleQuestionSubmit = async () => {
    // Refetch questions after a new question is submitted
    fetchQuestions();
  };


  return (
    <div className="container mx-auto p-8">
      <div className="max-h-96 overflow-y-auto mb-4 border border-gray-300 rounded h-96">
        <ul className="divide-y divide-gray-300">
          {questions.map((question, index) => (
            <li key={index} className="p-4">
              {question.questionText}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-auto"> {/* Push the QuestionForm to the bottom */}
        <QuestionForm onSubmit={handleQuestionSubmit} />
      </div>
    </div>
  );
};


export default QuestionPosed;
