import React from 'react';
import { UserState } from '../../context/contextProvider';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const JoinSessionCard = ({ title, topic, createdBy, subjectId, startTime }) => {
  const name = 'Placeholder'//fetch from localdata
  const handleJoinSession = () => {
    // Logic for joining the session
    console.log('Joining session:', title, topic);
  };

  const fetchSubjectDetails = async (subjectId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/subject/get?subjectId=${subjectId}`); // Replace with your actual API endpoint for fetching subject details
      const data = await response.json();
      // Use the subject details as required (e.g., display in a modal or navigate to a subject details page)
      console.log('Subject Details:', data);
    } catch (error) {
      console.error('Error fetching subject details:', error);
    }
  };

  return (

    <div className="max-w-sm w-full lg:max-w-full lg:flex p-1">
    <div className="flex-none h-48 lg:h-auto lg:w-48 bg-cover rounded-t-lg lg:rounded-t-none lg:rounded-l-lg text-center overflow-hidden" style={{ backgroundImage: `url(${require('../images/download.jpeg')})` }} title="proffesor"></div>
    <div className="flex flex-col justify-between border border-gray-400 bg-white rounded-b-lg lg:rounded-b-none lg:rounded-r-lg p-4 flex-1 leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-2">{title}</div>
        
        <Link to={`/subject/${subjectId}`} className="text-gray-700 text-base cursor-pointer"> {topic}</Link>
      </div>
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-gray-900 leading-none pb-4">Created by - {createdBy}</p>
          <div className='flex'>
            <button className='b-4 p-2 mr-2 bg-blue-300 rounded-md' onClick={handleJoinSession}>Join Session</button>
          </div>
        </div>
      </div>
    </div>
  </div>
   
  );
};

const StudentLandingPage = () => {

    const {user} = UserState();
    const name = user?.name;
    const userId = user?._id;
    console.log(userId);
    const [sessions, setSessions] = useState([]);

  useEffect(() => {
    // Fetch session data from the backend API
    const fetchSessions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/user/getSession?userId=${userId}` ); // Replace with your actual API endpoint
        const data = await response.json();
        console.log(data);
        setSessions(data.sessions);
      } catch (error) {
        console.error('Error fetching session data:', error);
      }
    };

    fetchSessions();
  }, []);

  return (
    <div>
    <h2 className='italic font-semibold text-xl flex justify-center p-2 pt-5'>Welcome, <span className='text-deep-orange-400'> {name}</span></h2>
    <div className="card-container ml-5 m-2 p-4">
    {sessions.map((session) => (
        <JoinSessionCard
        key={session._id}
        subjectId={session.subject}
        title={session.title}
        topic={session.topic}
        createdBy={session.createdBy}
        startTime={session.startTime}
        />
    ))}
</div>
</div>
  );
};

export default StudentLandingPage;

//<a onClick={() => fetchSubjectDetails(subjectId)} className="text-gray-700 text-base cursor-pointer">{topic}</a>
//<p className="text-gray-600">{sessionName}</p>

// const sessions = [
//   {
//     _id: '64a3b195d0b90eab4b477ad5',
//     title: "First session",
//     topic: "Database Management System",
//     startTime: '2023-07-01T11:30:00.000+00:00',
//     createdBy: "Rivu Naskar",
//     createdAt: '2023-07-04T05:43:49.150+00:00',
//     updatedAt: '2023-07-04T05:43:49.150+00:00',
//   },
//   { 
//     _id: '64a3b27ed0b90eab4b477ad7',
//     title: "Second session",
//     topic: "Computer Networks",
//     startTime: '2023-07-01T13:30:00.000+00:00',
//     createdBy: "Rivu Naskar",
//     createdAt: '2023-07-04T05:47:42.890+00:00',
//     updatedAt: '2023-07-04T05:47:42.890+00:00'
//   },
//   {  _id: '64a3b2c8d0b90eab4b477ad9',
//   title: "Third session",
//   topic: "Operating System",
//   startTime: '2023-07-01T13:30:00.000+00:00',
//   createdBy: "Rivu Naskar",
//   createdAt: '2023-07-04T05:47:42.890+00:00',
//   updatedAt: '2023-07-04T05:47:42.890+00:00'
//  },
// ];
