import React, { useState } from "react";
import sideImage from "../assets/Group 18754.png";
import logo from "../assets/Group 18763.png";
import "../css/signin.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signin = () => {
  const [loginDetails, setLoginDetails] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginDetails((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/userLogin",
        loginDetails,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="signin-container">
        <div className="login-container">
          <div className="login-logo">
            <img src={logo} alt="logo" />
          </div>
          <h2 className="login-title">Log in</h2>

          <input
            className="login-input"
            type="email"
            name="email"
            value={loginDetails.email}
            placeholder="Enter Your Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="login-input"
            type="password"
            name="password"
            value={loginDetails.password}
            placeholder="Enter Your Password"
            onChange={(e) => handleChange(e)}
          />
          <div className="login-checkbox-container">
            <input className="login-checkbox" type="checkbox" />
            <h4>Keep me Logged in</h4>
          </div>
          <button className="login-btn" type="submit" onClick={handleLogin}>
            Log In
          </button>
        </div>
        <div className="login-img-container">
          <img className="login-img" src={sideImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default Signin;
