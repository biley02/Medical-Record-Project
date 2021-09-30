import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa';
import profileEditIcon from '../img/profile-edit-icon.png'

const ProfileDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <img src={profileEditIcon} id="myBtnEdit" onClick={()=>{setModalIsOpen(true)}}></img>
      <div className={`${modalIsOpen?'modal-overlay show-modal' : 'modal-overlay'}`}>
      <div className='add-details-modal-container'>
        {/* <h3>Change Profile Picture</h3> */}
        <button className='close-modal-btn' onClick={()=>{setModalIsOpen(false)}}>
          <FaTimes></FaTimes>
        </button>
        <form className="form-group"   enctype="multipart/form-data">
          <label>
            Update Details
          </label>
          <div>
              <span>
                <span >
                    User Name : <input type="text" /><br/><br/>
                </span>
              </span>
          </div>
          <div>
              <span>
                <span >
                    User Email : <input type="text" /><br/><br/>
                </span>
              </span>
          </div>
          <div>
              <span>
                <span >
                    Nominee Name : <input type="text" /><br/><br/>
                </span>
              </span>
          </div>
          <div>
              <span>
                <span >
                    Add Blood Group : <input type="text" /><br/><br/>
                </span>
              </span>
          </div>
          <div>
          <button type="save">Save</button>
          </div>
        </form>
      </div>
      </div>
      
    </>
  );
};

export default ProfileDetailsModal;
