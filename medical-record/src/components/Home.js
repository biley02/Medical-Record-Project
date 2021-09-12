import React from "react";
import "../styles/home.css";
import img_aboutus from "../img/aboutus-logo-1 (1).png";
import Service from "./Service";

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
                  src={img_aboutus}
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
            <div className="col-md-4">
              <div className="card">
                <img
                  className="card-img-top img-fluid"
                  src={img_aboutus}
                  alt=""
                />
              </div>
            </div>
            <div className="col-md-2"></div>

            <div className="col-md-6">
              <h1>
                {" "}
                <span>About us</span>{" "}
              </h1>

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
            <Service
              title="Emergency"
              card_img="fa fa-plus-circle"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
            <Service
              title="Ambulance"
              card_img="fa fa-ambulance"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
            <Service
              title="Checkup"
              card_img="fa fa-stethoscope"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
            <Service
              title="Top Doctors"
              card_img="fa fa-user-md"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
            <Service
              title="Low Price"
              card_img="fa fa-credit-card"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
            <Service
              title="Affordable"
              card_img="fa fa-medkit"
              desc="Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magni adipisci eaque autem fugiat! Quia, provident vitae!
                    Magni tempora perferendis eum non provident."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
