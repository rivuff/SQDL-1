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
import ContextProvider from './context/contextProvider';
import Accept from './components/invite/Accept.js'

import SubjectPage from './components/subject/Subject';
import New from './components/subject/New';


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
              element:<New/>
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