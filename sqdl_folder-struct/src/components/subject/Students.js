import React, { useState } from 'react';
import axios from "axios";
import { GLOBAL_URL } from '../config';


const Students = ({ subId }) => {

    const [subjectStudents, setSubjectStudents] = useState([])

    const getStudents = async() => {
        const res = {
            headers: {
              "Content-type": "application/json",
            },
        };

        try {
            const response = await axios.get(
                GLOBAL_URL + "user/getall", res
            )
            console.log(response);

            const stus = response.data.data.filter(ele => {
                if (ele.subjects.includes(subId))
                    return ele;
            });
            console.log(stus);
            setSubjectStudents(stus);
        } catch(error) {
            console.log(error);
        }
    }

    getStudents();

    
  return (
    subjectStudents.map(ele => {
        return (
            <>
                <h1>{ele.name}</h1>
                <p>{ele.email}</p>
                <p>{ele.enrollmentNumber}</p>
            </>
        )
    })
  )
}

export default Students