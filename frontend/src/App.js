import React from "react";
import {
  BrowserRouter as Router,
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./index.scss"
import Home from "./pages/Main/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/User/Login";
import Register from "./pages/User/Register";
// import Update from "./pages/Update";
import Footer from "./components/Footer";
import About from "./pages/Main/About";
import Contact from "./pages/Main/Contact";
import Dashboard from "./pages/Mobile/Dashboard";
import NotFound from "./pages/Main/NotFound";

function Layout() {
  return (
    <>
      <Navbar/>
      <Outlet/>
      <Footer/>
    </>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
        element : <Layout/>,
        children: [
            {path: "/", element: <Home />},
            // {path: "/user/update", element: <Update />},
            {path: "/contact", element: <Contact />},
            {path: "/about", element: <About />},
            {path: "/login", element: <Login />},
            {path: "/register", element: <Register />},
            {path: "/dashboard", element: <Dashboard/>},
            {path : "/*", element: <NotFound/>}
        ],
  },
  
])

function App() {
  return (
    <div className="app">
      <div className="container">
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;