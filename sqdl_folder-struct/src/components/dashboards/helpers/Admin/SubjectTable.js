import React, { useState } from "react";
import axios from "axios";
import { GLOBAL_URL } from "../../../config";
import { NavLink } from "react-router-dom";
import { Typography, Button } from "@material-tailwind/react";

const SubjectTable = () => {
  const [subjects, setSubjects] = useState([]);

  const getAllSubjects = async () => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const data = await axios.get(GLOBAL_URL + "subject/getAll", res);
      setSubjects(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  getAllSubjects();

  return (
    <div className="p-5">
      <table className="w-full min-w-max table-auto mb-7 text-left">
        <thead>
          <tr>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Subject Code
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Subject Name
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Taught By
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Year
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Semester
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              >
                Division
              </Typography>
            </th>
            <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4">
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal leading-none opacity-70"
              ></Typography>
            </th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((ele) => (
            <tr key={ele.subjectId} className="even:bg-blue-gray-50/50">
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {ele.subjectId}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {ele.name}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal"
                >
                  {ele.taughtBy ? ele.taughtBy : "Not Assigned"}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {ele.year}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {ele.semester}
                </Typography>
              </td>
              <td className="p-4">
                <Typography
                  as="a"
                  href="#"
                  variant="small"
                  color="blue-gray"
                  className="font-medium"
                >
                  {ele.division}
                </Typography>
              </td>
              {!ele.taughtBy ? (
                <td className="p-4">
                  <NavLink
                    to={`/teacherassociation/${ele._id}/`}
                    className="mx-4"
                  >
                    <Button color="blue" variant="gradient">
                      Associate Teacher
                    </Button>
                  </NavLink>
                </td>
              ) : (
                <Button color="green">Already Assigned</Button>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <NavLink to="/course/new">
        <Button color="blue" variant="gradient">
          Create Subject
        </Button>
      </NavLink>
    </div>
  );
};

export default SubjectTable;
