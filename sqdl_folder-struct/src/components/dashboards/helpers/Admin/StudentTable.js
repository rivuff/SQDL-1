import React, { useEffect, useState } from "react";
import { Card, Typography, Button } from "@material-tailwind/react";
import axios from "axios";
import "./StudentTable.css";
import TeacherInvite from "./TeacherInvite";
import AdminPopover from "./AdminPopover";
import LoadingRow from "./LoadingRow";
import Row from "./Row";

const TeacherTable = () => {
  const [state, setState] = useState({
    isLoading: true,
    data: [],
  });

  async function fetchTeacherData() {
    //= async(req,res)=>{
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios
      .get(`http://localhost:5000/api/v1/user/getall`, res)
      .then((response) => {
        let allusers = response.data.data;
        let allteachers = [];
        allusers.forEach((user) => {
          if (user.type == "student") {
            allteachers.push(user);
          }
        });
        setState({ ...state, isLoading: false, data: allteachers });
      })
      .catch((error) => {
        {
          console.log(error);
        }
      });
  }
  if (state.isLoading) {
    fetchTeacherData();
  }
  return (
    <div>
      {/* <Card className="h-full w-full items-center overflow-x-auto shadow-none"> */}
      <table className="w-full min-w-max table-auto text-center border-1 border-spacing-6 border-blue-700 p-8 rounded-none shadow-none">
        <thead className="header rounded-none	shadow-none">
          <tr className="h-20px">
            <th className="border-b border-blue-gray-100 shadow-none p-8">
              <Typography
                variant="small"
                color="white"
                className="font-bold text-lg leading-none "
              >
                Name
              </Typography>
            </th>{" "}
            <th className="border-b border-blue-gray-100  p-4">
              <Typography
                variant="small"
                color="white"
                className="font-bold text-lg leading-none "
              >
                Email
              </Typography>
            </th>{" "}
            <th className="border-b border-blue-gray-100  p-4">
              <Typography
                variant="small"
                color="white"
                className="font-bold text-lg leading-none "
              >
                Enrollment Number
              </Typography>
            </th>{" "}
            <th className="border-b border-blue-gray-100  p-4">
              <Typography
                variant="small"
                color="white"
                className="font-bold text-lg leading-none "
              >
                Roll Number
              </Typography>
            </th>{" "}
            <th className="border-b border-blue-gray-100  p-4">
              <Typography
                variant="small"
                color="white"
                className="font-bold text-lg leading-none "
              ></Typography>
            </th>
            <th className="border-b border-blue-gray-100  p-4">
              <Typography
                variant="small"
                fontSize="30"
                color="white"
                className="font-bold text-lg leading-none"
              ></Typography>
            </th>
          </tr>
        </thead>
        <tbody className="body">
          {state.isLoading ? (
            <LoadingRow cols={6} />
          ) : (
            state.data.map((object) => {
              return (
                <Row
                  _id={object._id}
                  key={object._id}
                  handler={fetchTeacherData}
                  className="row"
                ></Row>
              );
            })
          )}
        </tbody>
      </table>
      {/* </Card> */}
    </div>
  );
};

export default TeacherTable;
