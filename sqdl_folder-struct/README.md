# SQDL App Frontend Report
### By Prakhar Gupta and Rivu Naskar

This repository contains the frontend for the a SQDL App - to be used for SQDL based lessons in classroom-environment. It utilizes the MERN stack to work.


The ./src directory contains components folder which holds almost all of the frontend code. index.js has been configured with react-router-dom to manage routing. Refered to ./src/index.js to see what components are being rendered at what path

The context folder inside ./src contains the code for a context API which can be used for gloabl state management to do with user data. Inside the components folder there also exists cookies.js which contains sample code for state checking against local data and also sample jwt encryption which allows for superior security in a production instance.

Most of the UI-UX has been designed with Material framework in mind - and we have used Material-tailwind and tailwind to design almost all components. Please refer to their docs for react to get more information. Components have been modularized so (in most cases), API calls and state updates are internalized - however, some exceptions may exist.

Most of the frontend application (running on :3000) uses Axios to make API requests to the backend (running on :5000) - however the use of websockets using the socket.io library is introduced in components/subject/module/session/join - where realtime features are required. However, sockets are only used as triggers for making http requests, as large socket packets tend to make web-apps laggy.

As of right now, the app can do the following:
- Student Login/Signup
- Teacher Login
- Admin management of users 
- Inviting teachers to join the app via email
- Creation of Subject, modules, and sessions for organization
- Student room management in active sessions
- Real-time activity switching
- Real-time question posing
- Real-time peer prioritization (in process)
- Real-time question selection
- Multiple iterations in active session

All the data is being logged with time-stamps, so it is possible to build an analytical interface for research purposes in the future. Additionlly, due to the small team and expedited timeline, existing features need to be load tested for robustness and security. I would recommend using postman and jest library to unit-test existing features as there may be edge-cases that were missed during development.


Further notes
- State management being done natively in react, would recommend redux in the future
- Recommend improvement of context API for greater robustness
- Recommend more rigorous authorization checking in webpages, possibly through context api and window.location based checks
- Recommend room management through socket.io as opposed to custom session-related events, reducing communication load across network