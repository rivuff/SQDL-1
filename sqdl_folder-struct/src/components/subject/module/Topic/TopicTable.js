import React, {useState, useEffect} from "react";
import { BiCopy } from "react-icons/bi";
import { NavLink, useParams } from "react-router-dom";

import { GLOBAL_URL } from "../../../config";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";

const TopicTable = (props) => {
  const params = useParams();

  const [session, setSession] = useState([]);

  const getSessionData = async(id) => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };
    try {
      const response = await axios.post(GLOBAL_URL + "session/get", {_id: id}, res)
      console.log(response);
      setSession(prev => [...prev, response.data.data]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    props.sessions.map(session => getSessionData(session._id))
  }, [])

  const notify = () =>
    toast.success("Code copied!", {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  console.log(props.sessions);
  return (
    <div className="mb-4 flex flex-col overflow-x-auto">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm font-light">
              <thead className="border-b font-medium dark:border-neutral-500">
                <tr>
                  <th scope="col" className="px-6 py-4">
                    S No.
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Session
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Students
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Session Code
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Start Time
                  </th>
                  <th scope="col" className="px-6 py-4">
                    End Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {console.log(session)}
                {session &&
                  session.map((ele, ind) => {
                    console.log(ele.startDateTime);
                    let startDate = new Date(ele.startDateTime);
                    let endDate = new Date(ele.endDateTime);
                    return (
                      <tr className="border-b">
                        <td className="whitespace-nowrap px-6 py-4 font-medium">
                          {ind + 1}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {ele.title}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {ele.endDateTime ? "Completed" : "Not Yet Completed"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {ele.endDateTime ? ele.approved_request.length : "Will be show after session completion"}
                        </td>
                        <td className="inline-block whitespace-nowrap px-3 py-4">
                          {ele.sessionCode ? (
                            <>
                              {ele.sessionCode}
                              <div
                                onClick={() => {
                                  navigator.clipboard.writeText(
                                    ele.sessionCode
                                  );
                                  notify();
                                }}
                                className="inline-block ml-2 cursor-pointer"
                              >
                                <BiCopy />
                              </div>
                            </>
                          ) : (
                            "-"
                          )}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {ele.startDateTime ? startDate.toLocaleString() : "-"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {ele.endDateTime ? endDate.toLocaleString() : "Is shown after session completion"}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {!ele.endDateTime ? (
                            <NavLink
                            to={`/course/${params.subjectid}/${params.moduleid}/${ele._id}`}
                          >
                            Click to go to session
                          </NavLink>
                          ) : (
                            <NavLink
                            to={`/course/${params.subjectid}/${params.moduleid}/${ele._id}/end`}
                          >
                            show Report
                          </NavLink>
                          )}
                          
                        </td>
                      </tr>
                    );
                  })}
                {/* <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium">1</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                </tr>
                <tr class="border-b dark:border-neutral-500">
                  <td class="whitespace-nowrap px-6 py-4 font-medium ">2</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                </tr>
                <tr class="border-b ">
                  <td class="whitespace-nowrap px-6 py-4 font-medium ">3</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                  <td class="whitespace-nowrap px-6 py-4">Cell</td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TopicTable;
