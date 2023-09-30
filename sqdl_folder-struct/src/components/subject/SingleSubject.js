import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Outlet, useParams } from "react-router-dom";
import axios from "axios";
import { GLOBAL_URL } from "../config";
import { check, set } from "../Cookies";
import {
  Input,
  Typography,
  Textarea,
  Card,
  CardBody,
  CardFooter,
  Button,
  Breadcrumbs,
  Drawer,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";

const ModuleCard = ({ obj, no }) => {
  const params = useParams();
  console.log(obj);
  if (obj == []) {
    return null;
  }
  return (
    <Card className="div mt-6 w-96 inline-block m-2">
      <CardBody>
        <Typography
          variant="h4"
          className="mb-2 text-dark-gray font-redHatMono font-redHatMonoWeight"
        >
          Module No. {no + 1} : {obj.name}
        </Typography>
        <Typography className="font-poppins">{obj.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <NavLink to={`/course/${params.subjectid}/${obj._id}`}>
          <Button
            color="green"
            variant="gradient"
            className="rounded-xl text-md"
          >
            Next
          </Button>
        </NavLink>
      </CardFooter>
    </Card>
  );
  // return (
  //   <div className="w-full bg-blue-500 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0 inline-block">
  //     <div className="flex flex-col h-full p-6 bg-blue-800 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a href={"/course/" + params.subjectid + "/" + obj._id}>
  //         <h5 className="mb-2 text-lg font-bold tracking-tight text-white">
  //           {obj.name}
  //         </h5>
  //       </a>
  //       <p className="mb-3 font-normal text-white dark:text-gray-400">
  //         {obj.description}
  //       </p>
  //       <div className="flex-grow"></div> {/* Fill remaining space */}
  //     </div>
  //   </div>
  // );
};

const SingleSubject = () => {
  const params = useParams();
  console.log(params);

  //headers for axios requests
  const res = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //component state
  const [subject, setSubject] = useState({
    name: "", //module name
    description: "", //module description
    createdBy: "", //module creator
    _id: params.subjectid, //module id --> obtained from url params
    childModule: [], //list of dicitionaries of child sessions
    fetched: false, //variable to indicate whether data has been requested from server
  });

  console.log(check());
  console.log(`check()._id = ${check()._id}`);
  console.log(`Created By = ${subject.createdBy}`);

  //edit drawer state
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  function handleSub() {
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    console.log(name, desc, params.subjectid);
    axios
      .post(
        GLOBAL_URL + "subject/update",
        { name: name, description: desc, _id: params.subjectid },
        res
      )
      .then((response) => {
        setSubject({
          ...subject,
          name: response.data.data.name,
          description: response.data.data.description,
        });
        closeDrawer();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  async function getAllData() {
    var newsub = subject; //setting a copy of the component state
    //fetching user data
    axios
      .post(GLOBAL_URL + "user/getID", { _id: check()._id }, res)
      .then((response) => {
        console.log(response);
        set(response.data.data);
        if (!response.data.data.subjects.includes(params.subjectid)) {
          console.log("not in user subject");
          window.location.href = "/course"; //redirect user to /course route if current course not enrolled for
        }
      })
      .then(() => {
        //requesting subject data
        return axios.post(
          GLOBAL_URL + "subject/getByID",
          { _id: params.subjectid },
          res
        );
      })
      .then((response) => {
        console.log(response);
        //updating duplicate state hook
        newsub.name = response.data.data.name;
        newsub._id = response.data.data._id;
        newsub._id = response.data.data._id;
        newsub.description = response.data.data.description;
        newsub.createdBy = response.data.data.createdBy;
      })
      .then(() => {
        //requesting moduledata
        console.log(newsub);
        return axios.post(
          GLOBAL_URL + "module/getAllFromSubjectID",
          { _id: params.subjectid },
          res
        );
      })
      .then((response) => {
        //updating duplicate state hook
        console.log(response);
        // push data into child module field
        subject.childModule = response.data.data;
      })
      .then(() => {
        newsub.fetched = true;
        setSubject({ ...newsub });
        console.log(subject);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (subject.fetched != true) {
    getAllData();
    return (
      <div className="align-center p-10 flex flex-col items-center h-screen ">
        <Spinner></Spinner>
      </div>
    );
  }

  return (
    <div className="p-10 flex flex-col gap-10 bg-lightesh-gray">
      <Breadcrumbs
        separator={
          <ArrowLongRightIcon
            className="h-4 w-4 text-white"
            strokeWidth={2.5}
          />
        }
        className="rounded-full border border-white bg-gradient-to-tr from-blue-600 to-blue-500 p-1"
      >
        <a
          href="/course"
          className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          Courses
        </a>
        <a
          href={"/course/" + params.subjectid}
          className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          {subject.name}
        </a>
      </Breadcrumbs>
      <div className="mx-auto flex flex-col gap-7">
        <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold">
          {subject.name}
        </h1>
        <p className="text-xl font-poppins">{subject.description}</p>
        <h3 className="text-5xl text-dark-gray font-montserrat font-extrabold">
          Modules
        </h3>
        <div>
          {subject.childModule.map((object, ind) => {
            return <ModuleCard obj={object} no={ind} />;
          })}
        </div>
        <NavLink to={`/course/${params.subjectid}/new`}>
          <Button color="blue" variant="gradient" fullWidth={true}>
            Add New Module
          </Button>
        </NavLink>
        <Button
          color="blue"
          variant="gradient"
          onClick={openDrawer}
          className={
            check().subjects.includes(params.subjectid)
              ? "font-semibold"
              : "hidden"
          }
        >
          Edit
        </Button>
      </div>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
        <div className="mb-6 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray">
            Edit Subject
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Input id="name" label="Name" defaultValue={subject.name} />
          <Textarea
            id="desc"
            rows={6}
            label="Description"
            defaultValue={subject.description}
          />
          <Button
            onClick={() => {
              handleSub();
            }}
          >
            Update
          </Button>
        </form>
      </Drawer>
    </div>
  );
  // return (
  //   <div>
  //     <div className="align-center p-10 flex flex-col items-center h-screen ">
  //       <div className="">
  //         <Breadcrumbs className="">
  //           <a href="/course" className="opacity-60">
  //             Courses
  //           </a>
  //           <a href={"/course/" + params.subjectid} className="opacity-60">
  //             {subject.name}
  //           </a>
  //         </Breadcrumbs>
  //       </div>
  //       <br />
  //       <Card className="mt-6 w-4/5 p-5">
  //         <div className="text-center">
  //           <Typography variant="h3">{subject.name}</Typography>
  //           <a onClick={openDrawer} href="#">
  //             <Typography
  //               variant="small"
  //               className={
  //                 check()._id == subject.createdBy ? "text-blue-300" : "hidden"
  //               }
  //             >
  //               Edit
  //             </Typography>
  //           </a>

  //           <hr></hr>
  //           <br />
  //           <Typography variant="paragraph" className="text-left">
  //             {subject.description}
  //           </Typography>
  //           <br />
  //           <hr></hr>

  //           <Typography variant="h6" className="text-left text-black-200">
  //             Modules
  //             <Button
  //               size="sm"
  //               onClick={() => {
  //                 window.location.href = "/course/" + params.subjectid + "/new";
  //               }}
  //               className={
  //                 check()._id == subject.createdBy ? "visible m-2" : "hidden"
  //               }
  //             >
  //               New Module
  //             </Button>
  //           </Typography>
  //           <div>
  //             {subject.childModule.map((object) => {
  //               return <ModuleCard obj={object} />;
  //             })}
  //           </div>
  //         </div>
  //       </Card>
  //       <Drawer open={open} onClose={closeDrawer} className="p-4">
  //         <div className="mb-6 flex items-center justify-between">
  //           <Typography variant="h5" color="blue-gray">
  //             Edit Subject
  //           </Typography>
  //           <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
  //             <XMarkIcon strokeWidth={2} className="h-5 w-5" />
  //           </IconButton>
  //         </div>
  //         <form className="flex flex-col gap-6 p-4">
  //           <Input id="name" label="Name" defaultValue={subject.name} />
  //           <Textarea
  //             id="desc"
  //             rows={6}
  //             label="Description"
  //             defaultValue={subject.description}
  //           />
  //           <Button
  //             onClick={() => {
  //               handleSub();
  //             }}
  //           >
  //             Update
  //           </Button>
  //         </form>
  //       </Drawer>
  //     </div>
  //   </div>
  // );
};

export default SingleSubject;
