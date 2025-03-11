import React from "react";
import sideImage from '../assets/Group 18754.png'
import logo from "../assets/Group 18763.png";
import "../css/signin.css"

const Signin = () => {

  return (
    <>
       <div className='signin-container'>
           <div className='login-container'>
        <div className="login-logo">
              <img  src={logo} alt="" />
        </div>
              <h2 className='login-title'>Log in</h2>
    
              <input className='login-input' type='email' placeholder='Enter Your Email' />
              <input className='login-input' type='email' placeholder='Enter Your Password' />
              <div className='login-checkbox-container'>
                  <input className='login-checkbox' type='checkbox' />
                  <h4>Keep me Logged in</h4>
              </div>
              <button className='login-btn' type='submit' >Log In</button>
          </div> 
              <div className='login-img-container'>
                  <img className='login-img' src={sideImage} alt="" />
              </div>
          </div>
    </>
  );
};  

export default Signin;
