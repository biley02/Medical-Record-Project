import React, { useEffect, useState } from "react";
import { useGlobalContext } from "../context/Context";
import { useHistory, useLocation } from "react-router";

import ProfilePic from "../img/ProfilePic.png";
import coverPhoto from "../img/CoverPhoto.png";
import camera from "../img/camera.png";
import profileEditIcon from "../img/profile-edit-icon.png";
import axios from "axios";
import Loader from "../LoaderComponents/Loader";

import "../styles/disease.css";

import "../styles/userProfile.css";
import "../styles/hospital-patient.css";

const baseUrl = "http://localhost:8080/hospital";

const HospitalPatient = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    shortId: "",
    nomineeEmail: "",
    phoneNumber: "",
    address: "",
  });

  const [disease, setDisease] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { Alert, alert, setAlert, showAlert, userToken } = useGlobalContext();

  const history = useHistory();

  useEffect(() => {
    setIsLoading(true);
    axios.get(`${baseUrl}/patient`).then((res) => {
      console.log("hospitaluser", res.data);
      const tmp_user = res.data.user;
      const err = res.data.error_msg;
      const diseaseData = res.data.disease.disease;
      if (tmp_user) {
        setUser(tmp_user);
      }

      if (diseaseData.length > 0) {
        setDisease(diseaseData);
      }
      setIsLoading(false);
    });
  }, []);

  const diseaseDetails = (diseaseId) => {
    setIsLoading(true);
    console.log("disease id", diseaseId);
    axios
      .post(`${baseUrl}/diseases`, {
        diseaseId: diseaseId,
      })
      .then((res) => {
        console.log("token set", res.data);
        history.push("/hospital/diseases");
        setIsLoading(false);
      });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div
        id="pSec2"
        class=" col-lg-8 col-sm-8 col-12 order-1 order-sm-2 pSec2h "
      >
        <div class="disease-back-link">
          <a href="/hospital/profile">
            <i class="fa fa-arrow-left" aria-hidden="true"></i>Home
          </a>
        </div>
        <div className="sub1h" id="sub1">
          <div class="images">
            <img src={coverPhoto} id="coverImg" />
            <img src={ProfilePic} id="profileImg" />
          </div>
          <div class="name-id">
            <h5 id="name">{user.name ? user.name : "Deafaul Name"}</h5>
            <h4 id="heading1">
              Patient Id-:{user.short_id ? user.short_id : "def1234"}
            </h4>
          </div>
          <div id="patientDetailsh">
            <div class="heading-and-edit-icon">
              <h4 id="heading2h">Patient Details</h4>
            </div>
            <label for="Address" class="detailLevels">
              Address : {user.address ? user.address : " not present"}
            </label>

            <br />
            <label for="PhoneNo" class="detailLevels">
              Phone No. : {user.phoneNumber ? user.phoneNumber : " not present"}
            </label>

            <br />
            <label for="Email" class="detailLevels">
              Email : {user.email ? user.email : " not present"}
            </label>

            <br />
            <label for="nominee" class="detailLevels">
              Nominee Email:{" "}
              {user.nominee ? user.nominee.email : " not present"}
            </label>
          </div>
        </div>
        <div id="sub4" className="sub4h">
          <div class="container">
            <div class="add-documents">
              <h5 id="name1">Patient's Diseases</h5>
            </div>
            {disease.length === 0 ? (
              <div className="media">
                <div className="diseases">
                  <div>No active disease present</div>
                </div>
                <i class="fa fa-medkit fa fa-2x" aria-hidden="true"></i>
              </div>
            ) : (
              disease.map((data) => {
                return (
                  <div className="media">
                    <div className="diseases">
                      <div>{data.name}</div>
                    </div>
                    <button
                      id="View"
                      onClick={() => {
                        diseaseDetails(data._id);
                      }}
                    >
                      View
                    </button>
                    <i class="fa fa-medkit fa fa-2x" aria-hidden="true"></i>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HospitalPatient;
