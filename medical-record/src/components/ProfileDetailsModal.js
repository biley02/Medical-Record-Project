import React, { useState } from "react";
import Modal from "react-modal";
import { FaTimes } from 'react-icons/fa';
import profileEditIcon from '../img/profile-edit-icon.png'

const ProfileDetailsModal = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [updatedUserDetails,setUpdatedUserDetails]=useState({
    userName:'',
    userEmail:'',
    nomineeName:'',
    nomineePhnNumber:'',
    userBloodGroup:''
  })

  const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(updatedUserDetails)
    setUpdatedUserDetails({
      userName:'',
      userEmail:'',
      nomineeName:'',
      nomineePhnNumber:'',
      userBloodGroup:''
    })
    setModalIsOpen(false)
  }

  const handleChange=(e)=>{
    const value=e.target.value
    const name=e.target.name
    setUpdatedUserDetails({...updatedUserDetails,[name]:value})
    
  }
  return (
    <>
      <img src={profileEditIcon} id="myBtnEdit" onClick={()=>{setModalIsOpen(true)}}></img>
      <div className={`${modalIsOpen?'modal-overlay show-modal' : 'modal-overlay'}`}>
      <div className='add-details-modal-container'>
        {/* <h3>Change Profile Picture</h3> */}
        <button className='close-modal-btn' onClick={()=>{setModalIsOpen(false)}}>
          <FaTimes></FaTimes>
        </button>
        <form className="form-group"   enctype="multipart/form-data" onSubmit={handleSubmit}>
          <label>
            Update Details :
          </label>
          <div>
            <label className="label1" htmlFor="userName">
              User Name :
            </label>    
            <input 
                type="text"
                className='inputDetails' 
                name="userName"
                placeholder='update your name...'
                value={updatedUserDetails.userName}
                onChange={handleChange}/><br/><br/>
          </div>
          <div>
            <label className="label1" htmlFor="nomineeName">
              Nominee Name :
            </label>    
            <input 
                type="text"
                className='inputDetails' 
                name="nomineeName"
                placeholder='update your name...'
                value={updatedUserDetails.nomineeName}
                onChange={handleChange}/><br/><br/>
          </div>
          <div>
            <label className="label1" htmlFor="userPhnNumber">
              User Email :
            </label>    
            <input 
                type="text"
                className='inputDetails' 
                name="userPhnNumber"
                placeholder='update your name...'
                value={updatedUserDetails.userPhnNumber}
                onChange={handleChange}/><br/><br/>
          </div>
          <div>
            <label className="label1" htmlFor="userBloodGroup">
              User Blood-Group : 
            </label>    
            <input 
                type="text"
                className='inputDetails' 
                name="userBloodGroup"
                placeholder='update your name...'
                value={updatedUserDetails.userBloodGroup}
                onChange={handleChange}/><br/><br/>
          </div>
          <div>
          <button  type="submit">Save</button>
          </div>
        </form>
      </div>
      </div>
      
    </>
  );
};

export default ProfileDetailsModal;
