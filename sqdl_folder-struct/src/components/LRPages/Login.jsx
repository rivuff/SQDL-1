import React, { useRef } from "react";
import axios from "axios";
import { GLOBAL_URL } from "../config.js";
import { set } from "../Cookies.js";

import Input from "../Helper/Input";

const Login = ({ display, handler }) => {
  const emailRef = useRef("");
  const passwordRef = useRef("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(emailRef.current.value, passwordRef.current.value);
    try {
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.post(
        GLOBAL_URL + `user/login`,
        { email: emailRef.current.value, password: passwordRef.current.value },
        res
      );

      console.log(data);
      set(data.data.data);
      window.location.href = "/dashboard";
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className={`flex flex-col gap-8 h-screen text-center bg-lightesh-gray md-1/2:w-[30%] w-[80%] translate-x-20 justify-center ${display}`}
    >
      <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold mx-auto">
        Login
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-10 mx-auto items-center w-60 "
      >
        <Input placeholder="Email" type="email" inputRef={emailRef} />
        <Input placeholder="Password" type="password" inputRef={passwordRef} />
        <button
          type="submit"
          className="w-[75%] py-3 px-10 bg-greenish-blue text-lightesh-gray font-lg font-bold rounded-xl
          hover:shadow-xl"
        >
          Submit
        </button>
        <button
          type="button"
          onClick={handler}
          className="w-[75%] py-3 px-10 bg-greenish-blue text-lightesh-gray font-lg font-bold rounded-xl
          hover:shadow-xl md-1/2:hidden block"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default Login;
