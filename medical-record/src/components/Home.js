import React from "react";
import "../styles/home.css";

const Home = () => {
  return (
    <div>
      <div className="container-fluid arogya-banner-area">
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <h1>
                {" "}
                Virtual <span>Healthcare</span> for you .{" "}
              </h1>
              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                rhoncus turpis nisl.{" "}
              </p>
              <a href="/user/login">
                Get Started{" "}
                <i className="fa fa-angle-right" aria-hidden="true"></i>
              </a>
            </div>
            <div className="col-md-6">
              <div className="card">
                <img
                  className="card-img-top img-fluid"
                  src="/img/aboutus-logo-1 (1).png"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid arogya-feature" id="services">
        <div className="line-mf"></div>
        <div className="container">
          <div className="row about-us">
            <div className="col-md-7">
              <div className="cover">
                <div className="line-mf1"></div>
              </div>
            </div>

            <div className="col-md-5">
              <h1>
                {" "}
                <span>About us</span>{" "}
              </h1>
              <div></div>

              <br />

              <p>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                rhoncus turpis nisl, vitae dictum mi semper convallis. Ut sapien
                leo, varius ac dapibus a, cursus quis ante.{" "}
              </p>
              <p>
                <small>
                  Nunc sodales lobortis arcu, sit amet venenatis erat placerat
                  a. Donec lacinia magna nulla, cursus impediet augue egestas
                  id. Suspendisse dolor lectus, pellentesque quis tincidunt ac,
                  dictum id neque.
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>

      <section id="service" className="services-mf pt-5 route">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="title-box text-center">
                <div className="line-mf"></div>
                <h3 className="title-a">Services</h3>

                <p id="p2">Explore Our services !</p>
                <div className="line-mf1"></div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-plus-circle"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Emergency</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-ambulance"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Ambulance</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-stethoscope"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Checkup</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-user-md"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Top Doctors</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-credit-card"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Low Price</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div
                style={{ backgroundColor: "rgb(211, 247, 247)" }}
                className="service-box"
              >
                <div className="service-ico">
                  <span className="ico-circle">
                    <i className="fa fa-medkit"></i>
                  </span>
                </div>
                <div className="service-content">
                  <h2 className="s-title">Affordable</h2>
                  <p className="s-description text-center">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
