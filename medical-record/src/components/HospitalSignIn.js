import React from "react";
import { useState, useEffect } from "react";
import signUpLogo from "../img/signupLogo.png";
import "../styles/login.css";
import "../styles/signUp.css";
import "../styles/passwordStrength.css";

const HospitalSignIn = () => {
  const type = "login";

  const [loginDetails, setloginDetails] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setloginDetails({ ...loginDetails, [field]: value });
  };
  const loginSubmit = (e) => {
    e.preventDefault();
    console.log("form submitted", loginDetails);
    setloginDetails({ email: "", password: "" });
  };
  return (
    <div id="ini">
      <div id="signupLeftImage">
        <img id="design" src={signUpLogo} alt="signupImage" />
      </div>
      <div className={type === "login" ? "fadeIn" : "fadeOut"} id="loginForm">
        <h2 id="heading2">Login Now</h2>
        <div id="Form1">
          <div id="details1">
          <form onSubmit={loginSubmit} id="d1">
            <label className="label2">Your email*</label>
            <input
              type="email"
              className="inputDetails"
              placeholder="write your email "
              name="email"
              value={loginDetails.email}
              onChange={handleChange}
              id="LoginEmail"
              required
            />
            <label className="label2">Password*</label>
            <input
              className="inputDetails"
              type="password"
              placeholder="password "
              name="password"
              value={loginDetails.password}
              onChange={handleChange}
              required
              id="password"
            />
            {/* <i className="fa fa-eye" aria-hidden="true" id="eyeIcon"></i> */}
            <button type="submit" id="submitbtn1" onSubmit={loginSubmit}>
              Login
            </button>
          </form>
        </div>

        </div>
      </div>
    </div>
  );
};

export default HospitalSignIn;