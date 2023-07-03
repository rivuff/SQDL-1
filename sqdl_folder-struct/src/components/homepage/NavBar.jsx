import React, { useEffect } from "react";
import {
    Navbar,
    Collapse,
    Typography,
    IconButton,
    Popover,
    PopoverHandler,
    Button,
    Input,
    PopoverContent
} from "@material-tailwind/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from 'react-router-dom';
import {UserState} from '../../context/contextProvider'

import { useNavigate } from "react-router-dom";
import { type, check } from './../Cookies'




function NavList(props) {
    var navList = props.navList;
    const navigate = useNavigate();

    const LogoutHandler = ()=>{      
        localStorage.removeItem('userInfo');
        navigate('/');
    }


    if (check() == null) {
        // Render navigation list for non-logged-in users
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                {
                    Object.entries(navList).map(([key, val]) => {
                        return (
                            <li key={key}>
                                <Typography
                                    as="li"
                                    variant="small"
                                    color="blue-gray"
                                    className="p-1 font-medium "
                                >
                                    <Link to={key} key={key} className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg">
                                        {val}
                                    </Link>
                                </Typography>
                            </li>
                        );
                    })
                }
            </ul>
        )
      } else if (check().type === 'student') {
        // Render navigation list for student users
        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium "
                    >
                        <Link to={'/'} className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg">
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
                            <Link to={'/profile'} className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg">
                                Profile
                            </Link>
                       
                        </Typography>
                    </li>
                 <li >
                        <Typography
                            as="li"
                            variant="small"
                            color="red"
                            className="p-1 font-medium "
                        >
                        <li
                        className="text-black p-2 rounded-md flex items-center bg-red-400 hover:bg-red-600 transition-colors text-lg"
                        onClick={LogoutHandler}
                      >
                        Log out
                      </li>
                        </Typography>
                 </li>
            </ul>
        )

      } else {

        return (
            <ul className="my-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
                <li>
                    <Typography
                        as="li"
                        variant="small"
                        color="blue-gray"
                        className="p-1 font-medium "
                    >
                        <Link to={'/'} className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg">
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
                            <Link to={'/profile'} className=" text-black flex items-center hover:text-blue-500 transition-colors text-lg">
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
                            <Link to={'/dashboard'} className=" text-black p-2 rounded-md flex items-center bg-cyan-200 hover:text-blue-500 transition-colors text-lg">
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
                            <Link onClick={LogoutHandler} className=" text-black p-2 rounded-md flex items-center bg-red-400 hover:bg-red-600 transition-colors text-lg">
                                Log out
                            </Link>
                        </Typography>
                 </li>
            </ul>
        )
      }
    }



function NavBar(props) {
    const [openNav, setOpenNav] = React.useState(false);


    const handleWindowResize = () =>
        window.innerWidth >= 960 && setOpenNav(false);

    React.useEffect(() => {
        window.addEventListener("resize", handleWindowResize);

        return () => {
            window.removeEventListener("resize", handleWindowResize);
        };
    }, []);

    var navList = props.navList //props to pass into Navlist


    return (
        <Navbar className="mx-auto max-w-screen-xl px-6 py-3">
            <div className="flex items-center justify-between text-blue-gray-900 ">
                <Typography
                    as="a"
                    href="#"
                    variant="h6"
                    className="mr-4 cursor-pointer py-1.5 text-2xl font-extrabold text-black"
                ><Link to="/">
                SQDL
                </Link>
                    
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
                <NavList navList= {navList}/>
            </Collapse>
        </Navbar>
    );
}

export default NavBar