import { Carousel, Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

export default function SQDLCarousel() {
  return (
    <Carousel className="rounded-xl">
      <div className="relative h-full w-full">
        <img
          src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
          alt="image 1"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 grid h-full w-full place-items-center bg-black/75">
          <div className="w-3/4 text-center md:w-2/4">
            <Typography
              variant="h1"
              color="white"
              className="mb-4 text-3xl md:text-4xl lg:text-5xl font-semibold"
            >
              Student Query Driven Learning
            </Typography>
            <Typography
              variant="lead"
              color="white"
              className="mb-12 opacity-80 text-white"
            >
              This SQDL App has been designed to enable some degree of
              self-directed learning in classroom environments
            </Typography>
            <div className="flex justify-center gap-6">
              <Link to="/login">
                <Button color="white" variant="text">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button color="white" variant="text">
                  Register
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Carousel>
  );
}
