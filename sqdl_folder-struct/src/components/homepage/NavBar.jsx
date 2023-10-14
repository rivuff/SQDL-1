"use client";

import { Dropdown } from "flowbite-react";
import React, { useEffect } from "react";
import { useState } from "react";
import {
  Collapse,
  Typography,
  IconButton,
  Navbar,
  Popover,
  PopoverHandler,
  Input,
  PopoverContent,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Badge,
  Button,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { UserState } from "../../context/contextProvider";
import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { type, check } from "./../Cookies";
function ClockIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );
}
function NavList(props) {
  var navList = props.navList;
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };
  console.log(check());
  if (check() == null) {
    // Render navigation list for non-logged-in users
    return (
      <ul className="bg-transparent text-2xl my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {Object.entries(navList).map(([key, val]) => {
          return (
            <li key={key}>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="p-1 bg-transparent font-medium text-2xl "
              >
                <Link
                  to={key === "home" ? "/" : key}
                  key={key}
                  className=" text-black text-xl flex items-center hover:text-blue-500 transition-colors"
                >
                  {val}
                </Link>
              </Typography>
            </li>
          );
        })}
      </ul>
    );
  } else if (check().type === "student") {
    // Render navigation list for student users
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 bg-transparent font-medium "
          >
            <Link
              to={"/"}
              className=" text-white flex items-center hover:text-blue-500 transition-colors text-lg"
            >
              About
            </Link>
          </Typography>
        </li>
        <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
          >
            <Link
              to={"/profile"}
              className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg"
            >
              Profile
            </Link>
          </Typography>
        </li>
        <li>
          <Typography
            as="li"
            variant="small"
            color="red"
            className="p-1 font-medium "
          >
            <li
              className="text-black p-2 rounded-md flex items-center bg-red-400 hover:bg-red-600 transition-colors text-lg cursor-pointer"
              onClick={LogoutHandler}
            >
              Log out
            </li>
          </Typography>
        </li>
      </ul>
    );
  } else {
    return (
      <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        {/* <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
          >
            <Link
              to={"/"}
              className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg"
            >
              About
            </Link>
          </Typography>
        </li>
        <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
          >
            <Link
              to={"/profile"}
              className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg"
            >
              Profile
            </Link>
          </Typography>
        </li>

        <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
          >
            <Link
              to={"/dashboard"}
              className=" text-white p-2 rounded-md flex items-center bg-blue-600 hover:text-blue-500 transition-colors text-lg"
            >
              Dashboard
            </Link>
          </Typography>
        </li> */}
         <Menu>
      <MenuHandler>
        <IconButton variant="text">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="h-5 w-5"
          >
            <path
              fillRule="evenodd"
              d="M5.25 9a6.75 6.75 0 0113.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 01-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 11-7.48 0 24.585 24.585 0 01-4.831-1.244.75.75 0 01-.298-1.205A8.217 8.217 0 005.25 9.75V9zm4.502 8.9a2.25 2.25 0 104.496 0 25.057 25.057 0 01-4.496 0z"
              clipRule="evenodd"
            />
          </svg>
        </IconButton>
      </MenuHandler>
      <MenuList className="flex flex-col gap-2 max-h-72">
        {/* <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
          <Avatar
            variant="circular"
            alt="tania andrew"
            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              <span className="font-medium text-blue-gray-900">Tania</span> send
              you a message
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />
              13 minutes ago
            </Typography>
          </div>
        </MenuItem>
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
          <Avatar
            variant="circular"
            alt="natali craig"
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1061&q=80"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              <span className="font-medium text-blue-gray-900">Natali</span>{" "}
              reply to your email
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />a hour ago
            </Typography>
          </div>
        </MenuItem>
        <MenuItem className="flex items-center gap-4 py-2 pr-8 pl-2">
          <Avatar
            variant="circular"
            alt="paypal"
            src="https://dwglogo.com/wp-content/uploads/2016/08/PayPal_Logo_Icon.png"
          />
          <div className="flex flex-col gap-1">
            <Typography variant="small" color="gray" className="font-normal">
              <span className="font-medium text-blue-gray-900">PayPal</span>{" "}
              you&apos;ve received a payment.
            </Typography>
            <Typography
              variant="small"
              className="flex items-center gap-1 text-xs text-gray-600"
            >
              <ClockIcon />5 hours ago
            </Typography>
          </div>
        </MenuItem> */}
        <MenuItem className="flex justify-center"> <h3 className="mr-8 m-auto">Item</h3> <Button className="mr-2 p-2 pb-1.5 pt-1.5" color="green">✔</Button> <Button className="p-2.5 pb-1.5 pt-1.5" color="red"><b>X</b></Button></MenuItem>
        <MenuItem className="flex justify-center"> <h3 className="mr-8 m-auto">Item</h3> <Button className="mr-2 p-2 pb-1.5 pt-1.5" color="green">✔</Button> <Button className="p-2.5 pb-1.5 pt-1.5" color="red"><b>X</b></Button></MenuItem> 
        <MenuItem className="flex justify-center"> <h3 className="mr-8 m-auto">Item</h3> <Button className="mr-2 p-2 pb-1.5 pt-1.5" color="green">✔</Button> <Button className="p-2.5 pb-1.5 pt-1.5" color="red"><b>X</b></Button></MenuItem> 
        <MenuItem className="flex justify-center"> <h3 className="mr-8 m-auto">Item</h3> <Button className="mr-2 p-2 pb-1.5 pt-1.5" color="green">✔</Button> <Button className="p-2.5 pb-1.5 pt-1.5" color="red"><b>X</b></Button></MenuItem>
       
      </MenuList>
    </Menu>
        <Menu>
          <MenuHandler>
            {/* <Avatar
              variant="circular"
              alt="tania andrew"
              className="cursor-pointer"
              src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
            /> */}
            <div className="flex items-center gap-4">
              <Avatar
                src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                alt="avatar"
              />
              <div>
                <Typography variant="h6">Tania Andrew</Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="font-normal"
                >
                  Teacher
                </Typography>
              </div>
            </div>
          </MenuHandler>
          <MenuList>
            <Link to={"/"}>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  About
                </Typography>
              </MenuItem>
            </Link>

            <Link to={"/profile"}>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Profile
                </Typography>
              </MenuItem>
            </Link>
            <Link to={"/dashboard"}>
              <MenuItem className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 3.75H6.912a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H15M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859M12 3v8.25m0 0l-3-3m3 3l3-3"
                  />
                </svg>
                <Typography variant="small" className="font-normal">
                  Dashboard
                </Typography>
              </MenuItem>
            </Link>

            <hr className="my-2 border-blue-gray-50" />
            <MenuItem
              onClick={LogoutHandler}
              className="flex items-center gap-2 "
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
                />
              </svg>
              <Typography variant="small" className="font-normal">
                Sign Out
              </Typography>
            </MenuItem>
          </MenuList>
        </Menu>
      </ul>
    );
  }
}

