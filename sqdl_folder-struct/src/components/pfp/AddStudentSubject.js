import React, { useState, useEffect } from "react";

import axios from "axios";

import { check, set } from "../Cookies";
import { GLOBAL_URL } from "../config";

import { Select, Option, Button } from "@material-tailwind/react";

const AddStudentSubject = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState([null]);

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

  const updateSubjects = (ele, index) => {
    const x = selectedSubject;
    console.log(ele, index);
    x[index] = ele;
    return x;
  };

  const removeSubject = (index) => {
    const x = selectedSubject;
    console.log(x);
    x.splice(index, 1);
    console.log(x);
    return x;
  };

  const SubjectSelect = () => {
    return selectedSubject.map((ele, ind) => {
      return (
        <div className="flex gap-10">
          <Button
            color="red"
            variant="gradient"
            onClick={() => {
              setSelectedSubject((prev) => {
                return [...prev, null];
              });
            }}
          >
            Add
          </Button>
          <Select
            onChange={
              (e) => {updateSubjects(e, ind)}
            }
            size="lg"
            label="Select Subjects"
            selected={(element) =>
              element &&
              React.cloneElement(element, {
                disabled: true,
                className:
                  "flex items-center opacity-100 px-0 gap-2 pointer-events-none",
              })
            }
            value={ele}
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
          <Button
            id={ind}
            color="blue"
            variant="gradient"
            onClick={() => {
              console.log(ind);
              setSelectedSubject(prev => {
                return [...removeSubject(ind)]
              });
            }}
          >
            Remove
          </Button>
        </div>
      );
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const ids = selectedSubject.map((ele) => {
      const subData = subjects.filter((e) => {
        return e.name === ele;
      })
      return subData[0]._id
    })

    console.log(ids);

    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };

    try {
      const response = await axios.post(
        GLOBAL_URL + "subject/addUserSubject",
        {
          userId: check()._id, 
          subjectIds: ids,
        }, res
      )
      console.log(response);
    } catch(error) {
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
        {/* <Select
          size="lg"
          label="Select Subjects"
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
        </Select> */}
        <div className="flex flex-col gap-10">
          <SubjectSelect />
        </div>
        <Button
          color="green"
          variant="gradient"
          className="text-2xl my-6"
          onClick={handleSubmit}
        >
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