import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";

import "../styles/userProfile.css";

import defaultDp from "../img/profile.png";
import AppointmentImage from "../img/appointment.png";
import progressImage from "../img/progress.png";
import messageImage from "../img/message.png";
import doctorIcon from "../img/doctor-icon.png";
import settingsImage from "../img/Settings.png";
import diseaseImage from "../img/disease.png";

import Diseases from "./Diseases";

const UserSideComponent = () => {
  const pathname = useLocation().pathname;
  const [path, setPath] = useState("");

  useEffect(() => {
    setPath(pathname);
  }, [pathname]);

  const closeNavTab = () => {
    console.log("close nav tab");
  };

  // console.log(path)

  return (
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
                  <a className="dropdown-item" onclick="{}">
                    <Diseases />
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
                    >
                      <a>Hospitals</a>
                      <img
                        src={doctorIcon}
                        className="Icons Icons-invert"
                        onclick={""}
                      />
                    </button>
                  </div>
                </div>
              </div>
              <div class="lists">
                <a href="#">Settings</a>
                <img src={settingsImage} class="Icons" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSideComponent;
