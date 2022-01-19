import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import profileEditIcon from "../img/profile-edit-icon.png";
import axios from "axios";
import "../styles/modal.css";

const baseUrl = "http://localhost:8080/user/profile/editDetails";
const ProfileDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    userName: "",
    userEmail: "",
    nomineeName: "",
    nomineePhnNumber: "",
    userBloodGroup: "",
  });

  const handleSubmit = async (e) => {
    console.log("hi");
    e.preventDefault();
    console.log(updatedUserDetails);

    axios
      .post(
        `http://localhost:8080/user/profile/editDetails`,
        updatedUserDetails
      )
      .then((response) => {
        console.log("response.data", response);
      })
      .catch((error) => {
        console.log(error);
      });

    setUpdatedUserDetails({
      userName: "",
      userEmail: "",
      nomineeName: "",
      nomineePhnNumber: "",
      userBloodGroup: "",
    });
    setModalIsOpen(false);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setUpdatedUserDetails({ ...updatedUserDetails, [name]: value });
  };
  return (
    <>
      <img
        src={profileEditIcon}
        id="myBtnEdit"
        onClick={() => {
          setModalIsOpen(true);
        }}
      ></img>
      {/* <div
        className={`${
          modalIsOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="add-details-modal-container">
          <button
            className="close-modal-btn"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            <FaTimes></FaTimes>
          </button>
          <form
            className="form-group"
            enctype="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <label>Update Details :</label>
            <div>
              <label className="label1" htmlFor="userName">
                User Name :
              </label>
              <input
                type="text"
                className="inputDetails"
                name="userName"
                placeholder="update your name..."
                value={updatedUserDetails.userName}
                onChange={handleChange}
              />
              <br />
              <br />
            </div>
            <div>
              <label className="label1" htmlFor="nomineeName">
                Nominee Name :
              </label>
              <input
                type="text"
                className="inputDetails"
                name="nomineeName"
                placeholder="update your name..."
                value={updatedUserDetails.nomineeName}
                onChange={handleChange}
              />
              <br />
              <br />
            </div>
            <div>
              <label className="label1" htmlFor="email">
                User Email :
              </label>
              <input
                type="text"
                className="inputDetails"
                name="userEmail"
                placeholder="update your email..."
                value={updatedUserDetails.userEmail}
                onChange={handleChange}
              />
              <br />
              <br />
            </div>
            <div>
              <label className="label1" htmlFor="userBloodGroup">
                User Blood-Group :
              </label>
              <input
                type="text"
                className="inputDetails"
                name="userBloodGroup"
                placeholder="update your name..."
                value={updatedUserDetails.userBloodGroup}
                onChange={handleChange}
              />
              <br />
              <br />
            </div>
            <div>
              <button
                type="submit"
                id="submitbtn"
                className="register"
                onSubmit={handleSubmit}
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div> */}
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
              <h1 className="modal__title">Edit Profile</h1>
              <div>
                {/* <label className="form__name" htmlFor="userName">
                  Disease Name
                </label> */}
                <label htmlFor="name" className="lb">
                  Edit User name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  placeholder="update your name..."
                  value={updatedUserDetails.userName}
                  onChange={handleChange}
                  required=""
                />
                <br />
                <br />
              </div>
              <div>
                {/* <label className="form__name" htmlFor="userName">
                  Disease Name
                </label> */}
                <label htmlFor="name" className="lb">
                  Nominee name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  placeholder="update your name..."
                  value={updatedUserDetails.nomineeName}
                  onChange={handleChange}
                  required=""
                />
                <br />
                <br />
              </div>
              <div>
                {/* <label className="form__name" htmlFor="userName">
                  Disease Name
                </label> */}
                <label htmlFor="name" className="lb">
                   Email
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  placeholder="update your email..."
                  value={updatedUserDetails.userEmail}
                  onChange={handleChange}
                  required=""
                />
                <br />
                <br />
              </div>
              <div>
                {/* <label className="form__name" htmlFor="userName">
                  Disease Name
                </label> */}
                <label htmlFor="name" className="lb">
                  Blood Group name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  name="userBloodGroup"
                  placeholder="update your name..."
                  value={updatedUserDetails.userBloodGroup}
                  onChange={handleChange}
                  required=""
                />
                <br />
                <br />
              </div>
              {/* <div>
              </div> */}
              <button
                className="accept"
                // type="save"
                type="submit"
                // id="submitbtn"
                // className="register"
                onSubmit={handleSubmit}
              >
                Save &rarr;<i className="uil uil-expand-arrows"></i>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileDetailsModal;
