const mongoose = require("mongoose");
const Hospital = require("./Hospital");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const utilities = require("../utilities/Utilities");
const { isEmail } = require("validator");
require("dotenv").config();

// Save a reference to the Schema constructor
const Schema = mongoose.Schema;

const DoctorSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  hospital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Hospital",
    required: true,
  },
  phone: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  YOE: {
    type: String,
  },
  specialization: {
    type: String,
  },
  reg_no: {
    type: String,
    required: true,
    unique: true,
  },
  bio: {
    type: String,
  },
  profilePic: {
    type: String,
    trim: true,
  },
  rating: {
    type: Number,
  },

  // `date` must be of type Date. The default value is the current date
  docCreated: {
    type: Date,
    default: Date.now,
  },
});

// generate passwordResetToken
DoctorSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

// static method to login user
DoctorSchema.statics.login = async function (email, password) {
  const doctor = await this.findOne({ email });
  if (doctor) {
    const auth = await bcrypt.compare(password, doctor.password);
    //found bug have to fix the login
    if (auth) {
      return doctor;
    }
    throw Error("Invalid Credentials");
  }
  throw Error("Invalid Credentials");
};

//deleting the passsword before sending
DoctorSchema.methods.toJSON = function () {
  const doctor = this;
  const doctorObject = doctor.toObject();

  delete doctorObject.password;
  return doctorObject;
};

//To hash the password
DoctorSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// This creates our model from the above schema, using mongoose's model method
const Doctor = mongoose.model("Doctor", DoctorSchema);

// Export the Doctor model
module.exports = Doctor;
