import React from "react";
import axios from "axios";
import { GLOBAL_URL } from "../config";
import { useState } from "react";
import { Typography } from "@material-tailwind/react";
const Row = ({ obj }) => {
  const [state, updateState] = useState({
    name: "",
    createdBy: "",
    _id: obj,
    fetched: false,
  });
  console.log("Hello");
  console.log(obj);
  const getData = async() => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(
        GLOBAL_URL + "subject/getByID",
        { _id: obj },
        res
      );
      console.log(response);
      updateState(prev => {
        return {...prev, name: response.data.data.name, createdBy: response.data.data.createdBy, _id: response.data.data._id}
      })
    } catch(error) {
      console.log(error);
    }

    try {
      const response = await axios.post(
        GLOBAL_URL + "user/getID",
        {_id: state.createdBy}, 
        res
      )
      console.log(response);
      updateState(prev => {
        return {...prev, createdBy: response.data.data.name, fetched: !state.fetched}
      })
    } catch(error) {
      console.log(error);
    }
  }

  if (!state.fetched) {
    getData();


    //fetch subject data
    // axios
    //   .post(
    //     GLOBAL_URL + "subject/getByID",
    //     { _id: obj },
    //     { headers: { "Content-type": "application/json" } },
    //   )
    //   .then((response) => {
    //     const data = response.data.data;
    //     updateState({
    //       ...state,
    //       name: data.name,
    //       // createdBy: data.createdBy,
    //       _id: data._id,
    //       // fetched: !state.fetched,
    //     });
    //     return axios.post(
    //       GLOBAL_URL + "user/getID",
    //       {_id: data.createBy}, 
    //       { headers: { "Content-type": "application/json" } },
    //     )
    //   }).then((response) => {
    //     console.log(response);
    //     updateState({
    //       ...state,
    //       createdBy: response.data.data.name,
    //       fetched: !state.fetched
    //     })
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
  return (
    <>
      <tr className="m-2">
        <td>
          <a href={"/subject/" + state._id}>
            <Typography
              variant="md"
              color="blue-gray"
              className="font-normal text-blue-600 underline"
            >
              {state.name}
            </Typography>
          </a>
        </td>
        <td>
          <Typography variant="md" color="blue-gray" className="font-normal">
            {state.createdBy}
          </Typography>
        </td>
      </tr>
    </>
  );
};

export default Row;
