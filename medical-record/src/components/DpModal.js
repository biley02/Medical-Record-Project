import React, { useState } from "react";

import { FaTimes } from 'react-icons/fa';

import '../styles/modal.css'

import camera from '../img/camera.png'

const DpModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);


  return (
    <>
      <img src={camera} id="Camera" onClick={()=>{setModalIsOpen(true)}}></img>
      <div className={`${modalIsOpen?'modal-overlay show-modal' : 'modal-overlay'}`}>
      <div className='dp-modal-container'>
        {/* <h3>Change Profile Picture</h3> */}
        <button className='close-modal-btn' onClick={()=>{setModalIsOpen(false)}}>
          <FaTimes></FaTimes>
        </button>
        <form className="form-group"   enctype="multipart/form-data">
          <label>
            Uplaod Image
          </label>
          <div>
              <span>
                <span >
                    Browse… <input type="file" id="profilePic"/><br/><br/>
                </span>
              </span>
              <input type="text" placeholder="Choose a file" readonly></input>
              <button type="save">Save</button>
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default DpModal;
