import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    username: "",
    password: "",
  });

  const { email, username, password } = inputValue;

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleError = (err) =>
    toast.error(err, {
      position: "bottom-left",
    });

  const handleSuccess = (msg) =>
    toast.success(msg, {
      position: "bottom-right",
    });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:8080/signup",
        {
          ...inputValue,
        },
        { withCredentials: true }
      );

      const { success, message } = data;
      if (success) {
        handleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        handleError(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      email: "",
      username: "",
      password: "",
    });
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit}>
        <div className="signup-heading">
          <p>SIGNUP</p>
        </div>
        <br />
        <div>
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="signup-input"
            type="email"
            name="email"
            id="email"
            value={email}
            onChange={handleOnChange}
          />
        </div>
        <br />
        <div>
          <label htmlFor="username">Username</label>
          <br />
          <input
            className="signup-input"
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
            className="signup-input"
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={handleOnChange}
          />
        </div>
        <br />
        <button type="submit" className="signup-button">
          SIGNUP
        </button>
        <br />
        <div className="mt-1" style={{ textAlign: "center" }}>
          Already have an account?{" "}
          <Link
            style={{
              textDecoration: "none",
              color: "#6cd4ff",
              fontWeight: "500",
            }}
            to={"/login"}
          >
            Login
          </Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
