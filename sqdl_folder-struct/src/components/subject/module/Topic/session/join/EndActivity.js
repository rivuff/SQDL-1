import React, { useState, useEffect } from "react";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { Typography, Button } from "@material-tailwind/react";
import { GLOBAL_URL, SOCKET_URL } from "../../../../../config";
import { io } from "socket.io-client";
import axios from "axios";
import { check } from "../../../../../Cookies";
import { useParams } from "react-router-dom";

const socket = io(SOCKET_URL);

const res = {
  headers: {
    "Content-type": "application/json",
  },
};

const StudentEnd = () => {
  const labels = {
    0.5: "Learned 0-10%",
    1: "Learned 10-20%",
    1.5: "Learned 20-30%",
    2: "Learned 30-40%",
    2.5: "Learned 40-50%",
    3: "Learned 50-60%",
    3.5: "Learned 60-70%",
    4: "Learned 70-80%",
    4.5: "Learned 80-90%",
    5: "Learned 90-100%",
  };

  const [value, setValue] = useState(2);
  const [hover, setHover] = useState(-1);

  const params = useParams();

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  }

  async function addRating() {
    const response = await axios.post(
      GLOBAL_URL + "session/update",
      {
        _id: params.sessionid,
        rating: value,
      },
      res
    );
    console.log(response);
    socket.emit(params.sessionid + "ratingChange", params.sessionid);
    window.location.href = "/profile";
  }

  return (
    <div className="w-full h-screen bg-blue-gray-100 grid place-items-center">
      <div className="w-4/5 flex flex-col gap-10 justify-center items-center">
        <p className="text-3xl font-montserrat font-montserratWeight text-green-800">
          How much efficient was the lecture?
        </p>
        <div className="flex gap-1 text-center">
          <Rating
            name="size-large"
            defaultValue={2}
            size="large"
            precision={0.5}
            getLabelText={getLabelText}
            onChange={(event, newValue) => {
              setValue(newValue);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />
          {value !== null && (
            <p className="text-xl font-poppins font-semibold mt-1">
              {labels[hover !== -1 ? hover : value]}
            </p>
          )}
        </div>
      </div>
      <Button onClick={addRating}>Done Rating</Button>
    </div>
  );
};

const TeacherEnd = () => {
  const [rating, setRating] = useState(0);
  const params = useParams();

  useEffect(() => {
    socket.on(params.sessionid + "ratingChange", async () => {
      let sum = 0;
      const session = await axios.post(
        GLOBAL_URL + "session/get",
        { _id: params.sessionid },
        res
      );
      session.data.data.rating.map((r) => (sum += r));
      setRating(sum / (session.data.data.rating.length*5));
    });
  }, [socket]);

  return (
    <div className="w-full h-screen bg-blue-gray-100 grid place-items-center">
      <div className="w-4/5 flex flex-col gap-10 justify-center items-center">
        <p>You will see here to overall success rate of your lecture</p>
        {rating === 0 ? (
          <Typography variant="lead">Student are giving the rating please wait</Typography>
        ) : (
          <Typography variant="h1">SuccessRate: {rating * 100}%</Typography>
        )}
      </div>
    </div>
  );
};

const EndActivity = () => {
  return check().type === "teacher" ? <TeacherEnd /> : <StudentEnd />;
};

export default EndActivity;
