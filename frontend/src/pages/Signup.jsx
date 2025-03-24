import React from "react";

const Signup = () => {
  return (
    <div className="container">
      <h2>Signup</h2>
      <form>
        <div>
          <label className="form-label" htmlFor="email">Email</label>
          <input className="form-control" type="email" placeholder="abc@gmail.com" name="email" />
        </div>
        <div>
          <label className="form-label" htmlFor="username">Username</label>
          <input className="form-control" type="text" placeholder="Username" name="username" />
        </div>
        <div>
          <label className="form-label" htmlFor="password">Password</label>
          <input className="form-control" type="password" placeholder="********" name="password" />
        </div>
      </form>
    </div>
  );
};

export default Signup;
