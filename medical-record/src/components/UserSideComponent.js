import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import "../styles/userProfile.css";

import defaultDp from "../img/profile.png";
import ProfilePic from "../img/ProfilePic.png";
import AppointmentImage from "../img/appointment.png";
import progressImage from "../img/progress.png";
import messageImage from "../img/message.png";
import doctorIcon from "../img/doctor-icon.png";
import settingsImage from "../img/Settings.png";
import diseaseImage from "../img/disease.png";
import UserMiddleComponent from "./UserMiddleComponent";
import DiseaseContent from "./DiseaseContent";
import Loader from "../LoaderComponents/Loader";
import SideLoader from "../LoaderComponents/SideLoader";

import { FaTimes } from "react-icons/fa";

import "../styles/modal.css";

import { useGlobalContext } from "../context/Context";
import axios from "axios";
import UserHospital from "./UserHospital";
axios.defaults.withCredentials = true;

const baseUrl = "http://localhost:8080/user";

const UserSideComponent = () => {
  const pathname = useLocation().pathname;
  const [medicineFile, setMedicineFile] = useState();
  const [documentFile, setDocumentFile] = useState();
  const [medicineName, setMedicineName] = useState("No File Chosen");
  const [documentName, setDocumentName] = useState("No File Chosen");
  const [diseaseName, setDiseaseName] = useState("");
  const [path, setPath] = useState("");
  const [user, setUser] = useState({});

  const [disease, setDisease] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [hospital, setHospital] = useState("");
  const [sideLoader, setSideLoader] = useState(false);
  const [foundHospitals, setFoundHospitals] = useState([]);

  // const [diseaseDetails,setDisaseDetails]=useState({})
  const [diseaseData, setDiseaseData] = useState({
    name: "Default",
    document: [],
    medicine: [],
  });
  // const [medicine,setMedicine]=useState('')
  // const [document,setDocument]=useState('')

  const [userHospital, setUserHospital] = useState(null);

  const { Alert, alert, setAlert, showAlert, userToken } = useGlobalContext();
  const history = useHistory();

  const tmp_token = useState(userToken);

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

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseUrl}/profile`, { withCredentials: true }).then((res) => {
      console.log("data from backedn", res.data);
      const userData = res.data.user;
      const diseaseData = res.data.disease ? res.data.disease.disease : {};
      const userH = res.data.hospitals;
      // console.log('diseaseData',diseaseData)

      // console.log("nomineeUserrrrrrrrrrrrrrrrrrrrr", nomineeU);
      setUser(userData);
      setDisease(diseaseData);
      setIsLoading(false);
      setUserHospital(userH);
    });
    console.log("disease detailsssssss", diseaseData);
  }, []);

  useEffect(() => {
    axios.get(`${baseUrl}/login`).then((res) => {
      const error = res.data;
      // console.log("error", error);
      if (error.show === true) {
        showAlert(true, error.type, error.msg);
        return history.push("/user/login");
      }
    });
  }, []);

  const handleDisease = (diseaseId) => {
    console.log("disease id", diseaseId);

    // axios.post(`${baseUrl}/disease`,{
    //   diseaseId
    // }).then(res=>{
    //   // console.log('disease id sent',res.data)
    //   const details =res.data
    //   console.log('diseasData',details)
    //   setDiseaseData(details)
    //   console.log('disease state',diseaseData)
    //   return history.push('/user/disease')
    // })

    localStorage.setItem("diseaseId", diseaseId);
    history.push("/user/disease");
    window.location.reload(true);
  };

  //profile details from backend

  // console.log(path)
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const sendFile = () => {
    setModalIsOpen(false);
    console.log("document", documentFile);
    console.log("medicine", medicineFile);
    console.log("diseaseName", diseaseName);

    const data = new FormData();
    data.append("name", diseaseName);
    data.append("medicine", medicineFile);
    data.append("document", documentFile);

    axios
      .post(`${baseUrl}/profile/upload`, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((e) => console.log(e));

    setDiseaseName("");
    setMedicineFile();
    setDocumentFile();
    setDocumentName("No File Chosen");
    setMedicineName("No File Chosen");
  };

  const searchHospital = (e) => {
    e.preventDefault();
    setSideLoader(true);
    axios
      .post(`${baseUrl}/hospitalSearch`, { hname: hospital })
      .then((res) => {
        console.log("hospital searxh details", res.data);
        const fhospital = res.data.hospital;
        if (!fhospital) {
          setSideLoader(false);
          return;
        }
        setFoundHospitals(res.data.hospital);
        setSideLoader(false);
        setHospital("");
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const getHospital = (id) => {
    // console.log("get hospital", id);
    axios
      .post(`${baseUrl}/userHospitalId`, { userHospitalId: id })
      .then((res) => {
        console.log("tokennnn", res.data);
        localStorage.setItem("userHospitalId", res.data.token);
        history.push("/user/hospital");
        window.location.reload(true);
      });
  };

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
            // enctype="multipart/form-data"
          >
            <div className="mod">
              <a
                title="Close"
                className="link-2"
                onClick={() => setModalIsOpen(false)}
              ></a>
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
                  required="true"
                  onChange={(e) => {
                    const { value } = e.target;
                    setDiseaseName(value);
                  }}
                />
                <br />
                <br />
              </div>
              <div>
                <br />

                <input
                  type="file"
                  id="medicine"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    // console.log(file)
                    setMedicineFile(file);
                    const value = file.name;
                    setMedicineName(value);
                  }}
                />
                <label htmlFor="medicine" className="lb1">
                  Add medicine
                </label>
                <span id="file-chosen">{medicineName}</span>
              </div>
              <div>
                <br />

                <input
                  type="file"
                  id="document"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    // console.log(file)
                    setDocumentFile(file);
                    const value = file.name;
                    setDocumentName(value);
                  }}
                />
                <label htmlFor="document" className="lb2">
                  Add presciptions
                </label>
                <span id="file-chosen">{documentName}</span>
                {/* <span>
                  <span class="form__med">
                    Add Medicine... <input type="file" id="profilePic" />
                    <br />
                    <br />
                  </span>
                </span> */}
              </div>
              <button
                className="accept"
                type="submit"
                onClick={
                  diseaseName
                    ? sendFile
                    : (e) => {
                        console.log("enter disease name");
                      }
                }
              >
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
            {isLoading ? <Loader /> : ""}
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
                    {disease.map((data) => {
                      return (
                        <a
                          className="dropdown-item"
                          onClick={() => {
                            handleDisease(data._id);
                          }}
                        >
                          <span className="dropAnchor">{data.name}</span>
                        </a>
                      );
                    })}
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
                          value={hospital}
                          onChange={(e) => {
                            setHospital(e.target.value);
                          }}
                          name="hname"
                          id="id_search"
                        />
                        <button id="id_search_button" onClick={searchHospital}>
                          click
                        </button>
                      </form>
                      {sideLoader ? (
                        <SideLoader />
                      ) : (
                        <div>
                          {foundHospitals.length > 0
                            ? foundHospitals.map((hdata) => {
                                return (
                                  <ul
                                    id="patientList"
                                    onClick={() => {
                                      getHospital();
                                    }}
                                  >
                                    <div id="patientId2">
                                      <div id="patientImage2">
                                        <img src={ProfilePic} />
                                      </div>
                                      <div id="patientName2">
                                        <p>{hdata.hospitalName}</p>
                                      </div>
                                    </div>
                                  </ul>
                                );
                              })
                            : ""}
                        </div>
                      )}
                      <hr></hr>
                      {userHospital && userHospital.length > 0
                        ? userHospital.map((hdata) => {
                            return (
                              <ul
                                id="patientList"
                                onClick={() => {
                                  getHospital(hdata.hospitalId._id);
                                }}
                              >
                                <div id="patientId2">
                                  <div id="patientImage2">
                                    <img src={ProfilePic} />
                                  </div>
                                  <div id="patientName2">
                                    <p>{hdata.hospitalId.hospitalName}</p>
                                  </div>
                                </div>
                              </ul>
                            );
                          })
                        : ""}
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
            {path === "/user/profile" ? (
              <UserMiddleComponent userobj={user} />
            ) : (
              ""
            )}
            {path === "/user/hospital" ? <UserHospital /> : ""}
            {path === "/user/disease" ? <DiseaseContent /> : ""}
            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="Dr">
                <a>Doctors </a>
                <img src={doctorIcon} className="Icons doctor-icon" />
              </div>
              <form id="search-form">
                <input
                  type="text"
                  placeholder="Search..."
                  value={hospital}
                  onChange={(e) => {
                    setHospital(e.target.value);
                  }}
                  className="mobile-preview shadow floating-animate"
                  id="id_search1"
                />
                <button id="id_search_button1" onClick={searchHospital}>
                  click
                </button>
              </form>
              {sideLoader ? (
                <SideLoader />
              ) : (
                <div>
                  {foundHospitals.length > 0
                    ? foundHospitals.map((hdata) => {
                        return (
                          <ul
                            id="patientList"
                            onClick={() => {
                              getHospital(hdata._id);
                            }}
                          >
                            <div id="patientId2">
                              <div id="patientImage2">
                                <img src={ProfilePic} />
                              </div>
                              <div id="patientName2">
                                <p>{hdata.hospitalName}</p>
                              </div>
                            </div>
                          </ul>
                        );
                      })
                    : ""}
                </div>
              )}
              <hr></hr>
              {userHospital && userHospital.length > 0
                ? userHospital.map((hdata) => {
                    return (
                      <ul
                        id="patientList"
                        onClick={() => {
                          getHospital(hdata.hospitalId._id);
                        }}
                      >
                        <div id="patientId2">
                          <div id="patientImage2">
                            <img src={ProfilePic} />
                          </div>
                          <div id="patientName2">
                            <p>{hdata.hospitalId.hospitalName}</p>
                          </div>
                        </div>
                      </ul>
                    );
                  })
                : ""}
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
              {path !== "/user/disease" ? (
                <div id="leftPanel">
                  <div className="lists active-list">
                    <a href="/user/profile">Profile</a>
                    <img src={defaultDp} className="Icons profile-icon" />
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
                      <button
                        className="dropdown-item"
                        onClick={() => setModalIsOpen(true)}
                      >
                        Add New
                      </button>
                      {disease.map((data) => {
                        return (
                          <a
                            className="dropdown-item"
                            onClick={() => {
                              handleDisease(data._id);
                            }}
                          >
                            <span className="dropAnchor">{data.name}</span>
                          </a>
                        );
                      })}
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
              ) : (
                ""
              )}
            </div>
            {path === "/user/profile" ? (
              <UserMiddleComponent userobj={user} />
            ) : (
              ""
            )}
            {path === "/user/hospital" ? <UserHospital /> : ""}
            {path === "/user/disease" ? <DiseaseContent /> : ""}

            <div
              className="col-lg-2 col-sm-0 col-12 order-2 order-sm-3"
              id="pSec3"
            >
              <div id="mySidenav" className="sidenav">
                <div id="Dr">
                  <p className="sidenavHeader">Hospitalssss</p>
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
                <form class="sidenav-form">
                  <input
                    type="text"
                    placeholder="Search..."
                    class="mobile-preview shadow floating-animate"
                    value={hospital}
                    onChange={(e) => {
                      setHospital(e.target.value);
                    }}
                    name="hname"
                    id="id_search"
                  />
                  <button id="id_search_button" onClick={searchHospital}>
                    click
                  </button>
                </form>
                {sideLoader ? (
                  <SideLoader />
                ) : (
                  <div>
                    {foundHospitals.length > 0
                      ? foundHospitals.map((hdata) => {
                          return (
                            <ul
                              id="patientList"
                              onClick={() => {
                                getHospital(hdata._id);
                              }}
                            >
                              <div id="patientId2">
                                <div id="patientImage2">
                                  <img src={ProfilePic} />
                                </div>
                                <div id="patientName2">
                                  <p>{hdata.hospitalName}</p>
                                </div>
                              </div>
                            </ul>
                          );
                        })
                      : ""}
                  </div>
                )}
                <hr></hr>
                {userHospital && userHospital.length > 0
                  ? userHospital.map((hdata) => {
                      return (
                        <ul
                          id="patientList"
                          onClick={() => {
                            getHospital(hdata.hospitalId._id);
                          }}
                        >
                          <div id="patientId2">
                            <div id="patientImage2">
                              <img src={ProfilePic} />
                            </div>
                            <div id="patientName2">
                              <p>{hdata.hospitalId.hospitalName}</p>
                            </div>
                          </div>
                        </ul>
                      );
                    })
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserSideComponent;
