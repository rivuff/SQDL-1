import React from "react";
import { Spinner } from "@material-tailwind/react";
const LoadingRow = ({ cols }) => {
  return (
    <tr>
      {[...Array(cols)].map((x, i) => {
        return (
          <td key={i} className="col col-flex items-center justify-center">
            <Spinner className="h-3 w-3"></Spinner>
          </td>
        );
      })}
    </tr>
  );
};

export default LoadingRow;
