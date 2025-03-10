import React, { use } from 'react'
import "../css/signup.css"
import { useNavigate } from 'react-router-dom'
import sideImage from '../assets/Group 18754.png'
import logo from '../assets/Group 18763.png'

const Signup = () => {

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        navigate('/signin');
    }


  return (
    <>
    <div className='signup-container'>
     <div className='container'>
        <img src={logo} alt="" />
        <h2 className='title'>Sign Up | Register</h2>
        <p className='p'>Welcome create new account</p>
        <input className='input' type='text' placeholder='Enter Your Name' />
        <input className='input' type='email' placeholder='Enter Your Email' />
        <input className='input' type='text' placeholder='Enter Your Mobile No' />
        <input className='input' type='text' placeholder='Enter Your Password' />
        <input className='input' type='text' placeholder='Enter Your Confirm Password' />
        <div className='checkbox-container'>
            <input className='checkbox' type='checkbox' />
            <h4>Keep me Logged in</h4>
        </div>
        <button className='btn' type='submit' onClick={handleSubmit}>Sign Up</button>
        <h4 className='login'>Already have an account? <a href='/login'>Login</a></h4>
    </div> 
        <div className='img-container'>
            <img className='img' src={sideImage} alt="" />
        </div>
    </div>
    </>
  )
}

export default Signup
