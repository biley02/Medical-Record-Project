const mongoose = require("mongoose");
const Hospital = require("./Hospital");

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

  // `date` must be of type Date. The default value is the current date
  userCreated: {
    type: Date,
    default: Date.now,
  },
});

// This creates our model from the above schema, using mongoose's model method
const Doctor = mongoose.model("Doctor", DoctorSchema);

// Export the Doctor model
module.exports = Doctor;
