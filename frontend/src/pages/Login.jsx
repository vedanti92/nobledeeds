import React from "react";
import "./Login.css";

const Login = () => {
  return (
    <div className="login-container">
      <form>
        <div className="login-heading">
          <p>LOGIN</p>
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="login-input"
            type="text"
            name="username"
            id="username"
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="login-input"
            type="password"
            name="password"
            id="password"
          />
        </div>
        <br />
        <button className="login-button">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
