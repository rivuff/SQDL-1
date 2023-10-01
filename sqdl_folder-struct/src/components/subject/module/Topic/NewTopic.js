import React from "react";
import {
  Input,
  Typography,
  Textarea,
  Card,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";
const NewTopic = () => {
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
              <Input label="Topic name"></Input>
              <Textarea label="Topic Description"></Textarea>
              <Button>Create</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default NewTopic;
