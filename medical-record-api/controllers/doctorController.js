const Doctor = require("../models/Doctor");
const User = require("../models/User");
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

module.exports.login_get = (req, res) => {
  // console.log(req.cookies.jwtDoc)
  const token = req.cookies.jwtDoc;
  if (token) {
    setError("success", false, "Doctor already Loged in");
    return res.send(error_msg);
  }
  setError("danger", true, "Doctor not loged in");
  return res.send(error_msg);
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
    console.log("jwtDoc", token);

    res.cookie("jwtDoc", token, { httpOnly: true, maxAge: maxAge * 1000 });
    console.log(doctor);
    setError("success", false, "successfully logged in");
    res.send(error_msg);
  } catch (err) {
    setError("danger", true, "invalid credentials");
    // console.log(err)
    res.send(error_msg);
  }
};

module.exports.accept_appointment = async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    let doctor = req.doctor;
    if (!doctor.requests.includes(user._id)) {
      setError("danger", true, "User with the request doesnt exist");
      return res.send(error_msg);
    }
    doctor.requests.remove(user._id);
    //add the chat with doctor & user
    await doctor.save();
    console.log(doctor);
    setError("success", false, "Accepted request");
    return res.send(error_msg);
  } catch (err) {
    setError("danger", true, "Error while accepting appointment requests");
    return res.send(error_msg);
  }
};

module.exports.get_all_appointments = async (req, res) => {
  try {
    let doctor = req.doctor;
    let appointments = await doctor.populate("requests");
    res.send(appointments);
  } catch (err) {
    setError("danger", true, "Error while fetching all appointment requests");
    return res.send(error_msg);
  }
};
