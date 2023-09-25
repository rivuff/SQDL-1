import React, { useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  IconButton,
  Popover,
  PopoverHandler,
  Button,
  Input,
  PopoverContent,
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { UserState } from "../../context/contextProvider";

import { useNavigate } from "react-router-dom";
import { type, check } from "./../Cookies";

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
      <ul className="mr-8 flex flex-col lg:flex-row lg:items-center lg:gap-20">
        {Object.entries(navList).map(([key, val]) => {
          return (
            <li key={key}>
              <Typography
                as="li"
                variant="small"
                color="blue-gray"
                className="font-medium"
              >
                <Link
                  to={key === "home" ? "/" : key}
                  key={key}
                  className="
                    flex relative items-center pt-4 font-redHatMonoWeight font-redHatMono border-b-0 text-xl hover:animate-line
                    before:content=[''] before:absolute before:bottom-0 before:bg-gray-600 before:h-[2px] before:w-0 hover:before:animate-line
                  "
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
      <ul className="my-4 ml-6 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li>
          <Typography
            as="li"
            variant="small"
            color="blue-gray"
            className="p-1 font-medium "
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
      <ul className="my-2 flex flex-col gap-4 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
        <li>
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
              className=" text-black p-2 rounded-md flex items-center bg-cyan-200 hover:text-blue-500 transition-colors text-lg"
            >
              Dashboard
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
            <Link
              onClick={LogoutHandler}
              className=" text-black p-2 rounded-md flex items-center bg-red-400 hover:bg-red-600 transition-colors text-lg cursor-pointer"
            >
              Log out
            </Link>
          </Typography>
        </li>
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

  window.addEventListener('scroll', () => {
    window.scrollY >= 20 ? setNavColor(true) : setNavColor(false);
  })

  var navList = props.navList; //props to pass into Navlist

  return (
    <nav className={`w-full shadow-transparent mb-4 z-20 transition-all duration-500 ${navColor ? "bg-gray-300 opacity-50" : "bg-transparent"}`}>
      <div className="flex items-center justify-between text-blue-gray-900 ">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="ml-4 cursor-pointer text-black "
        >
          <Link to="/" className="font-montserratWeight font-montserrat text-3xl">SQDL</Link>
        </Typography>

        <div className="hidden lg:block">
          <NavList navList={navList} />
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden bg-slate-200"
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
    </nav>
  );
}

export default NavBar;
