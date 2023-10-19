import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import "./Subject.css";
import { UserState } from "../../context/contextProvider";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import cardImg from "../../images/books.png"
import { check } from "../Cookies";

const SubjectCard = ({ name, description, subjectId, createdBy }) => {
  const { user } = UserState();
  console.log(user.subjects);
  console.log(name, description, subjectId);

  const isSubjectAdded = user.subjects.includes(subjectId);

  const addSubject = async () => {
    try {
      const data = {
        userId: user._id,
        subjectIds: subjectId,
      };

      const response = await axios
        .post("http://localhost:5000/api/v1/subject/addUserSubject", data)
        .then((response) => {
          console.log(response);
        });

      const userData = JSON.parse(localStorage.getItem("userInfo"));

      const updateUserData = {
        ...userData,
        subjects: [...userData.subjects, data.subjectIds],
      };

      localStorage.setItem("userInfo", JSON.stringify(updateUserData));
      return response;
    } catch (error) {
      console.log("subject ", error);
    }
  };

  return (
    <NavLink
      className=""
      to={`/course/${subjectId}`}
    >
      {/* <div className="rounded-t-xl w-full bg-blue-500 p-4">
        <h3 className="text-white font-2xl">{name}</h3>
      </div>
      <div className="p-4 mb-5">{description}</div>
      <div className=" rounded-b-xl w-full my-4 mx-2">
        {isSubjectAdded ? (
          <Button color="green">Added</Button>
        ) : (
          <Button color="blue" onClick={addSubject}>
            Add
          </Button>
        )}
      </div> */}
      <Card className="mt-12 w-96">
      <CardHeader color="blue-gray" className="relative h-98">
        <img
          src={cardImg}
          alt="card-image"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        {name}
        </Typography>
        <Typography>
        {description}
        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button>Added</Button>
      </CardFooter>
    </Card>
    </NavLink>
  );

  // return (
  //   <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0">
  //     <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href={"/course/" + subjectId}>
  //         <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">
  //           {name}
  //         </h5>

  //         <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  //           {description}
  //         </p>
  //       </a>
  //       <div className="flex-grow"></div> {/* Fill remaining space */}
  //       <div className="flex items-end">
  //         {isSubjectAdded ? (
  //           <a
  //             href="#"
  //             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
  //           >
  //             Added
  //           </a>
  //         ) : (
  //           <a
  //             href="#"
  //             className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
  //             onClick={addSubject}
  //           >
  //             Add
  //             <svg
  //               aria-hidden="true"
  //               className="w-4 h-4 ml-2 -mr-1"
  //               fill="currentColor"
  //               viewBox="0 0 20 20"
  //               xmlns="http://www.w3.org/2000/svg"
  //             >
  //               <path
  //                 fillRule="evenodd"
  //                 d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
  //                 clipRule="evenodd"
  //               ></path>
  //             </svg>
  //           </a>
  //         )}
  //       </div>
  //     </div>
  //   </div>
  // );
};

const SubjectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    
    const fetchData = async() => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/subject/getAll"
        );
        const fetchedSubjects = response.data.data;
        const subjects = check().subjects.map(subId => {
          return fetchedSubjects.filter(sub => sub._id === subId)
        })
        console.log(subjects);
        setData(subjects);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  return (
    <div className="bg-gradient-to-r from-cyan-500 to-blue-500 overflow-x-hidden pr-6">
      <h2 className=" font-bold text-3xl flex justify-center p-2 pt-5">
        Choose Subjects
      </h2>
      <div className="flex flex-wrap  gap-10 justify-center">
        {data &&
          data.map((subject) => (
            <SubjectCard
              key={subject[0]._id}
              subjectId={subject[0]._id}
              name={subject[0].name}
              description={subject[0].description}
              createdBy={subject[0].createdBy}
            />
          ))}
      </div>
    </div>
  );
};

export default SubjectPage;
