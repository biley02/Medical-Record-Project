import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import "../hospitalStyles/profile.css";

import defaultDp from "../img/profile.png";
import AppointmentImage from "../img/appointment.png";
import progressImage from "../img/progress.png";
import messageImage from "../img/message.png";
import doctorIcon from "../img/doctor-icon.png";
import ProfilePic from "../img/ProfilePic.png";
import settingsImage from "../img/Settings.png";
import diseaseImage from "../img/disease.png";
import UserMiddleComponent from "./profileMiddle";
import SideLoader from "../LoaderComponents/SideLoader";
import Loader from "../LoaderComponents/Loader";
import { FaTimes } from "react-icons/fa";

import "../styles/modal.css";
import "../styles/loader.css";

import { useGlobalContext } from "../context/Context";
import axios from "axios";
import HospitalPatient from "./HospitalPatient";
import HospitalDiseaseContent from "./HospitalDisease";
axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:8080/hospital";

const UserSideComponent = () => {
  const pathname = useLocation().pathname;
  const [path, setPath] = useState("");
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [sideLoader, setSideLoader] = useState(false);
  const [isShowDropDown, setIsShowDropDown] = useState(false);
  const [patient, setPatient] = useState("");
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [foundUser, setFoundUser] = useState({});
  const [access, setAccess] = useState([]);

  const { Alert, alert, setAlert, showAlert, userToken } = useGlobalContext();
  const history = useHistory();

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  useEffect(() => {
    if (!document.getElementById("mySidenavTab")) return;
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

  useEffect(() => {
    axios.get(`${baseUrl}/login`).then((res) => {
      const error = res.data;
      console.log("error", error);
      if (error.show === true) {
        showAlert(true, error.type, error.msg);
        return history.push("/hospital/login");
      }
    });
  }, []);

  //profile details from backend

  useEffect(() => {
    setIsLoading(true);
    console.log("found user", foundUser);
    axios.get(`${baseUrl}/profile`, { withCredentials: true }).then((res) => {
      console.log("data from backedn", res.data);
      setUser(res.data);
      setIsLoading(false);
    });
  }, []);

  // console.log(path)

  const requestPatient = (short_id) => {
    console.log("id", short_id);
    axios
      .post(`${baseUrl}/relation`, {
        shortId: short_id,
      })
      .then((res) => {
        console.log("details from backend", res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const searchPatient = (e) => {
    e.preventDefault();
    setSideLoader(true);
    setPatient("");
    // console.log("short id patient",patient)
    axios.post(`${baseUrl}/search`, { short_id: patient }).then((res) => {
      console.log("data from backend", res.data);
      const user = res.data.result;

      const access = res.data.access;
      const msg = res.data.error_msg;
      showAlert(true, msg.type, msg.msg);
      setFoundUser(user);
      if (access) setAccess(access);
      setSideLoader(false);
    });
  };

  const getPatient = (shortId) => {
    console.log("get patient", shortId);
    axios.post(`${baseUrl}/patient`, { shortId: shortId }).then((res) => {
      console.log("patient details from backend", res.data);
      history.push("/hospital/patient");
    });
  };

  return (
    <>
      <div className={alert.show ? "top-alert" : ""}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
      </div>

      <div className="desktop-view">
        <div className="container-fluid profile-body">
          <div className="row">
            {isLoading ? <Loader /> : ""}
            <div
              className="col-lg-2 col-sm-4 col-12 order-3 order-sm-1"
              id="pSec1"
            >
              <div id="leftPanel">
                <div
                  className={
                    path === "/hospital/profile" ? "lists active-list" : "lists"
                  }
                >
                  <a href="/hospital/profile">Profile</a>
                  <img src={defaultDp} className="Icons Icons-invert" />
                </div>

                <div className="lists">
                  <a href="#">Appointments</a>
                  <img src={AppointmentImage} className="Icons" />
                </div>
                <div className="lists">
                  <a href="#">Message</a>
                  <img src={messageImage} className="Icons" />
                </div>
                <div className="hospital-list">
                  <div className="Doctor-list">
                    <div id="mySidenavTab" className="sidenav">
                      <div id="Dr">
                        <p className="sidenavHeader">Paitients</p>
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
                          value={patient}
                          id="id_search"
                          onChange={(e) => {
                            setPatient(e.target.value);
                          }}
                        />
                        <button id="id_search_button" onClick={searchPatient}>
                          click
                        </button>
                      </form>
                      {sideLoader ? (
                        <SideLoader />
                      ) : (
                        <div>
                          {foundUser && foundUser.name ? (
                            <div>
                              <div id="patientId2">
                                <div id="patientImage2">
                                  <img src={ProfilePic} />
                                </div>
                                <div id="patientName2">
                                  <p>{foundUser.name}</p>
                                </div>
                              </div>
                              {access.length === 0 ? (
                                <div>
                                  <a
                                    className="btn btn-danger"
                                    role="button"
                                    id="search_button2"
                                    onClick={() => {
                                      requestPatient(foundUser.short_id);
                                    }}
                                  >
                                    Request Patient
                                  </a>
                                  <br />
                                  <br />
                                  {foundUser.nominee ? (
                                    <a
                                      class="btn btn-warning"
                                      role="button"
                                      id="search_button2"
                                    >
                                      Request Nominee
                                    </a>
                                  ) : (
                                    ""
                                  )}
                                </div>
                              ) : (
                                <a
                                  class="btn btn-primary"
                                  role="button"
                                  id="search_button2"
                                  onClick={() => {
                                    getPatient(foundUser.short_id);
                                  }}
                                >
                                  View Details
                                </a>
                              )}
                            </div>
                          ) : (
                            ""
                          )}
                          <hr></hr>
                        </div>
                      )}
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
                        <a>Paitients</a>
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
            {path === "/hospital/profile" ? (
              <UserMiddleComponent userobj={user} />
            ) : (
              ""
            )}
            {path === "/hospital/diseases" ? <HospitalDiseaseContent /> : ""}
            {/* {path === "/user/disease" ? <DiseaseContent /> : ""} */}
            {path === "/hospital/patient" ? <HospitalPatient /> : ""}
            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="Dr">
                <a>Paitients </a>
                <img src={doctorIcon} className="Icons doctor-icon" />
              </div>
              <form id="search-form">
                <input
                  type="text"
                  placeholder="Search..."
                  value={patient}
                  className="mobile-preview shadow floating-animate"
                  id="id_search1"
                  onChange={(e) => {
                    setPatient(e.target.value);
                  }}
                />
                {/* <button id="id_search_button1">click</button> */}
                <button id="id_search_button1" onClick={searchPatient}>
                  click
                </button>
              </form>
              {sideLoader ? (
                <SideLoader />
              ) : (
                <div>
                  {foundUser && foundUser.name ? (
                    <div>
                      <div id="patientId2">
                        <div id="patientImage2">
                          <img src={ProfilePic} />
                        </div>
                        <div id="patientName2">
                          <p>{foundUser.name}</p>
                        </div>
                      </div>
                      {access.length === 0 ? (
                        <div className="request-paitient">
                          <a
                            className="btn btn-danger"
                            role="button"
                            id="search_button2"
                            onClick={() => {
                              requestPatient(foundUser.short_id);
                            }}
                          >
                            Request Patient
                          </a>
                          <br />
                          <br />
                          {foundUser.nominee ? (
                            <a
                              class="btn btn-warning"
                              role="button"
                              id="search_button2"
                            >
                              Request Nominee
                            </a>
                          ) : (
                            ""
                          )}
                        </div>
                      ) : (
                        <div className="request-patient">
                          <a
                            class="btn btn-primary"
                            role="button"
                            id="search_button2"
                            onClick={() => {
                              getPatient(foundUser.short_id);
                            }}
                          >
                            View Details
                          </a>
                        </div>
                      )}
                      <hr></hr>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mobile-view">
        <div className="container-fluid profile-body">
          <div className="row">
            {isLoading ? <Loader /> : ""}
            <div
              className="col-lg-2 col-sm-4 col-12 order-3 order-sm-1"
              id="pSec1"
            >
              {path !== "/hospital/diseases" ? (
                <div id="leftPanel">
                  <div className="lists active-list">
                    <a href="/hospital/profile">Profile</a>
                    <img src={defaultDp} className="Icons profile-icon" />
                  </div>

                  <div id="Dr-sec3">
                    <button
                      className="sideNavButton"
                      onClick={() => {
                        openSideNav();
                      }}
                    >
                      <a>Paitients</a>
                      <img src={doctorIcon} className="Icons doctor-icon" />
                    </button>
                  </div>

                  <div className="lists">
                    <a href="#">Appointments</a>
                    <img src={AppointmentImage} className="Icons" />
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
              ) : (
                ""
              )}
            </div>
            {path === "/hospital/profile" ? (
              <UserMiddleComponent userobj={user} />
            ) : (
              ""
            )}
            {path === "/hospital/diseases" ? <HospitalDiseaseContent /> : ""}
            {path === "/hospital/patient" ? <HospitalPatient /> : ""}
            {/* {path === "/user/disease" ? <DiseaseContent /> : ""} */}

            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="mySidenav" className="sidenav">
                <div id="Dr">
                  <p className="sidenavHeader">Paitients</p>
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
                <form id="hospital-search" className="sidenav-form">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="mobile-preview shadow floating-animate"
                    name="hnam"
                    id="id_search"
                    value={patient}
                    onChange={(e) => {
                      setPatient(e.target.value);
                    }}
                  />
                  <button id="id_search_button" onClick={searchPatient}>
                    click
                  </button>
                </form>
                {sideLoader ? (
                  <SideLoader />
                ) : (
                  <div>
                    {foundUser && foundUser.name ? (
                      <div>
                        <div id="patientId2">
                          <div id="patientImage2">
                            <img src={ProfilePic} />
                          </div>
                          <div id="patientName2">
                            <p>{foundUser.name}</p>
                          </div>
                        </div>
                        {access.length === 0 ? (
                          <div>
                            <a
                              className="btn btn-danger"
                              role="button"
                              id="search_button2"
                              onClick={() => {
                                requestPatient(foundUser.short_id);
                              }}
                            >
                              Request Patient
                            </a>
                            <br />
                            {foundUser.nominee ? (
                              <a
                                class="btn btn-warning"
                                role="button"
                                id="search_button2"
                              >
                                Request Nominee
                              </a>
                            ) : (
                              ""
                            )}
                          </div>
                        ) : (
                          <a
                            class="btn btn-primary"
                            role="button"
                            id="search_button2"
                            onClick={() => {
                              getPatient(foundUser.short_id);
                            }}
                          >
                            View Details
                          </a>
                        )}
                      </div>
                    ) : (
                      ""
                    )}
                    <hr></hr>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideComponent;
