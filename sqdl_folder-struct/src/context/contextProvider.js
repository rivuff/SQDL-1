import{ createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { type, check } from './../components/Cookies'


const LoginContext = createContext();

const ContextProvider = ({ children }) => {
  const [logged, setLogged] = useState(localStorage.getItem('userInfo') ? true : false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userInfo')) || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (logged && user) {
      const userType = user?.data?.data?.type;
      console.log(userType);
      if (userType === 'student') {
        navigate('/student/dashboard');
      } else if (userType === 'teacher' || userType === 'admin') {
        navigate('/dashboard');
      }
    } else {
      navigate('/');
    }
  }, [logged, user, navigate]);

  useEffect(() => {
    localStorage.setItem('userInfo', JSON.stringify(user));
  }, [user]);

  
    return <LoginContext.Provider value={{logged,setLogged, user, setUser, navigate}}>{children} </LoginContext.Provider>

}

export const UserState = () => {
    return useContext(LoginContext);
}

export default ContextProvider

  // useEffect(()=>{
    //   console.log("context",logged);
    //     const userInfo = localStorage.getItem('userInfo')

    //     setUser(userInfo);
    //     //console.log(userInfo);
    //    const nested = userInfo?.data?.data?.type
    //   // console.log("nested");
        
    //     if (logged === true) {
    //       console.log(userInfo);
    //         if (userInfo?.data?.data?.type === 'student') {
    //           console.log("logged");
    //           navigate('/student/dashboard');

    //         } else if (userInfo?.data?.data?.type === 'teacher') {
    //           navigate('/dashboard');
    //         }
    //         else if (userInfo?.data?.data?.type === 'admin') {
    //             navigate('/dashboard');
    //           }
    //       }
    //     if (logged === false){
    //       navigate('/');
    //     }
    //     // console.log(logged);
    // }, [logged, navigate])

    // console.log("context",logged);