import{ createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { type, check } from './../components/Cookies'


const LoginContext = createContext();

const ContextProvider = ({children}) =>{
    const [logged, setLogged] = useState(localStorage.getItem('userInfo')?true : false);
    //localStorage.getItem('userInfo') ||

    const [user, setUser] = useState('');
    const navigate = useNavigate();


    useEffect(()=>{
        const userInfo = check()
        
        setUser(userInfo);
        
       // const nested = userInfo?data?.data?.type;
        
        if (logged === true) {
            if (userInfo?.data?.data?.type === 'student') {

              navigate('/student/dashboard');
              // navigate('/dashboard');

            } else if (userInfo?.data?.data?.type === 'teacher') {
              navigate('/dashboard');
            }
            else if (userInfo?.data?.data?.type === 'admin') {
                navigate('/dashboard');
              }
          }
        if (logged === false){
          navigate('/');
        }
        // console.log(logged);
    }, [logged, navigate])

    // console.log("context",logged);
    return <LoginContext.Provider value={{logged,setLogged, user, setUser}}>{children} </LoginContext.Provider>

}

export const UserState = () => {
    return useContext(LoginContext);
}

export default ContextProvider