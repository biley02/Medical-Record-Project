const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

const {
  requireDocAuth,
  redirectDocIfLoggedIn,
} = require("../middleware/doctorAuth");

const doctorController = require("../controllers/doctorController");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // console.log("in multer",file)
    const doctorEmail = req.doctor.email.toLowerCase();
    var dir = `./public/uploads/${doctorEmail}/doctor/${file.fieldname}`;
    // console.log("dir:",dir)

    if (!fs.existsSync(dir)) {
      //console.log("making files")
      fs.mkdirSync(dir, { recursive: true }, (err) => {
        if (err) console.error("New Directory Creation Error");
      });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    // const userId = req.user._id

    // fileName= path.join(`${file.fieldname}`,`File-${v4()}-${file.originalname}-${path.extname(file.originalname)}`)
    //console.log(fileName)
    const doctor = req.doctor;
    doctor.profilePic = `ProfilePic_${file.originalname}`;
    cb(null, `ProfilePic_${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 6000000 },
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
}

router.get("/profile", requireDocAuth, doctorController.profile_get);
router.get("/public/:id", doctorController.public_profile);
router.post("/login", doctorController.login_post);

module.exports = router;
