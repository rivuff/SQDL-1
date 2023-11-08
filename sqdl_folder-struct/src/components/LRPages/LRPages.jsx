import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

import lrImage from "../../images/LrImage.jpg";

const LRPages = ({ toggle }) => {
  const [toggleLogin, setToogleLogin] = useState(toggle);

  const handleClick = () => {
    setToogleLogin(!toggleLogin);
  };

  return (
    <div className="md-1/2:flex md-1/2:justify-center grid place-items-center w-full bg-white">
      <img
        src={lrImage}
        alt="lr-image"
        className={`h-screen absolute z-10  ${
          toggleLogin ? 
            "animate-move-left xl-1/4:translate-x-0 translate-x-10" 
            : 
            "animate-move-right"
        }
        hidden md-1/2:block
        `}
      />
      <div
        className={`absolute top-1/3 left-4 text-center z-20 ${
          toggleLogin ? "visible animate-zoom-in" : "invisible animate-fade-out"
        } hidden md-1/2:block`}
      >
        <h3 className="xl-3/2:text-5xl -translate-x-6 lg:translate-x-0 text-3xl font-poppins text-black font-semibold">
          Welcome Back!
        </h3>
        <p className="text-lg text-black mt-5 m-10 -translate-x-6 lg:translate-x-0">
          Enter you login credential here
        </p>
        <button
          onClick={handleClick}
          className="text-lg text-black py-5 px-12 rounded-full bg-white font-bold 
            transition-all hover:bg-blue-400 -translate-x-6 lg:translate-x-0"
        >
          Sign Up
        </button>
      </div>
      <div
        className={`absolute top-1/3 right-0 text-center z-20 ${
          toggleLogin ? "invisible animate-fade-out" : "visible animate-zoom-in"
        }
        hidden md-1/2:block
        `}
      >
        <h3 className="xl-3/2:text-5xl text-3xl  font-poppins text-white font-semibold">
          Create Account
        </h3>
        <p className="text-lg text-white mt-5 m-10">
          Enter your credential to create account
        </p>
        <button
          onClick={handleClick}
          className="text-lg text-black py-5 px-12 rounded-full bg-lightesh-gray font-bold 
            transition-all hover:bg-blue-400"
        >
          Sign In
        </button>
      </div>
      <Register display={toggleLogin ? "max-md-1/2:hidden invisible animate-fade-out" : "block animate-zoom-in"}  handler={handleClick}/>
      <Login display={toggleLogin ? "block animate-zoom-in" : "max-md-1/2:hidden invisible animate-fade-out"} handler={handleClick}/>
    </div>
  );
};

export default LRPages;
