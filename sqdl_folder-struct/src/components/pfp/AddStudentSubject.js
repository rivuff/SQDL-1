import React, { useState, useEfefct, useEffect } from "react";

import axios from "axios";

import { check, set } from "../Cookies";
import { GLOBAL_URL } from "../config";

import { Select, Option, Button } from "@material-tailwind/react";
const AddStudentSubject = () => {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    try {
      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const data = await axios.get(GLOBAL_URL + "subject/getAll", res);
      console.log(data);
      setSubjects(data.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    subjects && (
      <div className="w-full p-10 text-center">
        <h1 className="my-4 text-5xl text-dark-gray font-montserrat font-extrabold">
          Choose Subjects
        </h1>
        <Select
          size="lg"
          label="Select Country"
          selected={(element) =>
            element &&
            React.cloneElement(element, {
              disabled: true,
              className:
                "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
            })
          }
        >
          {subjects.map((ele) => (
            <Option
              key={ele.name}
              value={ele.name}
              className="flex items-center gap-2"
            >
              {ele.name}
            </Option>
          ))}
        </Select>
        <Button color="green" variant="gradient" className="text-2xl my-6">
          Add
        </Button>
      </div>
    )
    // subjects && subjects.map((ele) => {
    //     return <h2>{ele.name}</h2>
    // })
  );
};

export default AddStudentSubject;
