import React, { useState } from "react";

import coverPhoto from "../img/CoverPhoto.png";
import ProfilePic from "../img/ProfilePic.png";
import camera from "../img/camera.png";
import profileEditIcon from "../img/profile-edit-icon.png";

import "../styles/userProfile.css";
import DpModal from "./DpModal";
import ProfileDetailsModal from "./ProfileDetailsModal";

const UserMiddleComponent = ({ userobj }) => {
  console.log('userssssss',userobj)
  const user = {
    name: userobj.name,
    profilePic: "",
    shortId: userobj.short_id,
    bloodGroup: "",
    email: "",
    phoneNo: "",
    adress: "",
  };

  return (
    <div className="col-lg-8 col-sm-8 col-12 order-1 order-sm-2" id="pSec2">
      <div id="sub1">
        <div className="images">
          <img src={coverPhoto} id="coverImg" />
          {!user.profilePic ? (
            <a href="#">
              <img src={ProfilePic} id="profileImg" />
            </a>
          ) : (
            <a href="#">
              <img
                src="../uploads/<%=user.email%>/profilePic/<%=user.profilePic%>"
                id="profileImg"
              />
            </a>
          )}
          <DpModal />
        </div>
        <div className="name-id">
          <h5 id="name">{user.name ? user.name : "Default Name"}</h5>
          <h4 id="heading1">
            Patient Id-{user.shortId ? user.shortId : "DEF1234"}
            <span id="patientId"></span>
          </h4>
        </div>
        <div id="patientDetails">
          <div className="heading-and-edit-icon">
            <h3 id="heading2-edit-details">Patient Details</h3>
            <ProfileDetailsModal />
          </div>
          <label for="bloodGroup" class="detailLevels">
            Blood Group :{user.bloodGroup ? user.bloodGroup : ""}
          </label>
          <br />
          <label for="Adress" class="detailLevels">
            Address :{user.adress ? user.adress : ""}
          </label>
          <br />
          <label for="PhoneNo" class="detailLevels">
            Phone Number :{user.phoneNo ? user.phoneNo : ""}
          </label>
          <br />
          <label for="Email" class="detailLevels">
            Email :{user.email ? user.email : ""}
          </label>
          <br />
        </div>
      </div>
    </div>
  );
};

export default UserMiddleComponent;
