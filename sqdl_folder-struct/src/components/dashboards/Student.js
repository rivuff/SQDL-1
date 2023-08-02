import React from "react";

const sessions = [
  { id: 1, courseName: "Math", sessionName: "Session 1" },
  { id: 2, courseName: "Science", sessionName: "Session 2" },
  { id: 3, courseName: "History", sessionName: "Session 3" },
];

const JoinSessionCard = ({ courseName, sessionName }) => {
  const handleJoinSession = () => {
    // Logic for joining the session
    console.log("Joining session:", courseName, sessionName);
  };

  return (
    <div className="card">
      <h3>{courseName}</h3>
      <p>{sessionName}</p>
      <button onClick={handleJoinSession}>Join Session</button>
    </div>
  );
};

const StudentLandingPage = () => {
  return (
    <div>
      <h2>Welcome, Student!</h2>
      <div className="card-container">
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
