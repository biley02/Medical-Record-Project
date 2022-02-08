import React from 'react';
import profile from "../img/hospital_img.jpg";
import "../styles/appointment.css";

export default function UserAppointment() {
  return (
    <>
      <div class="col-lg-8 col-sm-8 col-12 order-1 order-sm-2" id="pSec2" style={{padding: "5px 30px"}}>
      
        <div class="row row-cols-1 row-cols-md-3 g-4" >
                    <div class="col-6 col-md-4 mycardmargin">
                        <div class="card h-100 shadow-sm bg-body rounded" style={{border:"none"}}>
                            <img src={profile} class="card-img-top" alt="..." height={180} />
                            <div class="card-body">
                                <div class="p_title">
                                    <p>Doctor's Name</p>
                                    <p>Hospital Name</p>
                                    <p>Specialization</p>
                                </div>
                                <div style={{marginLeft:"4px"}}>
                                    <p> : Arnab Gogoi</p>
                                    <p> : AMCH</p>
                                    <p> : cardiologist</p>
                                </div>
                            </div>
                            <div class="card-footer footer1">
                                <h6>5 days left</h6>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="button1 shadow-sm bg-body rounded mx-2" type="button">Chat</button>
                                    <button class="button1 shadow-sm bg-body rounded" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 mycardmargin">
                        <div class="card h-100 shadow-sm bg-body rounded" style={{border:"none"}}>
                            <img src={profile} class="card-img-top" alt="..." height={180} />
                            <div class="card-body">
                                <div class="p_title">
                                    <p>Doctor's Name</p>
                                    <p>Hospital Name</p>
                                    <p>Specialization</p>
                                </div>
                                <div style={{marginLeft:"4px"}}>
                                    <p> : Arnab Gogoi</p>
                                    <p> : AMCH</p>
                                    <p> : cardiologist</p>
                                </div>
                            </div>
                            <div class="card-footer footer1">
                                <h6>5 days left</h6>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="button1 shadow-sm bg-body rounded mx-2" type="button">Chat</button>
                                    <button class="button1 shadow-sm bg-body rounded" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 mycardmargin">
                        <div class="card h-100 shadow-sm bg-body rounded" style={{border:"none"}}>
                            <img src={profile} class="card-img-top" alt="..." height={180} />
                            <div class="card-body">
                                <div class="p_title">
                                    <p>Doctor's Name</p>
                                    <p>Hospital Name</p>
                                    <p>Specialization</p>
                                </div>
                                <div style={{marginLeft:"4px"}}>
                                    <p> : Arnab Gogoi</p>
                                    <p> : AMCH</p>
                                    <p> : cardiologist</p>
                                </div>
                            </div>
                            <div class="card-footer footer1">
                                <h6>5 days left</h6>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="button1 shadow-sm bg-body rounded mx-2" type="button">Chat</button>
                                    <button class="button1 shadow-sm bg-body rounded" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-6 col-md-4 mycardmargin">
                        <div class="card h-100 shadow-sm bg-body rounded" style={{border:"none"}}>
                            <img src={profile} class="card-img-top" alt="..." height={180} />
                            <div class="card-body">
                                <div class="p_title">
                                    <p>Doctor's Name</p>
                                    <p>Hospital Name</p>
                                    <p>Specialization</p>
                                </div>
                                <div style={{marginLeft:"4px"}}>
                                    <p> : Arnab Gogoi</p>
                                    <p> : AMCH</p>
                                    <p> : cardiologist</p>
                                </div>
                            </div>
                            <div class="card-footer footer1">
                                <h6>5 days left</h6>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button class="button1 shadow-sm bg-body rounded mx-2" type="button">Chat</button>
                                    <button class="button1 shadow-sm bg-body rounded" type="button">Delete</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    
                   </div>
      </div>
    </>
  );
}