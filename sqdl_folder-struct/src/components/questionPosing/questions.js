// src/App.js
import React, { useState, useEffect } from 'react';
import QuestionForm from './questionForm';
import axios from 'axios';

const QuestionPosed = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {

    try {
      // Replace 'http://your-backend-api.com' with your actual backend API URL
      const response = await axios.get('http://your-backend-api.com/api/questions');
      setQuestions(response.data);
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
      <div className="max-h-96 overflow-y-auto mb-4 border border-gray-300 rounded h-72">
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
