import React from "react";
import { useState } from "react";
import { Outlet, useParams, NavLink } from "react-router-dom";
import axios from "axios";
import { GLOBAL_URL } from "../../config";
import { check, set } from "../../Cookies";
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

const SessionCard = ({ obj, no }) => {
  const params = useParams();
  console.log(obj);
  if (obj == []) {
    return null;
  }
  console.log(obj);
  return (
    <Card className="mt-6 w-96 inline-block m-2">
      <CardBody>
        <Typography
          variant="h4"
          className="mb-2 text-dark-gray font-redHatMono font-redHatMonoWeight"
        >
          Session No. {no + 1} : {obj.title}
        </Typography>
        <Typography className="font-poppins">{obj.description}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <NavLink
          to={`/course/${params.subjectid}/${params.moduleid}/${obj._id}`}
        >
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
  //   <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2 flex-shrink-0 inline-block">
  //     <div className="flex flex-col h-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
  //       <a
  //         href={
  //           "/course/" +
  //           params.subjectid +
  //           "/" +
  //           params.moduleid +
  //           "/" +
  //           obj._id
  //         }
  //       >
  //         <h5 className="mb-2 text-lg font-bold tracking-tight text-blue-400">
  //           {obj.title}
  //         </h5>
  //       </a>
  //       <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
  //         {obj.description}
  //       </p>
  //       <div className="flex-grow"></div> {/* Fill remaining space */}
  //     </div>
  //   </div>
  // );
};

const Module = () => {
  const params = useParams();

  //headers for axios requests
  const res = {
    headers: {
      "Content-type": "application/json",
    },
  };

  //component state
  const [module, setModule] = useState({
    name: "", //module name
    description: "", //module description
    createdBy: "", //module creator
    _id: params.moduleid, //module id --> obtained from url params
    parentSubject: {
      name: "", //name of parent Subject
      description: "", //description of parent subject
      createdBy: "", //creator of parent subject
      _id: params.subjectid, //subject id --> obtained from url params
    },
    childSession: [], //list of dicitionaries of child sessions
    fetched: false, //variable to indicate whether data has been requested from server
  });

  //edit drawer state
  const [open, setOpen] = React.useState(false);
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);

  function handleSub() {
    const name = document.getElementById("name").value;
    const desc = document.getElementById("desc").value;
    axios
      .post(GLOBAL_URL + "module/update", {
        name: name,
        description: desc,
        _id: params.moduleid,
      })
      .then((response) => {
        console.log(response);
        setModule({
          ...module,
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
    var newmod = module; //setting a copy of the component state

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
        newmod.parentSubject.name = response.data.data.name;
        newmod.parentSubject._id = response.data.data._id;
        newmod.parentSubject._id = response.data.data._id;
        newmod.parentSubject.description = response.data.data.description;
        newmod.parentSubject.createdBy = response.data.data.createdBy;
      })
      .then(() => {
        //requesting moduledata
        return axios.post(
          GLOBAL_URL + "module/getID",
          { _id: params.moduleid },
          res
        );
      })
      .then((response) => {
        //updating duplicate state hook
        console.log(response);
        newmod.name = response.data.data.name;
        newmod.description = response.data.data.description;
        newmod.createdBy = response.data.data.createdBy;
      })
      .then(() => {
        //fetching child session objects
        return axios.post(
          GLOBAL_URL + "session/getAllFromModuleID",
          { _id: params.moduleid },
          res
        );
      })
      .then((response) => {
        newmod.childSession = response.data.data;
      })
      .then(() => {
        newmod.fetched = true;
        setModule({ ...newmod });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (!module.fetched) {
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
          {module.parentSubject.name}
        </a>
        <a
          href={"/course/" + params.subjectid + "/" + params.moduleid}
          className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
        >
          {module.name}
        </a>
      </Breadcrumbs>

      <div className="mx-auto flex flex-col gap-7">
        <h1 className="text-5xl text-dark-gray font-montserrat font-extrabold">
          {module.parentSubject.name}: {module.name}
        </h1>
        <p className="text-xl font-poppins">{module.description}</p>
        <div>
          {module.childSession == [] ? (
            <h3 className="text-5xl text-dark-gray font-montserrat font-extrabold">
              Sessions
            </h3>
          ) : (
            module.childSession.map((object, ind) => {
              return <SessionCard obj={object} no={ind} />;
            })
          )}
        </div>
        <NavLink to={`/course/${params.subjectid}/${params.moduleid}/new`}>
          <Button color="blue" variant="gradient" fullWidth={true}>
            New Session
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
            Edit Module
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
            <XMarkIcon strokeWidth={2} className="h-5 w-5" />
          </IconButton>
        </div>
        <form className="flex flex-col gap-6 p-4">
          <Input id="name" label="Name" defaultValue={module.name} />
          <Textarea
            id="desc"
            rows={6}
            label="Description"
            defaultValue={module.description}
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
  //   <>
  //     <div className="align-center p-10 flex flex-col items-center h-screen w-full">
  //       <div className="">
  //         <Breadcrumbs
  //           separator={
  //           <ArrowLongRightIcon className="h-4 w-4 text-white" strokeWidth={2.5} />
  //           }
  //           className="rounded-full border border-white bg-gradient-to-tr from-blue-600 to-blue-500 p-1"
  //         >
  //           <a
  //             href="/course"
  //             className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
  //           >
  //             Courses
  //           </a>
  //           <a
  //             href={"/course/" + params.subjectid}
  //             className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
  //           >
  //             {module.parentSubject.name}
  //           </a>
  //           <a
  //             href={"/course/" + params.subjectid + "/" + params.moduleid}
  //             className="rounded-full bg-white px-3 py-1 font-medium text-gray-900 hover:text-blue-500"
  //           >
  //             {module.name}
  //           </a>
  //         </Breadcrumbs>
  //       </div>
  //       <br />
  //       <Card className="mt-6 w-4/5 p-5">
  //         <div className="text-center">
  //           <Typography variant="h3">{module.name}</Typography>
  //           <a href={"/course/" + module.parentSubject._id}>
  //             <Typography variant="paragraph" className="text-blue-400">
  //               {module.parentSubject.name}
  //             </Typography>
  //           </a>
  //           <a onClick={openDrawer} href="#">
  //             <Typography
  //               variant="small"
  //               className={
  //                 check()._id == module.createdBy
  //                   ? "text-blue-300 underline"
  //                   : "hidden"
  //               }
  //             >
  //               Edit
  //             </Typography>
  //           </a>
  //           <hr></hr>
  //           <br />
  //           <Typography variant="paragraph" className="text-left">
  //             {module.description}
  //           </Typography>
  //           <br />
  //           <hr></hr>

  //           <Typography variant="h6" className="text-left text-black-200">
  //             Sessions
  //             <Button
  //               size="sm"
  //               onClick={() => {
  //                 window.location.href =
  //                   "/course/" +
  //                   params.subjectid +
  //                   "/" +
  //                   params.moduleid +
  //                   "/new";
  //               }}
  //               className={
  //                 check()._id == module.createdBy ? "visible m-2" : "hidden"
  //               }
  //             >
  //               New Session
  //             </Button>
  //           </Typography>
  //           <div>
  //             {module.childSession == []
  //               ? "No Sessions"
  //               : module.childSession.map((object) => {
  //                   return <SessionCard obj={object} />;
  //                 })}
  //           </div>
  //         </div>
  //       </Card>
  //       <Drawer open={open} onClose={closeDrawer} className="p-4">
  //         <div className="mb-6 flex items-center justify-between">
  //           <Typography variant="h5" color="blue-gray">
  //             Edit Module
  //           </Typography>
  //           <IconButton variant="text" color="blue-gray" onClick={closeDrawer}>
  //             <XMarkIcon strokeWidth={2} className="h-5 w-5" />
  //           </IconButton>
  //         </div>
  //         <form className="flex flex-col gap-6 p-4">
  //           <Input id="name" label="Name" defaultValue={module.name} />
  //           <Textarea
  //             id="desc"
  //             rows={6}
  //             label="Description"
  //             defaultValue={module.description}
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
  //   </>
  // );
};

export default Module;
