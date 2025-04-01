import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "./Login.css";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    password: "",
  });
  const { login } = useContext(AuthContext);

  const { username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(username, password);
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
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
            value={username}
            onChange={handleOnChange}
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
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <br />
        <button type="submit" className="login-button">
          LOGIN
        </button>
        <br />
        <div className="mt-1" style={{ textAlign: "center" }}>
          Don't have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#6cd4ff",
              fontWeight: "500",
            }}
            to={"/signup"}
          >
            Signup
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
