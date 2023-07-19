import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const SubjectDetailsPage = () => {
  const { id } = useParams();
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSubjectDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/subject/get?subjectId=${id}`);
        const data = await response.json();
        setSubjectDetails(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching subject details:', error);
        setIsLoading(false); // Update loading state in case of an error
      }
    };

    fetchSubjectDetails();
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator
  }

  if (!subjectDetails) {
    return <div>Error occurred while fetching subject details.</div>; // Show an error message
  }

  return (
    <div>
      <h2 className="text-2xl font-bold m-4">Welcome to the subject details</h2>
      <div className="bg-white p-4 rounded shadow">
        <h2 className="text-xl font-bold mb-2">{subjectDetails.data.name}</h2>
        <p className="text-gray-600 mb-4">{subjectDetails.data.description}</p>
        <p className="text-gray-500">Created by: {subjectDetails.data.createdBy}</p>
      </div>
      {/* Display other subject details as needed */}
    </div>
  );
};

export default SubjectDetailsPage;
