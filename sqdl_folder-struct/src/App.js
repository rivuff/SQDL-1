import "./App.css";
import { Outlet } from "react-router-dom";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NavBar from "./components/homepage/NavBar.jsx";
import Footer from "./components/homepage/Footer.js";
import SQDLCarousel from "./components/homepage/Carousel.js";
import Login from "./components/lr/Pane.js";
import Login from "./components/lr/Login.js";

const appLayout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
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
        element: <SQDLCarousel />,
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default App;
