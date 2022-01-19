import React from "react";
import { useState, useEffect } from "react";
import signUpLogo from "../img/signupLogo.png";
import "../styles/login.css";
import "../styles/signUp.css";
import "../styles/passwordStrength.css";
import "../styles/alert.css"
import axios from 'axios'

import { useGlobalContext } from "../context/Context";
import { useHistory } from "react-router-dom";


const baseUrl='http://localhost:8080/hospital'


const UserSignIn = () => {
  const type = "login";

  const [loginDetails, setloginDetails] = useState({ email: "", password: "" });
  const {alert,Alert,showAlert,setAlert,userToken,setUserToken}= useGlobalContext()

   const history=useHistory()

   useEffect(()=>{
     axios.get(`${baseUrl}/login`).then((res)=>{
      //  console.log(res.data)
      const error=res.data
      if(error.show===false)
      {
        showAlert(true,error.type,error.msg)
        return history.push('/hospital/profile')
      }
     }).catch((e)=>{console.log(e)})
   },[])

  const handleChange = (e) => {
    const value = e.target.value;
    const field = e.target.name;
    setloginDetails({ ...loginDetails, [field]: value });
  };
  const loginSubmit =async (e) => {
    e.preventDefault();
    console.log("form submitted", loginDetails);
    const response=await axios.post(`${baseUrl}/login`,loginDetails)
    console.log(response.data)
    const error=response.data
    if(error.show===true)
    {
      return showAlert(error.show,error.type,error.msg)
    }
    setloginDetails({ email: "", password: "" });
    showAlert(true,error.type,error.msg)
    history.push('/hospital/profile')
  };
  return (
     <>
    <div className={alert.show?'top-alert':''}>
    {alert.show && <Alert {...alert} removeAlert={showAlert} />}
    </div>
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
        <div class="signuplink-section">
          <p id="signUpopt">Don't have an account?</p>
        <a href="/hospital/signup" className="toggle" id="signUpLink" style={{textDecoration:'none !important'}}>Create account</a>
        </div> 

        </div>
      </div>
    </div>
    </>
  );
};

export default UserSignIn;