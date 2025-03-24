import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="container">
      <h2>Signup</h2>
      <br />
      <form>
        <div>
          <label className="form-label" htmlFor="email">
            Email
          </label>
          <input
            className="form-control"
            type="email"
            placeholder="Enter your email."
            name="email"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="username">
            Username
          </label>
          <input
            className="form-control"
            type="text"
            placeholder="Enter your username."
            name="username"
          />
        </div>
        <div>
          <label className="form-label" htmlFor="password">
            Password
          </label>
          <input
            className="form-control"
            type="password"
            placeholder="Enter your password."
            name="password"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
