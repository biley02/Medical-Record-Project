import React from "react";
import "../styles/home.css";

const Service = ({ title, card_img, desc }) => {
  return (
    <div className="col-md-4">
      <div
        style={{ backgroundColor: "rgb(211, 247, 247)" }}
        className="service-box"
      >
        <div className="service-ico">
          <span className="ico-circle">
            <i className={card_img}></i>
          </span>
        </div>
        <div className="service-content">
          <h2 className="s-title">{title}</h2>
          <p className="s-description text-center">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default Service;
