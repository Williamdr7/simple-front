import "./App.scss";
import React from "react";
import Routes from "./Routes";
import { ToastContainer } from "react-toastify";
import "react-pro-sidebar/dist/css/styles.css";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "react-toastify/dist/ReactToastify.css";

const App = () => (
  <>
    <ToastContainer />
    <Routes />
  </>
);

export default App;
