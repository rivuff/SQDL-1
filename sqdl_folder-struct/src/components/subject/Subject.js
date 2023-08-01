import React, { useEffect, useState } from "react";
import axios from "axios";
import { UserState } from "../../context/contextProvider";

const SubjectCard = ({ name, description, subjectId, createdBy }) => {
  const { user } = UserState();
  console.log(user.subjects);

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
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0">
      <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href={"/course/" + subjectId}>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">
            {name}
          </h5>

          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
            {description}
          </p>
        </a>
        <div className="flex-grow"></div> {/* Fill remaining space */}
        <div className="flex items-end">
          {isSubjectAdded ? (
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Added
            </a>
          ) : (
            <a
              href="#"
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={addSubject}
            >
              Add
              <svg
                aria-hidden="true"
                className="w-4 h-4 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const SubjectPage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/subject/getAll",
        );
        console.log(response.data.data);
        setData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2 className="italic font-semibold text-xl flex justify-center p-2 pt-5">
        Choose Subjects
      </h2>
      <div className="card-container ml-5 m-2 p-2 flex flex-wrap -mx-2">
        {data &&
          data.map((subject) => (
            <SubjectCard
              key={subject._id}
              subjectId={subject._id}
              name={subject.name}
              description={subject.description}
              createdBy={subject.createdBy}
            />
          ))}
      </div>
    </div>
  );
};

export default SubjectPage;
