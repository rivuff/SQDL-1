import "./App.css";
import { Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/homepage/NavBar.jsx";
import Provide from "./components/homepage/Provide";
import Counter from "./components/homepage/Counter";
import Footer from "./components/homepage/Footer.js";
import Homepage from "./components/homepage/Homepage";
import SQDLCarousel from "./components/homepage/Carousel.js";
import Login from "./components/lr/Pane.js";
import Login from "./components/lr/Login.js";
import Register from "./components/lr/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const appLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      {/* <Provide />
      <Counter /> */}
      <Footer />
    </div>
  );
};

const App = createBrowserRouter([
  {
    path: "/",
    element: <appLayout />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default App;
