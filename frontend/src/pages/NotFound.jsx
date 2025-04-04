import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  return (
    <div className="notfound-container">
      <h1>Oops!</h1>
      <p className="fs-5 mt-3">The page you're looking for does not exist!</p>
      <Link to="/">
        <button className="goback mt-5">Go back to Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
