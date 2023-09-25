import React from 'react';
import ReactDOM from 'react-dom';

import BackdropModel from './BackdropModel';

import CheckRoundedIcon from '@mui/icons-material/CheckRounded';

const Success = () => (
    <div className="absolute w-full h-screen grid place-items-center">
        <div className='z-40 w-2/4 h-2/5 bg-white rounded-xl flex flex-col justify-center items-center gap-11'>
            {/* <i className='text-3xl text-green-700'><CheckRoundedIcon /></i> */}
            <CheckRoundedIcon sx={{ fontSize: 100 }} className='text-green-700'/>
            <h4 className='text-xl font-poppins'>Login Successful</h4>
        </div>
    </div>
  
)

const SuccessModel = () => {
  return (
    <>
        {ReactDOM.createPortal(
            <BackdropModel />,
            document.getElementById('backdrop-root')
        )}
        {ReactDOM.createPortal(
            <Success />,
            document.getElementById('login-root')
        )}
    </>
  )
}

export default SuccessModel