function NavBar(props) {
  const [openNav, setOpenNav] = useState(false);
  const [navColor, setNavColor] = useState(false);

  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  React.useEffect(() => {
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  window.addEventListener("scroll", () => {
    window.scrollY >= 20 ? setNavColor(true) : setNavColor(false);
  });

  var navList = props.navList; //props to pass into Navlist

  return (
    <div className="navbarDiv ">
      <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
        <div className="flex items-center justify-between text-blue-gray-900 ">
          <Typography
            as="a"
            href="#"
            variant="h6"
            className="mr-4 cursor-pointer py-1.5 text-2xl font-extrabold text-black"
          >
            <Link to="/">SQDL</Link>
          </Typography>{" "}
          <div className="bg-transparent hidden lg:block">
            <NavList navList={navList} />{" "}
          </div>{" "}
          <IconButton
            variant="text"
            className="bg-transparent ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden bg-slate-200"
            ripple={false}
            onClick={() => setOpenNav(!openNav)}
          >
            {openNav ? (
              <XMarkIcon className="h-6 w-6" strokeWidth={2} />
            ) : (
              <Bars3Icon className="h-6 w-6" strokeWidth={2} />
            )}
          </IconButton>
        </div>
        <Collapse open={openNav}>
          <NavList navList={navList} />
        </Collapse>
      </Navbar>
      {/* // <Navbar className="   bg-opacity-0" fluid rounded>
    //   <Navbar.Brand href="/">
    //     <span className="bg-transparent self-center whitespace-nowrap text-xl font-semibold dark:text-white">
    //       SQDL
    //     </span>
    //   </Navbar.Brand>
    //   <div className="flex md:order-2">
    //     <Navbar.Toggle />
    //   </div>
    //   <Navbar.Collapse>
    //     <p>
    //       <NavList navList={navList} />
    //     </div>
    //     <IconButton
    //       variant="text"
    //       className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden bg-slate-200"
    //       ripple={false}
    //       onClick={() => setOpenNav(!openNav)}
    //     >
    //       {openNav ? (
    //         <XMarkIcon className="h-6 w-6" strokeWidth={2} />
    //       ) : (
    //         <Bars3Icon className="h-6 w-6" strokeWidth={2} />
    //       )}
    //     </IconButton>
    //   </div>
    //   <Collapse open={openNav}>
    //     <NavList navList={navList} />
    //   </Collapse>
    // </Navbar> */}
    </div>
  );
}

export default NavBar;
