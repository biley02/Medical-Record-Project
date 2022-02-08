import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from "react-icons/fa";
import profileEditIcon from "../img/profile-edit-icon.png";
import axios from "axios";
import "../styles/modal.css";

import { useGlobalContext } from "../context/Context";

const baseUrl = "http://localhost:8080/user/profile/editDetails";
const ProfileDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { Alert, alert, setAlert, showAlert, userToken } = useGlobalContext();

  const [updatedUserDetails, setUpdatedUserDetails] = useState({
    nomineeName: "",
    nomineePhn: "",
    nomineeEmail: "",
    address: "",
  });

  const SendDetails = async () => {
    console.log("hieeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    console.log(updatedUserDetails);
    axios
      .post(
        `http://localhost:8080/user/profile/editDetails`,
        updatedUserDetails
      )
      .then((response) => {
        console.log("response.dataaaaaaaaaaa", response.data);

        const error = response.data.error_msg;

        if (error.show) {
          setUpdatedUserDetails({
            nomineeName: "",
            nomineePhnNumber: "",
            nomineeEmail: "",
            address: "",
          });
          setModalIsOpen(false);
          return showAlert(true, error.type, error.msg);
        }

        setUpdatedUserDetails({
          nomineeName: "",
          nomineePhnNumber: "",
          nomineeEmail: "",
          address: "",
        });
        setModalIsOpen(false);
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
          setUpdatedUserDetails({
            nomineeName: "",
            nomineePhnNumber: "",
            nomineeEmail: "",
            address: "",
          });
        }}
      ></img>
      <div
        className={`${
          modalIsOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="Edit-details-modal">
          <form className="form-group">
            <div className="mod">
              <a
                title="Close"
                className="link-2"
                onClick={() => setModalIsOpen(false)}
              ></a>
              <h1 className="modal__title">Edit Profile</h1>
              <div>
                <label htmlFor="name" className="lb">
                  Set Nominee Name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="nomineName"
                  placeholder="Set Nominee Name ... "
                  onChange={(e) => {
                    const { value } = e.target;
                    setUpdatedUserDetails({
                      ...updatedUserDetails,
                      nomineeName: value,
                    });
                  }}
                />
                <br />
                <br />
              </div>
              <div>
                <label htmlFor="nomineeEmail" className="lb">
                  Nominee Email
                </label>
                <input
                  type="text"
                  className="form__input"
                  name="nomineeEmail"
                  id="name"
                  placeholder="Set nominee email..."
                  onChange={(e) => {
                    const { value } = e.target;
                    setUpdatedUserDetails({
                      ...updatedUserDetails,
                      nomineeEmail: value,
                    });
                  }}
                />
                <br />
                <br />
              </div>
              <div>
                <label htmlFor="nomineePhnNumber" className="lb">
                  Nominee Phone Number
                </label>
                <input
                  type="text"
                  className="form__input"
                  name="nomineePhnNumber"
                  id="name"
                  placeholder="Set phone number..."
                  onChange={(e) => {
                    const { value } = e.target;
                    setUpdatedUserDetails({
                      ...updatedUserDetails,
                      nomineePhnNumber: value,
                    });
                  }}
                />
                <br />
                <br />
              </div>
              <div>
                <label htmlFor="address" className="lb">
                  Set your address
                </label>
                <input
                  type="text"
                  className="form__input"
                  value={updatedUserDetails.address}
                  name="address"
                  placeholder="set your address..."
                  onChange={(e) => {
                    const { value } = e.target;
                    setUpdatedUserDetails({
                      ...updatedUserDetails,
                      address: value,
                    });
                  }}
                />
                <br />
                <br />
              </div>

              <a
                className="accept"
                onClick={() => {
                  SendDetails();
                }}
              >
                Save &rarr;<i className="uil uil-expand-arrows"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProfileDetailsModal;
