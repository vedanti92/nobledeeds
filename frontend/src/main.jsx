import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";

// Configure axios defaults
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "https://nobledeeds-backend.onrender.com";

// Add request interceptor to ensure credentials are always sent
axios.interceptors.request.use(
  (config) => {
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle common errors
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
