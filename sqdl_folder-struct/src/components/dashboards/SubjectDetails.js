import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import axios from "axios";
import { GLOBAL_URL } from "../config";

const SubjectDetailsPage = () => {
  const { id } = useParams();
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getSubjectData = async() => {
    try {

      const res = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const response = await axios.post(
        GLOBAL_URL + "subject/getByID",
        {_id: id}, res
      )
      console.log(response);
      setSubjectDetails(response.data.data);
      setIsLoading(false);
    } catch(error) {
      console.log(error);
    }
  }

  // useEffect(async() => {
    
  //   // const fetchSubjectDetails = async () => {
  //   //   try {
  //   //     const response = await fetch(
  //   //       `http://localhost:5000/api/v1/subject/get?subjectId=${id}`,
  //   //     );
  //   //     const data = await response.json();
  //   //     setSubjectDetails(data);
  //   //     setIsLoading(false);
  //   //   } catch (error) {
  //   //     console.error("Error fetching subject details:", error);
  //   //     setIsLoading(false); // Update loading state in case of an error
  //   //   }
  //   // };

  //   // fetchSubjectDetails();
  // }, [id]);

  if (isLoading) {
    getSubjectData();
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!subjectDetails) {
    return <div>Error occurred while fetching subject details.</div>; // Show an error message
  }

  return (
    <div>
      <h2 className="text-2xl font-bold m-4">Welcome to the subject details</h2>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">{subjectDetails.name}</h2>
        <p className="text-gray-600 mb-4">{subjectDetails.description}</p>
        <p className="text-gray-500">
          Created by: {subjectDetails.createdBy}
        </p>
      </div>
      {/* Display other subject details as needed */}
    </div>
  );
};

export default SubjectDetailsPage;
