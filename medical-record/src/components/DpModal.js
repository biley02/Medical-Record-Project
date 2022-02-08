import React, { useState } from "react";

import "../styles/modal.css";

import camera from "../img/camera.png";

const DpModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <img
        src={camera}
        id="Camera"
        alt="Profile"
        onClick={() => {
          setModalIsOpen(true);
        }}
      ></img>

      <div
        className={`${
          modalIsOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="add-diseases-modal-container">
          <form className="form-group" enctype="multipart/form-data">
            <div className="mod">
              <a
                title="Close"
                className="link-2"
                onClick={() => setModalIsOpen(false)}
              ></a>
              <h1 className="modal__title">Edit Profile</h1>
              <div>
                <label htmlFor="name" className="lb">
                  Edit name
                </label>
                <input
                  type="text"
                  className="form__input"
                  id="name"
                  placeholder="Name"
                  required=""
                />
                <br />
                <br />
              </div>
              <div>
                <br />

                <input type="file" id="actual-btn" hidden accept="image/*" />
                <label htmlFor="actual-btn" className="lb1">
                  Profile picture
                </label>
                <span id="file-chosen">No file chosen</span>
              </div>
              <div>
                <br />
              </div>
              <a className="accept" type="save">
                Save &rarr;<i className="uil uil-expand-arrows"></i>
              </a>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default DpModal;
