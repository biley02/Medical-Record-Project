const jwt = require("jsonwebtoken");
const Doctor = require("../models/Doctor");

require("dotenv").config();

const requireDocAuth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    // console.log("tokens",token);
    // console.log("req",req)
    // check json web token exists & is verified
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log(err.message);

          res.redirect("/doctor/login");
        } else {
          let doctor = await Doctor.findById(decodedToken.id);
          // if null then redirect to signup
          if (doctor == null) {
            console.log("doctor not found");
            res.clearCookie("jwt");
            res.redirect("/doctor/signup");
            return;
          }
          //else to profile
          req.doctor = doctor;
          console.log("current doctor", req.doctor);

          next();
        }
      });
    } else {
      res.redirect("/doctor/login");
    }
  } catch (error) {
    res.redirect("/doctor/login");
  }
};

const redirectDocIfLoggedIn = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    console.log("already logged in");
    // req.flash("error_msg", "You are already logged in.");
    // res.redirect("/user/profile")
  } else {
    next();
  }
};

module.exports = { requireDocAuth, redirectDocIfLoggedIn };
