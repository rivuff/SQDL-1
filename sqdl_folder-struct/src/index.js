import './App.css';
import { Outlet } from 'react-router-dom';
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NavBar from './components/homepage/NavBar.jsx'
import Footer from './components/homepage/Footer.js'
import SQDLCarousel from './components/homepage/Carousel.js'
import Login from './components/lr/Login.js'
import reportWebVitals from './reportWebVitals';
import Register from './components/lr/Register';
import LandingPage from './components/dashboards/LandingPage.js'
import Profile from './components/Profile.js'
import About from './components/About.js'

//global context provider
import ContextProvider from './context/contextProvider';

//teacher invitation acceptance
import Accept from './components/invite/Accept.js'

//subject page tree
import SubjectPage from './components/subject/Subject';
import CourseRouter from './components/CourseRouter';
import SubjectRouter from './components/subject/SubjectRouter';
import ModuleRouter from './components/subject/module/ModuleRouter';
import SingleSubject from './components/subject/SingleSubject';
import NewSubject from './components/subject/NewSubject';
import Module from './components/subject/module/Module';
import NewModule from './components/subject/module/NewModule';
import Session from './components/subject/module/session/Session';
import NewSession from './components/subject/module/session/NewSession';
//import StudentLandingPage from './components/dashboards/StudentLanding';


const AppLayout = ()=>{
  return (
    <div>
      <ContextProvider>
        <NavBar navList = {{about: 'About', login: 'Login', register: 'Register'}}/> 
        <Outlet/>
        <Footer/>
      </ContextProvider>
    </div>
  )
}

const router = createBrowserRouter([
  {
      path: "/",
      element:<AppLayout/>,
      children:[
        {
          path: "/",
          element:<SQDLCarousel/>
        },
        {
          path: "/login",
          element: <Login/>
        },
        {
          path: "/register",
          element: <Register/>
        },
        {
          path:'/dashboard',
          element: <LandingPage/>
        },
        {
          path: '/teacher/accept/:token',
          element: <Accept />
        },
        {
          path:'/profile',
          element: <Profile/>
        },
        // {
        //   path:'/subject',
        //   element: <SubjectPage/>
        // },
        {
          path:'/about',
          element: <About/>
        },
        // {
        //   path: '/subjects',
        //   element: <SubjectPage/>
        // },  
        
        // {
        //   path: '/student/dashboard',
        //   element: <StudentLandingPage/>
        // },
        {
          path: '/course',
          element: <CourseRouter/>,
          children:[
            {
              path: '',
              element: <SubjectPage/>
            },  
            {
              path: 'new',
              element: <NewSubject />
            }, 
            {
              path: ':subjectid',
              element: <SubjectRouter />,
             children:[
               {
                 path: '',
                 element: <SingleSubject />
               }, {
                 path: 'new',
                 element: <NewModule />
               }, {
                 path: ':moduleid',
                 element: <ModuleRouter />,
                 children:[

                   {
                     path: '',
                     element: <Module />
                   }, 
                   {
                     path: 'new',
                     element: <NewSession />
                   }, {
                     path: ':sessionid',
                     children: [
                       {
                         path: '',  
                         element: <Session />
                       }, 
                     ]
                   }
                 ]
                }
             ]
            }
          ]

        }
      ]
      
  }
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router}/>)



reportWebVitals();