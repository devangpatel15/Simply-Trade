import React, { useState } from "react";
import "../css/signup.css";
import { useNavigate } from "react-router-dom";
import sideImage from "../assets/Group 18754.png";
import logo from "../assets/Group 18763.png";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [signUpData, setSignUpData] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setSignUpData((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/userSignIn",
        signUpData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      alert(response.data.message);
      navigate("/signIn");
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="signup-container">
        <div className="container">
          <img src={logo} alt="" />
          <h2 className="title">Sign Up | Register</h2>
          <p className="p">Welcome create new account</p>
          <input
            className="input"
            name="name"
            value={signUpData.name}
            type="text"
            placeholder="Enter Your Name"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="input"
            name="email"
            value={signUpData.email}
            type="email"
            placeholder="Enter Your Email"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="input"
            name="mobileNo"
            value={signUpData.mobileNo}
            type="text"
            placeholder="Enter Your Mobile No"
            onChange={(e) => handleChange(e)}
          />
          <input
            className="input"
            name="password"
            value={signUpData.password}
            type="text"
            placeholder="Enter Your Password"
            onChange={(e) => handleChange(e)}
          />
          {/* <input
            className="input"
            type="text"
            placeholder="Enter Your Confirm Password"
          /> */}
          <div className="checkbox-container">
            <input className="checkbox" type="checkbox" />
            <h4>Keep me Logged in</h4>
          </div>
          <button className="btn" type="submit" onClick={handleSubmit}>
            Sign Up
          </button>
          <h4 className="login">
            Already have an account? <a href="/login">Login</a>
          </h4>
        </div>
        <div className="img-container">
          <img className="img" src={sideImage} alt="" />
        </div>
      </div>
    </>
  );
};

export default Signup;
