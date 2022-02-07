const Doctor = require("../models/Doctor");
const { handleErrors, generateShortId } = require("../utilities/Utilities");
const crypto = require("crypto");

const jwt = require("jsonwebtoken");

const { setegid } = require("process");
const { set } = require("mongoose");
require("dotenv").config();
const maxAge = 30 * 24 * 60 * 60;

const error_msg = { type: "", show: false, msg: "" };

const setError = (type = "", show = false, msg = "") => {
  error_msg.type = type;
  error_msg.show = show;
  error_msg.msg = msg;
};

module.exports.profile_get = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor._id);
    res.send(doctor);
  } catch (err) {
    console.log(err);
  }
};

module.exports.public_profile = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    let publicDoctor = {
      name: doctor.name,
      hospital: doctor.hospital,
      email: doctor.email,
      YOE: doctor.YOE,
      specialization: doctor.specialization,
      reg_no: doctor.reg_no,
      bio: doctor.bio,
      profilePic: doctor.profilePic,
      rating: doctor.rating,
    };
    console.log(publicDoctor);
    res.send(publicDoctor);
  } catch (err) {
    console.log(err);
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const doctor = await Doctor.login(email, password);
    console.log(doctor);
    const token = jwt.sign(
      {
        email: req.body.email,
        id: doctor._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: maxAge,
      }
    );
    console.log(token);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(doctor);
    setError("success", false, "successfully logged in");
    res.send(error_msg);
  } catch (err) {
    setError("danger", true, "invalid credentials");
    // console.log(err)
    res.send(error_msg);
  }
};
