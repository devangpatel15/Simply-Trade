// import React from "react";
// import logo from "../assets/Group 18763.png";
// import sideImage from "../assets/Group 18754.png";
// import OtpInput from "react-otp-input";
// import "../css/Opt.css";

// const Otp = () => {
//   const [otp, setOtp] = React.useState("");

//   return (
//     <div>
//       <div className="opt-container">
//         <div className="o-container">
//           <div className="opt-logo">
//             <img src={logo} alt="" />
//           </div>
//           <h2 className="opt-title">ENTER OTP</h2>
//           <div className="otp-input-container">

//           <OtpInput
//             value={otp}
//             onChange={setOtp}
//             numInputs={6}
//             renderSeparator={<span style={{margin : "0 8px " , }}> </span>}
//             renderInput={(props) => <input style={{padding : "20px"}}{...props} />}
//           />

//           </div>
//           <button className="opt-btn" type="submit">
//             Verify
//           </button>
//         </div>
//         <div className="opt-img-container">
//           <img className="opt-img" src={sideImage} alt="" />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Otp;
