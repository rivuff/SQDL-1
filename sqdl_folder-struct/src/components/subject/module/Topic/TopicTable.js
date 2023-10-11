import React from "react";

import { NavLink, useParams } from "react-router-dom";

const TopicTable = (props) => {

  const params = useParams();

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
                    Topic
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-4">
                    Students
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
                {props.sessions && props.sessions.map((ele, ind) => {
                    return (
                      <tr className="border-b">
                          <td className="whitespace-nowrap px-6 py-4 font-medium">{ind+1}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.title}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.topic}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.status ? "C/P" : "-"}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.students ? "no." : "-"}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.startTime ? "stime" : "-"}</td>
                          <td className="whitespace-nowrap px-6 py-4">{ele.endTime ? "etime" : "-"}</td>
                          <td className="whitespace-nowrap px-6 py-4">
                            <NavLink to={`/course/${params.subjectid}/${params.moduleid}/${ele._id}`}>
                              Click to go to session
                            </NavLink>
                          </td>
                      </tr>
                    )
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
    </div>
  );
};

export default TopicTable;
