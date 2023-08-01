import React from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  Typography,
  Input,
  Button,
  CardBody,
} from "@material-tailwind/react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { UserState } from "../../context/contextProvider.js";
import { useState } from "react";
import { GLOBAL_URL } from "../config.js";

const Accept = () => {
  const [state, setMsg] = useState({
    password: "",
    cpassword: "",
    msg: "",
  });

  const token = useParams().token;
  try {
    let email;
    jwt.verify(token, "emailVerification", (err, decoded) => {
      email = decoded.email;
    });
    async function Authenticate(userEmail) {
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };
      axios
        .post(
          GLOBAL_URL + "teacher/accept",
          { email: userEmail, password: state.password },
          res,
        )
        .then((response) => {
          console.log(response);
          if (response.data.success == false) {
            console.log(response.data.message);
            setMsg({ ...state, msg: response.data.message });
          } else if (response.data.success == true) {
            setMsg({ ...state, msg: "Success Authenticating User" });
            localStorage.setItem(
              "userInfo",
              JSON.stringify(response.data.data),
            );
            window.location.href = "/dashboard";
          }
        })
        .catch((error) => {
          setMsg({ ...state, msg: error.message });
          console.log(error);
        });
    }
    return (
      <div className="align-center p-10 flex items-center justify-center h-screen max-w-3/5">
        <div className="border-blue-400 border-4 rounded-lg p-10 max-w-3/5">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray" className="capitalize">
              Activate Teacher Account
            </Typography>
            <div className="max-w-sm">
              <Typography
                color={
                  state.msg == "Success Authenticating User" ? "green" : "red"
                }
                className={
                  state.msg != ""
                    ? "capitalize visible col col-flex items-center justify-center text-center"
                    : "capitlize hidden "
                }
              >
                {state.msg}
              </Typography>
            </div>
            <br />
            <form>
              <Input
                label="Password"
                type="password"
                id="password"
                value={state.password}
                onChange={(e) => {
                  setMsg({
                    ...state,
                    password: e.target.value,
                    msg: e.target.value.match(
                      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,14}$/,
                    )
                      ? ""
                      : "Password must be between 6-14 characters, have at least one uppercase letter, lower case letter and number",
                  });
                }}
              ></Input>
              <br />
              <Input
                id="cpassword"
                type="password"
                label="Confirm Password"
                size="lg"
                value={state.cpassword}
                onChange={(e) =>
                  setMsg({
                    ...state,
                    cpassword: e.target.value,
                    msg:
                      document.getElementById("password").value !=
                      document.getElementById("cpassword").value
                        ? "Passwords do not match"
                        : "",
                  })
                }
              ></Input>
            </form>
            <CardBody className="flex flex-col items-center justify-center">
              <Button
                disabled={
                  state.password == "" || state.msg != "" ? true : false
                }
                onClick={() => {
                  Authenticate(email);
                }}
              >
                Activate
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  } catch (error) {
    console.log(error);
    return (
      <div className="align-center p-10 flex items-center justify-center h-screen max-w-3/5">
        <div className="border-blue-400 border-4 rounded-lg p-10 max-w-3/5">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray" className="capitalize">
              Error Activating Teacher Account
            </Typography>
            <div className="max-w-sm">
              <Typography className="text-red-700 capitalize flex flex-col items-center justify-center text-center">
                Invalid or expired token. Please reach out to administrator to
                get a new token
              </Typography>
            </div>
          </Card>
        </div>
      </div>
    );
  }
};

export default Accept;
