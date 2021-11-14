import React, { useState } from 'react'

import '../styles/disease.css'

import editIcon from '../img/profile-edit-icon.png'
const UserDiseaseComponent=()=>{

    const [disease,setDisease]=useState({name:''})
    return (
        <div className="col-lg-8 col-sm-8 col-12 order-1 order-sm-2" id="pSec9">
            <div className="disease-back-link"><a href="/user/profile"><i className="fa fa-arrow-left"
            aria-hidden="true"></i>Disease</a></div>
            <div id="sub4">
                <div class="container">
                    <div className="add-documents">
                        <h5 id="name1" style={{color:'#07070'}}>Disease Name-:{disease.name?disease.name:'Default Disease'}</h5>
                        <button id="myBtn"  className="add-documents-button"
                        onclick={''}>Edit <img src={editIcon}/>
                        </button>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default UserDiseaseComponent