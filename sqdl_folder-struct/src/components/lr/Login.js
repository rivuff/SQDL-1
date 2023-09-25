// import {
//   Card,
//   Input,
//   Button,
//   Typography,
//   input,
// } from "@material-tailwind/react";
import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { UserState } from "../../context/contextProvider.js";
import SuccessModel from '../models/SuccessModel.js';
import ErrorModel from "../models/ErrorModel.js";
import { check, set } from "./../Cookies.js";
import { GLOBAL_URL } from "../config.js";
export default function Login() {
  console.log(GLOBAL_URL);
  //console.log(UserState);
  const { logged, setLogged } = UserState();
  //initializing states
  const [useEmail, setUseEmail] = useState(true);
  const [logData, setLogData] = useState(false);
  const [dataError, setErrorData] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    studentId: "",
    password: "",
    errmsg: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      errmsg: "",
    }));
  };

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };

      let data;
      if (useEmail) {
        data = await axios.post(
          GLOBAL_URL + `user/login`,
          { email: formData.email, password: formData.password },
          res,
        );
      } else {
        data = await axios.post(
          GLOBAL_URL + `user/login`,
          { studentId: formData.studentId, password: formData.password },
          res,
        );
      }

      setLogged(true);
      setLogData(true);
      await setTimeout(() => {
        setLogData(false);
      }, 1000);
      set(data.data.data);
      console.log("Logged In");
      window.location.href = "/dashboard";
    } catch (error) {
      console.log("Hello");
      console.log(error);
      setErrorData(true)
      setTimeout(() => {
        setErrorData(false);
      }, 1000);
      setFormData({ ...formData, errmsg: error.response.data.message });
    }
  };

  const { email, password } = formData;

  // useEffect(() => {
  //   let errmsg = document.getElementById("errmsg");
  //   let email = formData.email;
  //   console.log();
  //   if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
  //     errmsg.style.visibility = "block";
  //     errmsg.value = "Please enter valid email address";
  //   }
  // }, [formData.email]);

  return (
    <>
      {logData && <SuccessModel />}
      {dataError && <ErrorModel text="Something wend Wrong" />}
      <div className="flex h-screen bg-gray-50">
        <div className="w-[50%]">
          <div className="
            w-[52%] h-[62%] flex flex-col justify-center rounded-lg bg-white shadow-[2px_2px_10px_#000]
            relative top-28 left-[57%] z-20
          ">
            <div className="ml-3">
              <h2 className="font-montserratWeight font-montserrat text-3xl">Login</h2>
              <p className="font-redHatMonoWeight font-redHatMono text-lg text-gray-500">Enter your login details Here</p>
              <p className="font-redHatMonoWeight font-redHatMono text-lg text-gray-500">Don't have an account, Register Here</p>
            </div>
            <div className="py-8 px-6">
              <form className="grid place-items-center">
                <input 
                  id="email"
                  type="email"
                  label="Email"
                  name="email"
                  className="bg-gray-300 rounded-md p-2 my-4 text-lg outline-none font-semibold text-gray-700 
                  transition-all hover:bg-blue-gray-100 focus:bg-gray-400" 
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                <input 
                  id="password"
                  type="password" 
                  label="Password"
                  name="password"
                  className="bg-gray-300 rounded-md p-2 text-lg outline-none font-semibold text-gray-700 
                  transition-all hover:bg-blue-gray-100 focus:bg-gray-400" 
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button 
                  disabled={
                    (useEmail && formData.email === "") ||
                    formData.password === ""
                  }
                  className="mt-10 text-xl font-poppins py-2 px-10 bg-green-500 border-2 rounded-full 
                  text-white transition-all hover:shadow-green-700 hover:shadow-md disabled:opacity-60
                  disabled:hover:shadow-none"
                  onClick={loginHandler}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="w-[50%] grid place-items-center bg-no-repeat bg-cover" style={{
          background: `linear-gradient(to left, #4ade809c, #50e2859c), url(${require("../../images/login-bg-1.jpeg")}) no-repeat`,
          backgroundSize: "cover"
        }}>
          {/* <div
            className="w-[90%] h-[70%] bg-no-repeat"
            style={{
              backgroundImage: `url(${require("../../images/login-bg-2.png")})`,
            }}>
            </div> */}
        </div>
      </div>
    </>
  );

  // return (
  //   <div className="w-full h-screen grid place-items-center bg-gradient-to-bl from-red-200 to-blue-200">
  //     <div className="border-4 w-[40%] p-6 rounded-md absolute z-20">
  //       <div className="mb-6">
  //         <h2 className="text-xl font-extrabold">Login</h2>
  //         <p className="text-gray-700">Enter your login details Here</p>
  //         <p className="text-gray-700">Don't have an account, Register Here</p>
  //       </div>
  //       <form className="text-center">
  //         <input type="text" className="my-4 text-xl w-[85%] bg-transparent border-b-2 border-gray-700 outline-none placeholder:text-gray-700" placeholder="Name" />
  //         <input type="password" className="my-4 text-xl w-[85%] bg-transparent border-b-2 border-gray-700 outline-none placeholder:text-gray-700" placeholder="Passoword" />
  //         <button type="submit" className="block mx-auto mt-6 bg-green-600 py-3 px-16 rounded-full text-xl">Submit</button>
  //       </form>
  //     </div>
  //   </div>
  // );
}

  // return (
  //   <>
  //     {logData && <SuccessModel />}
  //     {dataError && <ErrorModel text="Something Went wrong" />}
  //     <div className="flex justify-center">
  //       <div className="p-10 flex items-center justify-center w-1/2 h-screen">
  //         <div className="border-blue-400 border-4 rounded-lg p-10 bg-white">
  //           <Card color="transparent" shadow={false}>
  //             <Typography variant="h4" color="blue-gray" className="capitalize">
  //               Login
  //             </Typography>
  //             <Typography color="gray" className="mt-1 font-normal">
  //               Enter your details to Login
  //             </Typography>
  //             <Typography color="red" className="mt-1 font-normal" id="errmsg">
  //               {/* {formData.errmsg !== "" ? formData.errmsg : ""} */}
  //             </Typography>
  //             <form
  //               className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
  //               id="loginForm"
  //             >
  //               <div className="mb-4 flex flex-col gap-6">
  //                 {useEmail ? (
  //                   <Input
  //                     id="email"
  //                     type="email"
                      // label="Email address"
  //                     size="lg"
  //                     value={formData.email}
  //                     name="email"
  //                     onChange={handleInputChange}
  //                   ></Input>
  //                 ) : (
  //                   <Input
  //                     id="studentId"
  //                     type="text"
  //                     label="Student ID"
  //                     size="lg"
  //                     value={formData.studentId}
  //                     name="studentId"
  //                     onChange={handleInputChange}
  //                   ></Input>
  //                 )}
  //                 <Input
  //                   id="password"
  //                   type="password"
  //                   label="Password"
  //                   size="lg"
  //                   value={formData.password}
  //                   name="password"
  //                   onChange={handleInputChange}
  //                 ></Input>
  //               </div>
  //               <Button
  //                 disabled={
  //                   formData.errmsg !== "" ||
  //                   formData.password === "" ||
  //                   (useEmail && formData.email === "") ||
  //                   (!useEmail && formData.studentId === "")
  //                 }
  //                 className="mt-6 capitalize bg-blue-700 text-white"
  //                 fullWidth
  //                 onClick={loginHandler}
  //               >
  //                 Login
  //               </Button>
  //             </form>
  //           </Card>
  //         </div>
  //       </div>
  //       <div className="w-1/2 h-screen grid place-items-center">
  //         <div
  //           className="w-[90%] h-[70%] bg-no-repeat"
  //           style={{
  //             backgroundImage: `url(${require("../../images/login-bg-2.png")})`,
  //           }}
  //         >
  //         </div>
  //       </div>
  //     </div>
  //   </>
  // );

