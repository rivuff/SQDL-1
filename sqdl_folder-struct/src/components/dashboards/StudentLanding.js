import React from 'react';
import { UserState } from '../../context/contextProvider';

const sessions = [
  { id: 1, courseName: 'DBMS', sessionName: 'Session 1' },
  { id: 2, courseName: 'OOPs', sessionName: 'Session 2' },
  { id: 3, courseName: 'Computer Networks', sessionName: 'Session 3' },
];

const JoinSessionCard = ({ courseName, sessionName }) => {
  const name = 'Placeholder'//fetch from localdata
  const handleJoinSession = () => {
    // Logic for joining the session
    console.log('Joining session:', courseName, sessionName);
  };

  return (

    <div className="max-w-sm w-full lg:max-w-full lg:flex">
    <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" style={{ backgroundImage: `url(${require('../images/download.jpeg')})` }}
    title="proffesor">
    </div>
    <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div className="mb-8">
        <div className="text-gray-900 font-bold text-xl mb-2">{courseName}</div>
        <p className="text-gray-700 text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
      </div>
      <div className="flex items-center">
        <div className="text-sm">
          <p className="text-gray-900 leading-none">Jonathan Reinink</p>
          <p className="text-gray-600">{sessionName}</p>
          <div className='flex'>
            <button className='b-4 p-2 mr-2 bg-blue-300 rounded-md' onClick={handleJoinSession}>Join Session</button>
            <button className='b-4 p-2 bg-blue-300 rounded-md' onClick={handleJoinSession}>Track Session</button>
          </div>
          
        </div>
      </div>
    </div>
  </div>
   
  );
};

const StudentLandingPage = () => {

    const {user} = UserState();
    const name = user?.data?.data?.name;
  return (
    <div>
    <h2 className='italic font-semibold text-xl flex justify-center p-2 pt-5'>Welcome, <span className='text-deep-orange-400'> {name}</span></h2>
    <div className="card-container ml-5 m-2 p-2">
    {sessions.map((session) => (
        <JoinSessionCard
        key={session.id}
        courseName={session.courseName}
        sessionName={session.sessionName}
        />
    ))}
</div>
</div>
  );
};

export default StudentLandingPage;