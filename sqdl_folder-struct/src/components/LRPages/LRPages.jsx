import React, { useState } from "react";

import Login from "./Login";
import Register from "./Register";

import lrImage from "../../images/lrImage.png";

const LRPages = () => {
  const [toggleLogin, setToogleLogin] = useState(true);

  const handleClick = () => {
    setToogleLogin(!toggleLogin);
  };

  return (
    <div className="flex justify-center w-full bg-lightesh-gray">
      <img
        src={lrImage}
        alt="lr-image"
        className={`h-screen absolute z-10 ${
          toggleLogin ? "animate-move-left" : "animate-move-right"
        }`}
      />
      <div
        className={`absolute top-1/3 left-4 text-center z-20 ${
          toggleLogin ? "visible animate-zoom-in" : "invisible animate-fade-out"
        }`}
      >
        <h3 className="text-5xl font-poppins text-white font-semibold">
          Welcome Back!
        </h3>
        <p className="text-lg text-white mt-5 m-10">
          Enter you login credential here
        </p>
        <button
          onClick={handleClick}
          className="text-lg text-black py-5 px-12 rounded-full bg-lightesh-gray font-bold 
            transition-all hover:bg-blue-400"
        >
          Sign Up
        </button>
      </div>
      <div
        className={`absolute top-1/3 right-4 text-center z-20 ${
          toggleLogin ? "invisible animate-fade-out" : "visible animate-zoom-in"
        }`}
      >
        <h3 className="text-5xl font-poppins text-white font-semibold">
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
      <Register display={toggleLogin ? "invisible animate-fade-out" : "block animate-zoom-in"} />
      <Login display={toggleLogin ? "block animate-zoom-in" : "invisible animate-fade-out"} />
    </div>
  );
};

export default LRPages;
