import React, { useState } from "react";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { GLOBAL_URL } from "../../../config";
import { check } from "../../../Cookies";


const NewTopic = () => {
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");

  const params = useParams();
  console.log(params);

  const handleSubmit = async () => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const postData = {
      title: name,
      description: desc,
      createdBy: check()._id,
      parentModule: params.moduleid
    }

    try {
      const response = await axios.post(
        GLOBAL_URL + "topic/create",
        postData, res
      );

      console.log(response);
      window.location.href = `/course/${params.subjectid}/${params.moduleid}`;
    } catch(error) {
      console.log(error);
    }
  };

  return (
    <div className=" module align-center p-10 flex flex-col items-center h-screen ">
      <br />
      <div className=" topicDiv bg-white border-blue-400 border-4 rounded-lg p-5 py-10 items-center justify-center flex">
        <Card color="transparent" shadow={false}>
          <Typography variant="h4" className="text-center text-black">
            New Topic
          </Typography>
          <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
            <div className="mb-4 flex flex-col gap-6">
              <Input 
                label="Topic name" 
                onChange={(e) => {
                  setName(e.target.value);
                }}
                ></Input>
              <Textarea 
                label="Topic Description"
                onChange={(e) => {
                  setDesc(e.target.value);
                }}
                ></Textarea>
              <Button 
                onClick={handleSubmit}
                disabled={name === '' || desc === ''}
              >Create</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewTopic;
