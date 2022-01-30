import React, { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router";

import pdfImage from "../img/pdf-image.png";
import axios from "axios";
import Loader from "../LoaderComponents/Loader";
import FileDownload from "js-file-download";
// import { base } from "../../../medical-record-api/models/User";

const baseUrl = "http://localhost:8080/user";

const DiseaseContent = () => {
  const [disease, setDisease] = useState({
    name: "Default Disease",
    document: [],
    medicine: [],
  });

  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    const id = localStorage.getItem("diseaseId");
    console.log("content", id);
    if (!id) {
      setIsLoading(false);
      return;
    }
    axios
      .post(`${baseUrl}/disease`, {
        diseaseId: id,
      })
      .then((res) => {
        // console.log('disease id sent',res.data)
        const details = res.data;
        console.log("diseasData", details);
        setDisease(details);
        console.log("disease state", disease);
        setIsLoading(false);
        return;
      });
  }, []);

  const download = (path, type, originalName) => {
    console.log("...downloading", path, type);
    //"/user/download/document/pdf?pdfdownload=<%=i.filename%>"
    //`${baseUrl}/download/${type}/pdf/?pdfdownload=${path}`
    axios({
      url: `${baseUrl}/download/${type}/pdf/?pdfdownload=${path}`,
      method: "GET",
      responseType: "blob",
    }).then((res) => {
      FileDownload(res.data, `${originalName}`);
    });
  };
  if (isLoading) {
    return <Loader />;
  }
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
                    <a style={{ color: "black" }}>
                      <i
                        className="fa fa-download fa-3x"
                        aria-hidden="true"
                        onClick={() =>
                          download(doc.filename, "document", doc.originalName)
                        }
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
            <div className="media" style={{ background: "rgb(179, 232, 241)" }}>
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
                  <a style={{ color: "black" }}>
                    <i
                      className="fa fa-download fa-3x"
                      aria-hidden="true"
                      onClick={() =>
                        download(med.filename, "medicine", med.originalName)
                      }
                    ></i>
                  </a>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiseaseContent;
