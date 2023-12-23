import React from "react";
import Rating from "@mui/material/Rating";
import Box from "@mui/material/Box";
import StarIcon from "@mui/icons-material/Star";

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

  const [value, setValue] = React.useState(2);
  const [hover, setHover] = React.useState(-1);

  function getLabelText(value) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
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
            <p className="text-xl font-poppins font-semibold mt-1">{labels[hover !== -1 ? hover : value]}</p>
          )}
        </div>
      </div>
    </div>
  );
};

const EndActivity = () => {
  return <StudentEnd />;
};

export default EndActivity;
