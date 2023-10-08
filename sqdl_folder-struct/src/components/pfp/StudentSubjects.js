import { Card, Typography } from "@material-tailwind/react";
import Row from "./Row";
import React from "react";
import axios from "axios";

const StudentSubjects = ({ array }) => {
  console.log(array);
  if (array == []) {
    return "Enroll in a course here";
  }

  return (
    <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" class="px-6 py-3">
              Subject name
            </th>
            <th scope="col" class="px-6 py-3">
              Taught By
            </th>
          </tr>
        </thead>
        <tbody>
          {
            array.map((ele) => (
              <Row obj={ele} />
            ))
          }
          {/* <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ABC
            </th>
            <td class="px-6 py-4">XYZ</td>
          </tr>
          <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ABC{" "}
            </th>
            <td class="px-6 py-4">XYZ</td>
          </tr>
          <tr class="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ABC
            </th>
            <td class="px-6 py-4">XYZ</td>
          </tr>
          <tr class="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ABC
            </th>
            <td class="px-6 py-4">XYZ</td>
          </tr>
          <tr>
            <th
              scope="row"
              class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
            >
              ABC
            </th>
            <td class="px-6 py-4">XYZ</td>
          </tr> */}
        </tbody>
      </table>
    </div>
    // <table className=" w-full min-w-max table-auto text-left border-spacing-2 border-slate-500 p-2">
    //   <thead>
    //     <tr className=" h-20px">
    //       <th className=" border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-2/3">
    //         <Typography
    //           variant="small"
    //           color="blue-gray"
    //           className="text-black font-normal leading-none opacity-70"
    //         >
    //           Subject Name
    //         </Typography>
    //       </th>{" "}
    //       <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-1/3">
    //         <Typography
    //           variant="small"
    //           color="blue-gray"
    //           className="text-black font-normal leading-none opacity-70"
    //         >
    //           Taught By
    //         </Typography>
    //       </th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     <tr className="border-b-2 border-brown-500 text-center font-redHatMono font-redHatMonoWeight text-xl py-2">
    //       <td>ABC</td>
    //       <td>XYZ</td>
    //     </tr>
    //     <tr className="border-b-2 border-brown-500 text-center font-redHatMono font-redHatMonoWeight text-xl py-2">
    //       <td>ABC</td>
    //       <td>XYZ</td>
    //     </tr>
    //     <tr className="border-b-2 border-brown-500 text-center font-redHatMono font-redHatMonoWeight text-xl py-2">
    //       <td>ABC</td>
    //       <td>XYZ</td>
    //     </tr>
    //     <tr className="border-b-2 border-brown-500 text-center font-redHatMono font-redHatMonoWeight text-xl py-2">
    //       <td>ABC</td>
    //       <td>XYZ</td>
    //     </tr>
    //   </tbody>
    // </table>
  );
  // return (
  //   <table className="w-full min-w-max table-auto text-left border-spacing-2 border-slate-500 p-2">
  //     <thead>
  //       <tr className="h-20px">
  //         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-2/3">
  //           <Typography
  //             variant="small"
  //             color="blue-gray"
  //             className="font-normal leading-none opacity-70"
  //           >
  //             Subject Name
  //           </Typography>
  //         </th>{" "}
  //         <th className="border-b border-blue-gray-100 bg-blue-gray-50 p-4 w-1/3">
  //           <Typography
  //             variant="small"
  //             color="blue-gray"
  //             className="font-normal leading-none opacity-70"
  //           >
  //             Taught By
  //           </Typography>
  //         </th>
  //       </tr>
  //     </thead>
  //     <tbody>
  //       {array.map((obj) => {
  //         return <Row obj={obj} />;
  //       })}
  //     </tbody>
  //   </table>
  // );
};

export default StudentSubjects;
