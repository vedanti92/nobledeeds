import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
