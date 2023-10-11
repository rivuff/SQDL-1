import "./App.css";
import { Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/homepage/NavBar.jsx";
import Provide from "./components/homepage/Provide";
import Counter from "./components/homepage/Counter";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/homepage/Footer.js";
import SQDLCarousel from "./components/homepage/Carousel.js";
import Login from "./components/lr/Login.js";
import reportWebVitals from "./reportWebVitals";
import Register from "./components/lr/Register";
import LandingPage from "./components/dashboards/LandingPage.js";
import Profile from "./components/Profile.js";
import About from "./components/About.js";
import AddStudentSubject from "./components/pfp/AddStudentSubject";
import LRPages from "./components/LRPages/LRPages";

//global context provider
import ContextProvider from "./context/contextProvider";

//teacher invitation acceptance
import Accept from "./components/invite/Accept.js";

//subject page tree
import SubjectPage from "./components/subject/Subject";
import CourseRouter from "./components/CourseRouter";
import SubjectRouter from "./components/subject/SubjectRouter";
import ModuleRouter from "./components/subject/module/ModuleRouter";
import SingleSubject from "./components/subject/SingleSubject";
import NewSubject from "./components/subject/NewSubject";
import Module from "./components/subject/module/Module";
import NewModule from "./components/subject/module/NewModule";
import Topic from "./components/subject/module/Topic/Topic";
import NewTopic from "./components/subject/module/Topic/NewTopic";
import Session from "./components/subject/module/Topic/session/Session";
import NewSession from "./components/subject/module/Topic/session/NewSession";
import SubjectDetailsPage from "./components/dashboards/SubjectDetails";
import SessionForm from "./components/SessionForm";
//import QuestionForm from './components/questionPosing/questionForm';

import { QuestionForm } from "./components/questionPosing/questions";

import Join from "./components/subject/module/Topic/session/join/Join";
import TeacherInterface from "./components/dashboards/Teacher";

//import StudentLandingPage from './components/dashboards/StudentLanding';

const AppLayout = () => {
  return (
    <div>
      <ContextProvider>
        <NavBar
          navList={{
            home: "Home",
            about: "About",
            login: "Login",
            register: "Register",
          }}
        />
        <Outlet />
        <Footer />
      </ContextProvider>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <LRPages toggle={true} />,
      },
      {
        path: "/register",
        element: <LRPages toggle={false} />,
      },
      {
        path: "/dashboard",
        element: <LandingPage />,
      },
      {
        path: "/teacher/accept/:token",
        element: <Accept />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/addStudentSubject",
        element: <AddStudentSubject />,
      },
      {
        path: "/sessionform",
        element: <SessionForm />,
      },
      // {
      //   path:'/subject',
      //   element: <SubjectPage/>
      // },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/subjects",
        element: <SubjectPage />,
      },
      {
        path: "/subject/:id",
        element: <SubjectDetailsPage />,
      },
      {
        path: "question",
        element: <QuestionForm />,
      },
      {
        path: "teacher/question",
        element: <TeacherInterface />,
      },

      // {
      //   path: '/student/dashboard',
      //   element: <StudentLandingPage/>
      // },
      {
        path: "/course",
        element: <CourseRouter />,
        children: [
          {
            path: "",
            element: <SubjectPage />,
          },
          {
            path: "new",
            element: <NewSubject />,
          },

          {
            path: ":subjectid",
            element: <SubjectRouter />,
            children: [
              {
                path: "",
                element: <SingleSubject />,
              },
              {
                path: "new",
                element: <NewModule />,
              },
              {
                path: ":moduleid",
                element: <ModuleRouter />,
                children: [
                  {
                    path: "",
                    element: <Topic />,
                  },
                  {
                    path: "newTopic",
                    element: <NewTopic />
                  },
                  {
                    path: ":topicid",
                    children: [
                      {
                        path: "newSession",
                        element: <NewSession />,
                      }
                    ]
                  },
                  {
                    path: ":sessionid",
                    children: [
                      {
                        path: "",
                        element: <Session />,
                      },
                      {
                        path: "join",
                        element: <Join />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router} />);

reportWebVitals();
