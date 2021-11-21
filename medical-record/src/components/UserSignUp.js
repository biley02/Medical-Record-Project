import React, { useEffect, useState } from "react";
import "../styles/login.css";
import "../styles/signUp.css";
import "../styles/passwordStrength.css";
import "../styles/alert.css"

import signUpLogo from "../img/signupLogo.png";
import axios from "axios";
import { Redirect } from "react-router";
import {useHistory} from 'react-router-dom'

import { useGlobalContext } from "../context/Context";


const baseUrl='http://localhost:8080/user'
const type = "signup";
const UserSignUp = () => {
  const [userSignUpDetails, setUserSignUpDetails] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  });

  const {alert,Alert,showAlert}= useGlobalContext()


  let history=useHistory()

 

  useEffect(()=>{
    axios.get(`${baseUrl}/login`).then((res)=>{
     //  console.log(res.data)
     const error=res.data
     if(error.show===false)
     {
       showAlert(true,error.type,error.msg)
       return history.push('/user/profile')
     }
    }).catch((e)=>{console.log(e)})
  },[])

  

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUserSignUpDetails({ ...userSignUpDetails, [name]: value });
  };
  const signupSubmit = async (e) => {
    e.preventDefault();
    // console.log("form submitted", userSignUpDetails);

    // await axios.post(`${baseUrl}/signup`,{userSignUpDetails})
    
    axios
      .post(`${baseUrl}/signup`,userSignUpDetails)
      .then((response) => {
        console.log('from server data',response.data)
        const error=response.data;
        // console.log(error)
        if(error.show===true)
        {
          console.log('danger error',error)
          showAlert(true,error.type,error.msg)
          return
        }
    
        showAlert(true,'success',error.msg)
        history.push('/user/login') 

      }).catch((error)=>{console.log(error)});
    
    setUserSignUpDetails({
      name: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    });

    
  };
  
  return (
    <>
    <div className={alert.show?'top-alert':''}>
      {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      </div>
    <div id="signup">
      <div id="signupLeftImage">
        <img id="design" src={signUpLogo} alt="signupImage" />
      </div>
      <div className={type === "signup" ? "fadeIn" : "fadeOut"} id="signUpForm">
        <h2 id="heading">Register Your Account!</h2>
        <div id="Form">
          <div id="details">
            <form onSubmit={signupSubmit}>
              <label className="label1" htmlFor="name">
                Name*
              </label>
              <br />
              <input
                className="inputDetails"
                id="SignUpName"
                type="text"
                placeholder="Write your name "
                name="name"
                value={userSignUpDetails.name}
                onChange={handleChange}
                required
              ></input>
              <br />
              <label className="label1" htmlFor="email">
                Email*
              </label>
              <br />
              <input
                className="inputDetails"
                id="SignUpEmail"
                type="text"
                placeholder="Write your email "
                name="email"
                value={userSignUpDetails.email}
                onChange={handleChange}
                required
              ></input>
              <br />
              <label className="label1" htmlFor="phoneNumber">
                Phone Number*
              </label>
              <br />
              <input
                className="inputDetails"
                id="SignUpPhone"
                type="tel"
                placeholder="Your Phone Number "
                name="phoneNumber"
                value={userSignUpDetails.phoneNumber}
                onChange={handleChange}
                required
              ></input>
              <br />
              <label className="label1" htmlFor="password">
                Password*
              </label>
              <br />
              <input
                className="inputDetails"
                id="SignUpPass"
                type="password"
                placeholder="Create password "
                name="password"
                value={userSignUpDetails.password}
                onChange={handleChange}
                required
              ></input>
              <br />
              {/* <i className="fa fa-eye" aria-hidden="true" id="eyeIcon"></i><i id="info" className="fa fa-info-circle" aria-hidden="true"><span id="infoText">Your password must contain 8 letters,1 uppercase characters, 1 number, 1 special character.</span></i><br/> */}
              {/* <div id="reasons" className="reasons"></div> */}

              <label className="label1" htmlFor="confirmPassword">
                Confirm Password*
              </label>
              <br />
              <input
                className="inputDetails"
                id="SignUppass"
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={userSignUpDetails.confirmPassword}
                onChange={handleChange}
                required
              ></input>
              <br />
              {/* <i className="fa fa-eye" aria-hidden="true" id="eyeIcon"></i><i id="info" className="fa fa-info-circle" aria-hidden="true"><span id="infoText">Your password must contain 8 letters,1 uppercase characters, 1 number, 1 special character.</span></i><br/>
                        <div id="reasons" className="reasons"></div> */}
              <div>
                <input type="checkbox" id="terms" required />
                <label for="terms" id="terms1">
                  {" "}
                  I agree to{" "}
                  <a href="" id="termLink">
                    terms & conditions
                  </a>
                </label>
              </div>
              <button
                type="submit"
                id="submitbtn"
                className="register"
                onSubmit={signupSubmit}
              >
                Register
              </button>
              <div class="loginlink-section">
                <p id="login">Already have an account?</p>
    	          <a href="/user/login" className="toggle" id="loginLink" style={{textDecoration:'none !important'}}>Login</a>
              </div>
            </form>
          </div>
        </div>
        
      </div>
    </div>
    </>
  );
};

export default UserSignUp;
