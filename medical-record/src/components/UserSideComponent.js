import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";


import "../styles/userProfile.css";

import defaultDp from "../img/profile.png";
import AppointmentImage from "../img/appointment.png";
import progressImage from "../img/progress.png";
import messageImage from "../img/message.png";
import doctorIcon from "../img/doctor-icon.png";
import settingsImage from "../img/Settings.png";
import diseaseImage from "../img/disease.png";
import UserMiddleComponent from "./UserMiddleComponent";
import DiseaseContent from "./DiseaseContent";

import { FaTimes } from "react-icons/fa";

import "../styles/modal.css";

import { useGlobalContext } from "../context/Context";
import axios from "axios";
axios.defaults.withCredentials=true

const baseUrl = "http://localhost:8080/user";

const UserSideComponent = () => {
  const pathname = useLocation().pathname;
  const [path, setPath] = useState("");

  const {Alert,alert,setAlert,showAlert,userToken}=useGlobalContext()
  const history=useHistory()

  const tmp_token=useState(userToken)

  const [isShowDropDown, setIsShowDropDown] = useState(false);

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  useEffect(() => {
    document.getElementById("mySidenavTab").style.width =
      sessionStorage.sideNavBar;
    document.getElementById("mySidenav").style.width =
      sessionStorage.sideNavBar;
  }, []);

  const closeNavTab = () => {
    // console.log("close nav tab");
    document.getElementById("mySidenavTab").style.width = "0px";
    sessionStorage.sideNavBar = "0px";
  };

  const openNavTab = () => {
    // console.log('open sidenav')
    document.getElementById("mySidenavTab").style.width = "250px";
    sessionStorage.sideNavBar = "250px";
  };

  const openSideNav = () => {
    document.getElementById("mySidenav").style.width = "250px";
    sessionStorage.sideNavBar = "250px";
  };

  const closeSideNav = () => {
    document.getElementById("mySidenav").style.width = "0px";
    sessionStorage.sideNavBar = "0px";
  };

  const myFunctionMobile = () => {
    console.log("switch drop down");
    document.getElementById("myDropdown").classList.toggle("show");
  };

  document.body.onclick = function (event) {
    if (!event.target.matches(".dropbtn")) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
          openDropdown.classList.remove("show");
        }
      }
    }
  };

  useEffect(()=>{
    axios.get(`${baseUrl}/login`).then((res)=>{
      const error=res.data;
      console.log('error',error)
      if(error.show===true)
      {
        showAlert(true,error.type,error.msg)
        return history.push('/user/login')
      }
    })
  },[])


  //profile details from backend
 
  useEffect(()=>{
    axios.get('http://localhost:8080/user/profile',{withCredentials:true}).then((res)=>{
      console.log('user details at frontend',res.data)
    })
  },[])

  // console.log(path)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${
          modalIsOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="add-diseases-modal-container">
          <form
            className="form-group"
            // id="open-modal"
            enctype="multipart/form-data"
          >
            <div className="mod">
              <button
                href="#"
                title="Close"
                className="link-2"
                onClick={() => setModalIsOpen(false)}
              ></button>
              <h1 className="modal__title">Add Diseases</h1>
              <div>
                {/* <label className="form__name" htmlFor="userName">
                  Disease Name
                </label> */}
                <label htmlFor="name" className="lb">
                  Disease Name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  placeholder="Disease Name"
                  required=""
                />
                <br />
                <br />
              </div>
              <div>
                <br />

                <input type="file" id="actual-btn" hidden />
                <label htmlFor="actual-btn" className="lb1">
                  Add medicine
                </label>
                <span id="file-chosen">No file chosen</span>
              </div>
              <div>
                <br />

                <input type="file" id="actual-btn" hidden />
                <label htmlFor="actual-btn" className="lb2">
                  Add presciptions
                </label>
                <span id="file-chosen">No file chosen</span>
                {/* <span>
                  <span class="form__med">
                    Add Medicine... <input type="file" id="profilePic" />
                    <br />
                    <br />
                  </span>
                </span> */}
              </div>
              <button className="accept" type="save">
                Save &rarr;<i className="uil uil-expand-arrows"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className={alert.show ? "top-alert" : ""}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      </div>
      <div className="desktop-view">
        <div className="container-fluid profile-body">
          <div className="row">
            <div
              className="col-lg-2 col-sm-4 col-12 order-3 order-sm-1"
              id="pSec1"
            >
              <div id="leftPanel">
                <div
                  className={
                    path === "/user/profile" ? "lists active-list" : "lists"
                  }
                >
                  <a href="/user/profile">Profile</a>
                  <img src={defaultDp} className="Icons Icons-invert" />
                </div>
                <div
                  className={
                    path === "/user/disease"
                      ? "lists active-list dropdown"
                      : "lists dropdown"
                  }
                >
                  <a
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Diseases
                  </a>
                  <img src={diseaseImage} className="Icons" />
                  <div
                    id="myDropdown"
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenuLink"
                  >
                    <a className="dropdown-item">
                      <button
                        className="dropdown-item"
                        onClick={() => setModalIsOpen(true)}
                      >
                        Add New
                      </button>
                    </a>
                  </div>
                </div>

                <div className="lists">
                  <a href="#">Appointments</a>
                  <img src={AppointmentImage} className="Icons" />
                </div>
                <div className="lists">
                  <a href="#">Progress Report</a>
                  <img src={progressImage} className="Icons" />
                </div>
                <div className="lists">
                  <a href="#">Message</a>
                  <img src={messageImage} className="Icons" />
                </div>
                <div className="hospital-list">
                  <div className="Doctor-list">
                    <div id="mySidenavTab" className="sidenav">
                      <div id="Dr">
                        <p className="sidenavHeader">Hospitals</p>
                        <a
                          className="closebtn"
                          onClick={() => {
                            closeNavTab();
                          }}
                        >
                          <i
                            className="fa fa-angle-left sideNav "
                            aria-hidden="true"
                          ></i>
                        </a>
                      </div>
                      <form id="hospital-search" className="sidenav-form">
                        <input
                          type="text"
                          placeholder="Search..."
                          className="mobile-preview shadow floating-animate"
                          name="hnam"
                          id="id_search"
                        />
                        <button id="id_search_button">click</button>
                      </form>
                    </div>
                    <div id="Drs">
                      <button
                        className={
                          path === "/user/userHospital"
                            ? "sideNavButton lists active-list"
                            : "sideNavButton lists"
                        }
                        onClick={() => openNavTab()}
                      >
                        <a>Hospitals</a>
                        <img src={doctorIcon} className="Icons Icons-invert" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="lists">
                  <a href="#">Settings</a>
                  <img src={settingsImage} className="Icons" />
                </div>
              </div>
            </div>
            {path === "/user/profile" ? <UserMiddleComponent /> : ""}
            {path === "/user/disease" ? <DiseaseContent /> : ""}
            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="Dr">
                <a>Doctors </a>
                <img src={doctorIcon} className="Icons doctor-icon" />
              </div>
              <form
                method="POST"
                action="/user/hospitalSearch"
                id="search-form"
              >
                <input
                  type="text"
                  placeholder="Search..."
                  className="mobile-preview shadow floating-animate"
                  id="id_search1"
                />
                <button id="id_search_button1">click</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <div className="container-fluid profile-body">
          <div className="row">
            <div
              className="col-lg-2 col-sm-4 col-12 order-3 order-sm-1"
              id="pSec1"
            >
              <div id="leftPanel">
                <div className="lists active-list">
                  <a href="/user/profile">Profile</a>
                  <img src={defaultDp} className="Icons profile-icon" />
                </div>

                <div className="lists dropdown">
                  <a
                    href="#"
                    role="button"
                    id="dropdownMenuLink"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                    onClick={() => {
                      myFunctionMobile();
                    }}
                  >
                    Diseases
                  </a>
                  <img src={diseaseImage} className="Icons" />
                  <div
                    id="myDropdownMobile"
                    className={
                      isShowDropDown ? "dropdown-menu show" : "dropdown-menu"
                    }
                    aria-labelledby="dropdownMenuLink"
                  >
                    <button className="dropdown-item">
                      <button
                        className="dropdown-item"
                        onClick={() => setModalIsOpen(true)}
                      >
                        Add New
                      </button>
                    </button>
                  </div>
                </div>

                <div className="lists">
                  <a href="#">Appointments</a>
                  <img src={AppointmentImage} className="Icons" />
                </div>

                <div className="lists">
                  <a href="#">Progress Report</a>
                  <img src={progressImage} className="Icons" />
                </div>

                <div className="lists">
                  <a href="#">Message</a>
                  <img src={messageImage} className="Icons" />
                </div>

                <div className="lists">
                  <a href="#">Settings</a>
                  <img src={settingsImage} className="Icons" />
                </div>
              </div>
            </div>
            {path === "/user/profile" ? <UserMiddleComponent /> : ""}
            {path === "/user/disease" ? <DiseaseContent /> : ""}

            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="mySidenav" className="sidenav">
                <div id="Dr">
                  <p className="sidenavHeader">Hospitals</p>
                  <a
                    className="closebtn"
                    onClick={() => {
                      closeSideNav();
                    }}
                  >
                    <i
                      className="fa fa-angle-left sideNav "
                      aria-hidden="true"
                    ></i>
                  </a>
                </div>
              </div>
              <div id="Dr-sec3">
                <button
                  className="sideNavButton"
                  onClick={() => {
                    openSideNav();
                  }}
                >
                  <a>Hospitals</a>
                  <img src={doctorIcon} className="Icons doctor-icon" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideComponent;