// return (
//     <div className="align-center p-10 flex items-center justify-center h-screen ">
//         <div className="border-blue-400 border-4 rounded-lg p-10">
//             <Card color="transparent" shadow={false}>
//             <Typography variant="h4" color="blue-gray" className='capitalize'>
//                 Login
//             </Typography>
//             <Typography color="gray" className="mt-1 font-normal">
//                 Enter your details to Login
//             </Typography>
//             <Typography color="red" className="mt-1 font-normal" id ='errmsg'>
//                 {formData.errmsg!=''?formData.errmsg:''}
//             </Typography>
//             <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96" id='loginForm'>
//                 <div className="mb-4 flex flex-col gap-6">
//                         <Input id='email' type='email' label="Email address" size='lg' value={formData.email} onChange={(e) => { setData({ ...formData, email: e.target.value, errmsg: !(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(e.target.value)) ? 'Invalid Email Address' :'' })} }></Input>
//                         <Input id='password' type='password' label="Password" size='lg' value={formData.password} onChange={(e) => setData({...formData, password: e.target.value})}></Input>
//                 </div>
//                     <Button disabled={((formData.errmsg != '') || (formData.password == '') || (formData.email == '')) ?true:false} className="mt-6 capitalize" fullWidth onClick={loginhandler}>
//                     Login
//                 </Button>

//             </form>
//         </Card>

//     </div>
//     </div>
// );
//}
