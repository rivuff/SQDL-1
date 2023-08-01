import React from "react";

import axios from "axios";
import TeacherTable from "./helpers/Admin/TeacherTable";
import StudentTable from "./helpers/Admin/StudentTable";
import { Button } from "@material-tailwind/react";

const Admin = () => {
  //Query user data from database
  let users = [];
  return (
    <div className="flex items-center py-5 align-middle justify-center w-full content-center">
      <div className="p-10  items-center justify-center w-full">
        <Tabs color="blue"></Tabs>
      </div>
    </div>
  );
};

export default Admin;

const Tabs = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div>
      <div className="flex flex-wrap">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-blue-400 bg--600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                href="#link1"
                role="tablist"
              >
                Student Accounts
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-blue-400 bg-" + color + "-600"
                    : "text-blue" + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                href="#link2"
                role="tablist"
              >
                Teacher Accounts
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <div className="px-4 py-5 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <StudentTable />
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <TeacherTable />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
