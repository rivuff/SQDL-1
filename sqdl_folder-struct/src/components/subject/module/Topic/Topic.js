import React, {useState, useEffect} from "react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
  Button,
  Breadcrumbs,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import TopicTable from "./TopicTable.js";
import axios from "axios";
import { GLOBAL_URL } from "../../../config.js";
import { NavLink, useParams } from "react-router-dom";


const Topic = () => {

  const [data, setData] = useState({
    subjectName: "",
    moduleName: "",
    topicData: []
  });
  const [open, setOpen] = useState(1);

  const params = useParams();

  const handleOpen = (value) => setOpen(open === value ? 0 : value);

  const getTopics = async () => {
    const res = {
      headers: {
        "Content-type": "application/json",
      },
    };

    axios
      .post(
        GLOBAL_URL + "subject/getByID",
        { _id: params.subjectid }, res
      ).then(response => {
        console.log(response);
        setData(prev => {
          return {
            ...prev, subjectName: response.data.data.name
          }
        })
      }).then(() => {
        return axios.post(
          GLOBAL_URL + "module/getID",
          { _id: params.moduleid }, res
        )
      }).then(response => {
        console.log(response);
        setData(prev => {
          return {
            ...prev, moduleName: response.data.data.name
          }
        })
      }).then(() => {
        return axios.get(
          GLOBAL_URL + "topic/getAll", 
          res
        )
      }).then(response => {
        console.log(response);
        setData(prev => {
          return {
            ...prev, topicData: response.data.data
          }
        })
      }).catch(error => {
        console.log(error);
      })
    // try {
    //   const response = await axios.post(
    //     GLOBAL_URL + "subject/getByID",
    //     { _id: params.subjectid }, res
    //   )
    //   console.log(response);
    //   setData(prev => {
    //     return {
    //       ...prev, subjectName: response.data.data.name
    //     }
    //   })
    // } catch (error) {
    //     console.log(error)
    // }

    // try {
    //   const response = await axios.post(
    //     GLOBAL_URL + "module/getID",
    //     { _id: params.moduleid }, res
    //   )
    //   console.log(response);
    //   setData(prev => {
    //     return {
    //       ...prev, moduleName: response.data.data.name,
    //     }
    //   })
    // } catch (error) {
    //   console.log(error);
    // }

    // try {
    //   const response = await axios.get(
    //     GLOBAL_URL + "topic/getAll", res
    //   )
    //   console.log(response.data.data);
    //   setData(prev => {
    //     return {
    //       ...prev, topicData: response.data.data
    //     }
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }


  useEffect(() => {
    getTopics();
  }, [])
  
  return (
    <div className="p-5 bg-lightesh-gray">
      <Breadcrumbs
        separator={
          <ArrowLongRightIcon
            className="h-4 w-4 text-white"
            strokeWidth={2.5}
          />
        }
        className="rounded-full border border-white bg-gradient-to-tr from-blue-600 to-blue-500 p-1 mb-7"
      >
        <a
          href="/course"
          className="text rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          Courses
        </a>
        <a
          href={"/course/" + params.subjectid}
          className="text rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          {data.subjectName}
        </a>
        <a
          href={"/course/" + params.subjectid + "/" + params.moduleid}
          className="text rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          {data.moduleName}
        </a>
      </Breadcrumbs>
      <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold">
        Module: {data.moduleName}
      </h1>
      <h3 className="text-5xl ml-5 mt-5 text-dark-gray font-montserrat font-extrabold">
        Topics
      </h3>
      {data && data.topicData.map((ele) => {
        return (<Accordion className="p-8 mb-2" open={open === 1}>
          <AccordionHeader className="mb-4" onClick={() => handleOpen(1)}>
            {ele.title}
          </AccordionHeader>
          <AccordionBody>
            <p className="text-xl p-3 border-b-2">{ele.description}</p>
            <TopicTable sessions={ele.sessions}/>
            <NavLink to={`/course/${params.subjectid}/${params.moduleid}/${ele._id}/newSession`}>
              <Button>
                Create session
              </Button>
            </NavLink>
          </AccordionBody>
        </Accordion>
      )})}
      <NavLink to={`/course/${params.subjectid}/${params.moduleid}/newTopic`}>
        <Button variant="gradient" color="blue">
          Add Topic
        </Button>
      </NavLink>
    </div>
  );
};

export default Topic;
