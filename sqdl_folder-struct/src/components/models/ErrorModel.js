import React from 'react';
import ReactDOM from 'react-dom';

import BackdropModel from './BackdropModel';

import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const Error = ({ text }) => (
    <div className="absolute w-full h-screen grid place-items-center">
        <div className='z-40 w-2/4 h-2/5 bg-white rounded-xl flex flex-col justify-center items-center gap-11'>
            <ClearRoundedIcon sx={{ fontSize: 100 }} className='text-red-700'/>
            <p className='text-xl font-poppins'>{text}</p>
        </div>
    </div>    
)

const ErrorModel = ({ text }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <BackdropModel />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <Error text={text} />,
        document.getElementById('login-root')
      )}
    </>
  )
}

export default ErrorModel