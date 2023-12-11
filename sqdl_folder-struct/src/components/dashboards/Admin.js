import React, { useState } from "react";

import axios from "axios";
import TeacherTable from "./helpers/Admin/TeacherTable";
import StudentTable from "./helpers/Admin/StudentTable";
import SubjectTable from "./helpers/Admin/SubjectTable";
import NavCard from './helpers/NavCard';
import { Button } from "@material-tailwind/react";
import "./Admin.css"
// const Admin = () => {
//   //Query user data from database
//   let users = [];
//   return (
//     <div className="flex items-center py-5 align-middle justify-center w-full content-center">
//       <div className="p-10  items-center justify-center w-full">
//         <Tabs color="blue"></Tabs>
//       </div>
//     </div>
//   );
// };

// export default Admin;



const Admin = () => {
  const [openTab, setOpenTab] = useState(1);

  const [infoClicked, setInfoClicked] = useState({
    back: true,
    studentInfo: false,
    teacherInfo: false,
    subjectInfo: false,
  })

  const handleClick = (info) => {
    if (info === 'StudentInfo') {
      setInfoClicked({
        back: false,
        studentInfo: true,
        teacherInfo: false,
        subjectInfo: false,
      })
    } else if (info === 'TeacherInfo') {
      setInfoClicked({
        back: false,
        studentInfo: false,
        teacherInfo: true,
        subjectInfo: false,
      })
    } else if (info === 'SubjectInfo') {
      setInfoClicked({
        back: false,
        studentInfo: false,
        teacherInfo: false,
        subjectInfo: true,
      })
    } else if (info === 'Back') {
      setInfoClicked({
        back: true,
        studentInfo: false,
        teacherInfo: false,
        subjectInfo: false,
      })
    }
  } 

  // return (
  //   <div className="flex w-full">
  //      <div className="py-10 h-screen flex flex-col bg-teal-400">
  //        <ul>
  //          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2">About</li>
  //          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2">Profile</li>
  //          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2">Dashboard</li>
  //          <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100">Logout</li>
  //        </ul>
  //      </div>
  //      <div className="p-4 w-full bg-gray-200">
  //        <div className="flex gap-6">
  //          <div 
  //            className="w-1/3 h-48 p-5 bg-orange-500 rounded-xl hover:bg-orange-600 font-montserratWeight 
  //            font-montserrat text-3xl text-white relative shadow-[2px_2px_10px_#737373]
  //            before:content=[''] before:absolute before:w-[150px] before:h-[150px] before:bg-gray-200 
  //            before:rounded-full before:opacity-60 before:left-[-15px] before:bottom-[-60px]
  //            after:content=[''] after:absolute after:w-[150px] after:h-[150px] after:bg-gray-200 
  //            after:rounded-full after:opacity-60 after:right-[-25px] after:top-[-18px]">
  //            Student Information
  //          </div>
  //          <div 
  //            className="w-1/3 h-48 p-5 bg-blue-700 rounded-xl hover:bg-blue-800 font-montserratWeight 
  //            font-montserrat text-3xl text-white relative shadow-[2px_2px_10px_#737373]
  //            before:content=[''] before:absolute before:w-[150px] before:h-[150px] before:bg-gray-200 
  //            before:rounded-full before:opacity-60 before:left-[-15px] before:bottom-[-60px]
  //            after:content=[''] after:absolute after:w-[150px] after:h-[150px] after:bg-gray-200 
  //            after:rounded-full after:opacity-60 after:right-[-25px] after:top-[-18px]">
  //            Teacher Information
  //          </div>
  //        </div>
  //      </div>
  //    </div>
  // );

  return (
    <>
      <div onClick={() => {handleClick('Back')}} className="cursor-pointer">
        ⬅️
      </div>
      {infoClicked.studentInfo && <StudentTable />}
      {infoClicked.teacherInfo && <TeacherTable />}
      {infoClicked.subjectInfo && <SubjectTable />}
      {infoClicked.back && <div className="flex w-full">
        {/* <NavCard className="py-10 h-screen flex flex-col gap-10 bg-gradient-to-r from-teal-200 to-teal-400">
          <h2 className="text-5xl font-montserratWeight font-montserrat text-center text-white">SQDL</h2>
          <ul>
            <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200">About</li>
            <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200">Profile</li>
            <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 border-b-2 hover:bg-teal-200">Dashboard</li>
            <li className="w-full cursor-pointer px-20 py-3 font-redHatMonoWeight font-redHatMono text-lg text-center bg-teal-100 hover:bg-teal-200">Logout</li>
          </ul>
        </NavCard> */}
        <div className=" p-8 pb-20 w-full xl:bg-gray-200 ">
          <div className=" flex gap-6 responsive">
            <div 
              className="mobile w-1/3 h-48 p-5 bg-orange-500 rounded-xl hover:bg-orange-600 font-montserratWeight 
              font-montserrat text-3xl text-white "
              onClick={() => {handleClick('StudentInfo')}}>
              Student Information
            </div>
            
            <div 
              className="mobile w-1/3 h-48 p-5 bg-blue-700 rounded-xl hover:bg-blue-800 font-montserratWeight 
              font-montserrat text-3xl text-white "
              onClick={() => {handleClick('TeacherInfo')}}>
              Teacher Information
            </div>
            <div 
              className="mobile w-1/3 h-48 p-5 bg-green-700 rounded-xl hover:bg-green-800 font-montserratWeight 
              font-montserrat text-3xl text-white "
              onClick={() => {handleClick('SubjectInfo')}}>
              Subjects Information
            </div>
          </div>
        </div>
      </div>}
    </>
  );
  // return (
  //   <div>
  //     <div className="flex flex-wrap">
  //       <div className="w-full">
  //         <ul
  //           className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
  //           role="tablist"
  //         >
  //           <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
  //             <a
  //               className={
  //                 "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
  //                 (openTab === 1
  //                   ? "text-blue-400 bg--600"
  //                   : "text-" + color + "-600 bg-white")
  //               }
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 setOpenTab(1);
  //               }}
  //               data-toggle="tab"
  //               href="#link1"
  //               role="tablist"
  //             >
  //               Student Accounts
  //             </a>
  //           </li>
  //           <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
  //             <a
  //               className={
  //                 "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
  //                 (openTab === 2
  //                   ? "text-blue-400 bg-" + color + "-600"
  //                   : "text-blue" + "-600 bg-white")
  //               }
  //               onClick={(e) => {
  //                 e.preventDefault();
  //                 setOpenTab(2);
  //               }}
  //               data-toggle="tab"
  //               href="#link2"
  //               role="tablist"
  //             >
  //               Teacher Accounts
  //             </a>
  //           </li>
  //         </ul>
  //         <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
  //           <div className="px-4 py-5 flex-auto">
  //             <div className="tab-content tab-space">
  //               <div className={openTab === 1 ? "block" : "hidden"} id="link1">
  //                 <StudentTable />
  //               </div>
  //               <div className={openTab === 2 ? "block" : "hidden"} id="link2">
  //                 <TeacherTable />
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
};

export default Admin