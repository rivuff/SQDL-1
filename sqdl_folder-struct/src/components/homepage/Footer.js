import { Typography } from "@material-tailwind/react";
import "./Footer.css";
export default function Footer() {
  return (
    <footer className="footerDiv w-full bg-blue-600 border-solid border-2 text-white p-8 bottom-0">
      <div className=" flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12  text-black text-center md:justify-between">
        <img
          src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/1200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png"
          className="w-14"
        />

        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Contact
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="white"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500"
            >
              Github
            </Typography>
          </li>
        </ul>
      </div>
      {/* <hr className="my-8 border-blue-gray-50" /> */}
      <Typography color="white" className="copyright text-center font-normal">
        &copy; Education Technology Department, Indian Institute of Technology,
        Bombay, 2023
      </Typography>
    </footer>
  );
}
