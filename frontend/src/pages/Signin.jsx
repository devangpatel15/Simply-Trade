// import React, { useState } from "react";
// import sideImage from "../assets/Group 18754.png";
// import logo from "../assets/Group 18763.png";
// import "../css/signin.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// const Signin = () => {
//   const [loginDetails, setLoginDetails] = useState({});

//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setLoginDetails((prevValue) => ({
//       ...prevValue,
//       [name]: value,
//     }));
//   };

//   const handleLogin = async () => {
//     try {
//       const response = await axios.post(
//         "http://localhost:3000/api/userLogin",
//         loginDetails,
//         {
//           headers: { "Content-Type": "application/json" },
//         }
//       );

//       if (response.data.token) {
//         localStorage.setItem("token", response.data.token);
//         navigate("/");
//       } else {
//         alert("Login failed");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   };

//   return (
//     <>
//       <div className="signin-container">
//         <div className="login-container">
//           <div className="login-logo">
//             <img src={logo} alt="logo" />
//           </div>
//           <h2 className="login-title">Log in</h2>

//           <input
//             className="login-input"
//             type="email"
//             name="email"
//             value={loginDetails.email}
//             placeholder="Enter Your Email"
//             onChange={(e) => handleChange(e)}
//           />
//           <input
//             className="login-input"
//             type="password"
//             name="password"
//             value={loginDetails.password}
//             placeholder="Enter Your Password"
//             onChange={(e) => handleChange(e)}
//           />
//           <div className="login-checkbox-container">
//             <input className="login-checkbox" type="checkbox" />
//             <h4>Keep me Logged in</h4>
//           </div>
//           <button className="login-btn" type="submit" onClick={handleLogin}>
//             Log In
//           </button>
//         </div>
//         <div className="login-img-container">
//           <img className="login-img" src={sideImage} alt="" />
//         </div>
//       </div>
//     </>
//   );
// };

// export default Signin;

import React from "react";
import { Box, Grid } from "@mui/material";
import sideImage from "../assets/Group 18754.png";
import Logo from "../components/Logo";
import SignupForm from "../components/SignupForm";
import SigninForm from "../components/SignInForm";

const SignInPage = () => {
  return (
    <Box sx={{ flexGrow: 1, height: "100vh" }}>
      <Grid container spacing={2}>
        {/* Left Section: Logo and Signup Form */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <Logo />
          <SigninForm />
        </Grid>

        {/* Right Section: Illustration (Hidden on mobile) */}
        <Grid
          item
          xs={0}
          md={6}
          sx={{
            display: { xs: "none", md: "flex" }, // Hide on xs, show on md and up
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <img
            src={sideImage}
            alt="Illustration"
            style={{
              marginLeft: "5.2rem",
              height: "100vh",
              width: "89%",
            }}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default SignInPage;
