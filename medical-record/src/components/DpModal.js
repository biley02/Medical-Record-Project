import React, { useState } from "react";

import '../styles/modal.css'

import camera from '../img/camera.png'

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
      {/* <div
        className={`${
          modalIsOpen ? "modal-overlay show-modal" : "modal-overlay"
        }`}
      >
        <div className="dp-modal-container">
         
          <button
            className="close-modal-btn"
            onClick={() => {
              setModalIsOpen(false);
            }}
          >
            <FaTimes></FaTimes>
          </button>
          <form className="form-group" enctype="multipart/form-data">
            <label>Uplaod Image</label>
            <div>
              <span>
                <span>
                  Browse… <input type="file" id="profilePic" />
                  <br />
                  <br />
                </span>
              </span>
              <input type="text" placeholder="Choose a file" readonly></input>
              <button type="save">Save</button>
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

                <input
                  type="file"
                  id="actual-btn"
                  hidden
                  accept="image/*"
                />
                <label htmlFor="actual-btn" className="lb1">
                  Profile picture
                </label>
                <span id="file-chosen">No file chosen</span>
              </div>
              <div>
                <br />

                {/* <input type="file" id="actual-btn" hidden />
                <label htmlFor="actual-btn" className="lb2">
                  Add presciptions
                </label>
                <span id="file-chosen">No file chosen</span> */}
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
    </>
  );
};

export default DpModal;
