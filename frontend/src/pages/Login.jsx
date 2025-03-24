import React from "react";

const Login = () => {
  return (
    <div className="container">
      <form>
        <div className="heading">
          <p>LOGIN</p>
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
        <button>LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
