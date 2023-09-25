import React from "react";
import { Spinner } from "@material-tailwind/react";
import "./StudentTable.css";
const LoadingRow = ({ cols }) => {
  return (
    <tr>
      {[...Array(cols)].map((x, i) => {
        return (
          <td key={i} className="even col col-flex items-center justify-center">
            <Spinner className="h-3 w-3"></Spinner>
          </td>
        );
      })}
    </tr>
  );
};

export default LoadingRow;
