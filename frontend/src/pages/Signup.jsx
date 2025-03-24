import React from "react";
import "./Signup.css";

const Signup = () => {
  return (
    <div className="container">
      <form>
        <div className="heading">
          <p>SIGNUP</p>
        </div>
        <br />
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input type="email" name="email" id="email" />
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input type="text" name="username" id="username" />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input type="password" name="password" id="password" />
        </div>
        <br />
        <button>SIGNUP</button>
      </form>
    </div>
  );
};

export default Signup;
