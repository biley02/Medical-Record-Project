import React, { useState } from "react";

import pdfImage from '../img/pdf-image.png'

const DiseaseContent = ({ id }) => {
  const [disease, setDisease] = useState({
    name: "Disease",
    document: [
      { originalName: "Doc1", filename: "india" },
      { originalName: "Doc1", filename: "india" },
    ],
    medicine: [{ originalName: "Doc1", filename: "india" }],
  });
  return (
      <div className="col-lg-8 col-sm-8 col-12 order-1 order-sm-2" id="pSec9">
        <div className="disease-back-link">
          <a href="/user/profile">
            <i className="fa fa-arrow-left" aria-hidden="true"></i>Disease
          </a>
        </div>
        <div id="sub4">
          <div className="container">
            <div className="add-documents">
              <h5 id="name1" style={{ color: "#070707" }}>
                Disease Name-: {disease.name}
              </h5>
              {/* <button id="myBtn" data-toggle="modal" data-target="#myModal" className="add-documents-button"
                    onclick=oepnModal()>Edit <img src="../img/profile-edit-icon.png">
                </button> */}
            </div>
            <div className="disease-flexbox">
              <h5 id="name1" style={{ color: "#383737" }}>
                Uploaded Documents
              </h5>
              {disease.document.map((doc, index) => (
                <div
                  className="media"
                  style={{ background: "rgb(179, 232, 241)" }}
                >
                  <img
                    className="pdf-img align-self-center mr-3"
                    src={pdfImage}
                    alt="Generic placeholder image"
                    style={{ width: "80px" }}
                  />
                  <div
                    style={{ display: "inline-block" }}
                    className="media-heading align-self-center"
                  >
                    {doc.originalName}
                  </div>
                  <div className="media-body">
                    <p>
                      <a
                        href={`/user/download/document/pdf?pdfdownload=${doc.filename}`}
                        style={{ color: "black" }}
                      >
                        <i
                          className="fa fa-download fa-3x"
                          aria-hidden="true"
                        ></i>
                      </a>
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="disease-flexbox sub4-2"> */}
            <h5 id="name1">Medicine</h5>
            {disease.medicine.map((med, index) => (
              <div
                className="media"
                style={{ background: "rgb(179, 232, 241)" }}
              >
                <img
                  className="pdf-img align-self-center mr-3"
                  src={pdfImage}
                  alt="Generic placeholder image"
                  style={{ width: "80px" }}
                />
                <div
                  style={{ display: "inline-block" }}
                  className="media-heading align-self-center"
                  id="mobTitle"
                >
                  {med.originalName}
                </div>
                <div className="media-body">
                  <p>
                    <a
                      href={`/user/download/medicine/pdf?pdfdownload=${med.filename}`}
                      style={{ color: "black" }}
                    >
                      <i
                        className="fa fa-download fa-3x"
                        aria-hidden="true"
                      ></i>
                    </a>
                  </p>
                </div>
              </div>
            ))}
            {/* </div> */}
            {/* <div className="disease-flexbox sub4-2">
                <h5 id="name1">Medicine</h5>
                <%for(var i of disease.medicine){%>
                    <div className="media" style="background: rgb(179, 232, 241)">
                        <img className="pdf-img align-self-center mr-3" src="../img/pdf-image.png"
                            alt="Generic placeholder image" style="width: 80px" />
                        <div style="display: inline-block" className="media-heading align-self-center" id="mobTitle">
                            <%=i.originalName%>
                        </div>
                        <div className="media-body">
                            <p>
                                <a href="/user/download/medicine/pdf?pdfdownload=<%=i.filename%>"
                                    style="color: black"><i className="fa fa-download fa-3x" aria-hidden="true"></i></a>
                            </p>
                        </div>
                    </div>
                    <%}%>
            </div> */}
          </div>
        </div>
      </div>
   
  );
};

export default DiseaseContent;
