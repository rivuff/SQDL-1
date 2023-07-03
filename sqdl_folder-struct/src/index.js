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
import NewSubject from './components/subject/NewSubject';
import Module from './components/subject/module/Module';
import NewModule from './components/subject/module/NewModule';
import Session from './components/subject/module/session/Session';
import NewSession from './components/subject/module/session/NewSession';



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

          path:'/subject',
          element: <SubjectPage/>
        },
        {
          path:'/profile',
          element: <Profile/>
        },
        {
          path:'/about',
          element: <About/>
        },
        {
          path:'/subject',
          children:[
            {
              path:'/subject/new',
              element:<NewSubject/>
            },
            {
              path:'/subject/:subjectid',
              children:[
                {
                  path: '/subject/:subjectid',
                  element: <SubjectPage/>
                },
                {
                  path: '/subject/:subjectid/new',
                  element: <NewModule/>
                },
                {
                  path: '/subject/:subjectid/:moduleid',
                  children:[
                    {
                      path: '/subject/:subjectid/:moduleid',
                      element: <Module/>
                    },
                    {
                      path: '/subject/:subjectid/:moduleid/new',
                      element: <NewSession/>
                    },
                    {
                      path: '/subject/:subjectid/:moduleid/:sessionid',
                      element: <Session/>
                    },
                  ]
                },

              ]
            }
          ]
        }
        // },
        // {
        //   path:'/about',
        //   element: <About/>
        // }
      ]
  }
])



const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(<RouterProvider router={router}/>)



reportWebVitals();