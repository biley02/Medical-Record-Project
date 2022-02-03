const User = require("../models/User");
const Hospital = require("../models/Hospital");
const jwt = require("jsonwebtoken");
const { signupMail, passwordMail } = require("../config/nodemailer");
const path = require("path");
const Disease = require("../models/Disease");
const Nominee = require("../models/Nominee");
const Relations = require("../models/Relations");
const { handleErrors, generateShortId } = require("../utilities/Utilities");
const crypto = require("crypto");
require("dotenv").config();
const { nanoId } = require("nanoid");
const mongoose = require("mongoose");
const { setegid } = require("process");

const maxAge = 30 * 24 * 60 * 60;

const error_msg = { type: "", show: false, msg: "" };

const setError = (type = "", show = false, msg = "") => {
  error_msg.type = type;
  error_msg.show = show;
  error_msg.msg = msg;
};

module.exports.editDetails_post = async (req, res) => {
  try {
    const user = req.user;
    console.log("details", req.body);
    const Nname = req.body.nomineeName;
    const Nemail = req.body.nomineeEmail;
    const NphoneNumber = req.body.nomineePhnNumber;
    let address = req.body.address;

    console.log(user);

    if ((Nemail || NphoneNumber) && !Nname) {
      setError("danger", true, "Nominee name can't be empty");
      return res.send({ error_msg });
    }

    // Nemail = req.body.nomineeEmail ? req.body.nomineeEmail : "";
    // NphoneNumber = req.body.nomineePhn ? req.body.nomineePhnNumber : "";

    if (!address && !Nname) {
      setError("danger", true, "Set field to update details");
      return res.send({ error_msg });
    }
    address = req.body.address ? req.body.address : user.address;
    const nominee = await new Nominee({
      name: Nname,
      email: Nemail,
      phoneNumber: NphoneNumber,
    }).save();
    if (!nominee) {
      setError("danger", true, "Unable to save the details");
      return res.send({ error_msg });
    }
    console.log("nominee saveddddd", nominee);
    let newuser = await User.findByIdAndUpdate(user._id, {
      address: address,
    });

    if (Nname) {
      const finalUser = await User.findByIdAndUpdate(user._id, {
        nominee: nominee._id,
      });
      console.log("final user", finalUser);
    }

    setError("success", false, "User details updated");
    return res.send({ error_msg });
  } catch (e) {
    // console.log("error",e)
    setError("danger", true, "error while editing profile details");
    res.send({ error_msg });
  }
};

module.exports.userHospitalId_post = async (req, res) => {
  try {
    const id = req.body.userHospitalId;
    const token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    // res.cookie("userHospitalId", token, {
    //   httpOnly: true,
    //   maxAge: maxAge * 1000,
    // });
    setError("success", true, "token set");
    res.send({ error_msg, token });
  } catch (e) {
    console.log(e);
  }
};

module.exports.userHospital_post = async (req, res) => {
  try {
    const token = req.body.userHospitalId;
    // console.log(req.body);
    if (!token) {
      setError("danger", true, "id not found");
      res.send({ error_msg });
    }
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, async (err, decodedToken) => {
        if (err) {
          console.log("err", err.message);

          // res.redirect('/user/login')
        } else {
          const hospital = await Hospital.findById(decodedToken.id);

          // if null then redirect to signup
          if (hospital == null) {
            // req.flash("error_msg", "You do not have an account yet, kindly sign up for one");
            // res.clearCookie('jwt')
            // res.redirect("/hospita/signup");
            setError("danger", true, "Hospital not found");
            return res.send({ error_msg });
          }
          //   console.log(disease);

          setError("success", false, "View Details");
          res.send({ error_msg, hospital });
        }
      });
    }
  } catch (e) {
    console.log(e);
  }
};

// controller actions
module.exports.signup_get = (req, res) => {
  const token = req.cookies.jwt;
  console.log("check user logged in or not");
  if (token) {
    setError(
      "success",
      true,
      "User already Loged in,please logout to register new user"
    );
    return res.send(error_msg);
  }
};

module.exports.login_get = (req, res) => {
  // console.log(req.cookies.jwt)
  const token = req.cookies.jwt;
  if (token) {
    setError("success", false, "User already Loged in");
    return res.send(error_msg);
  }
  setError("danger", true, "User not loged in");
  return res.send(error_msg);
};

module.exports.signup_post = async (req, res) => {
  const { name, email, password, confirmPassword, phoneNumber } = req.body;
  const nominee = null;
  // console.log("in sign up route",req.body);
  if (password != confirmPassword) {
    setError("danger", true, "Password do not match");
    return res.send(error_msg);
  }

  try {
    const userExists = await User.findOne({ email });
    console.log("userexists", userExists);
    console.log(User);

    if (userExists) {
      setError("success", false, "user already exists try login in");
      return res.send(error_msg);
    }
    const short_id = generateShortId(name, phoneNumber);
    // console.log("Short ID generated is: ", short_id)
    const user = new User({
      email,
      name,
      password,
      phoneNumber,
      short_id,
      nominee,
    });
    let saveUser = await user.save();
    console.log(saveUser);
    setError("success", false, "user registered mail has been sent");
    // signupMail(saveUser, req.hostname, req.protocol);
    //res.send(saveUser)
    res.send(error_msg);
  } catch (err) {
    const errors = handleErrors(err);
    // console.log(errors)

    var message = "Could not signup. ".concat(
      errors["email"] || "",
      errors["password"] || "",
      errors["phoneNumber"] || "",
      errors["name"] || ""
    );
    //res.json(errors);
    req.flash("error_msg", message);
    res.status(400).redirect("/user/signup");
  }
};
module.exports.emailVerify_get = async (req, res) => {
  try {
    const userID = req.params.id;
    const expiredTokenUser = await User.findOne({ _id: userID });
    const token = req.query.tkn;
    // console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        req.flash(
          "error_msg",
          " Your verify link had expired. We have sent you another verification link"
        );
        signupMail(expiredTokenUser, req.hostname, req.protocol);
        return res.redirect("/user/login");
      }
      const user = await User.findOne({ _id: decoded.id });
      if (!user) {
        // console.log('user not found')
        res.redirect("/");
      } else {
        const activeUser = await User.findByIdAndUpdate(user._id, {
          active: true,
        });
        if (!activeUser) {
          // console.log('Error occured while verifying')
          req.flash("error_msg", "Error occured while verifying");
          res.redirect("/");
        } else {
          req.flash("success_msg", "User has been verified and can login now");
          // console.log('The user has been verified.')
          // console.log('active', activeUser)
          res.redirect("/user/login");
        }
      }
    });
  } catch (e) {
    // console.log(e)
    //signupMail(user,req.hostname,req.protocol)
    res.redirect("/user/login");
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  // console.log('in Login route')
  //  console.log('req.body',req.body)
  try {
    const user = await User.login(email, password);
    // console.log("user",user)

    const userExists = await User.findOne({ email });
    //    console.log("userexsits",userExists)

    if (!userExists.active) {
      const currDate = new Date();
      const initialUpdatedAt = userExists.updatedAt;
      const timeDiff = Math.abs(
        currDate.getTime() - initialUpdatedAt.getTime()
      );
      if (timeDiff <= 10800000) {
        // console.log("Email already sent check it")
        setError("danger", true, "email has been sent please verify");

        return res.send(error_msg);
      }
      // req.flash(
      //     'success_msg',
      //     `${userExists.name}, your verify link has expired we have sent you another email please check you mailbox`
      // )
      setError(
        "danger",
        true,
        `${userExists.name}, your verify link has expired we have sent you another email please check you mailbox`
      );
      signupMail(userExists, req.hostname, req.protocol);
      await User.findByIdAndUpdate(userExists._id, { updatedAt: new Date() });
      // console.log('userExists',userExists)
      // res.redirect('/user/login')
      return res.send(error_msg);
    }

    const token = user.generateAuthToken(maxAge);
    console.log(token);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

    setError("success", false, "successfully logged in");
    res.send(error_msg);
  } catch (err) {
    setError("danger", true, "invalid credentials");
    // console.log(err)
    res.send(error_msg);
  }
};
module.exports.upload_post = async (req, res) => {
  try {
    let { name } = req.body;
    const files = req.files;
    // console.log(files);
    dname = name.toLowerCase();
    const medicine = files.medicine;
    // console.log("Medicineeeeeee", medicine);
    const document = files.document;
    const user = req.user;
    const userDisease = await user.populate("disease");
    // console.log("diseasesssssssss", userDisease);
    const existName = userDisease.disease.find(
      (data) => data.name.toLowerCase() === dname
    );

    if (existName) {
      const existDisease = await Disease.findById({ _id: existName._id });
      var medicinedoc = medicine
        ? {
            originalName: medicine[0].originalname,
            filename: `/uploads/${req.user.email}/${dname}/${medicine[0].filename}`,
          }
        : null;

      var documentdoc = document
        ? {
            originalName: document[0].originalname,
            filename: `/uploads/${req.user.email}/${dname}/${document[0].filename}`,
          }
        : null;

      if (medicinedoc) await existDisease.medicine.push(medicinedoc);
      if (documentdoc) await existDisease.document.push(documentdoc);
      await existDisease.save();

      await Disease.findByIdAndUpdate(
        { _id: existDisease._id },
        {
          medicine: existDisease.medicine,
          document: existDisease.document,
        }
      );
      // console.log("This is updated new disease", existDisease);
      // console.log(user);
    } else {
      var medicinedoc = medicine
        ? {
            originalName: medicine[0].originalname,
            filename: `/uploads/${req.user.email}/${dname}/${medicine[0].filename}`,
          }
        : null;
      var documentdoc = document
        ? {
            originalName: document[0].originalname,
            filename: `/uploads/${req.user.email}/${dname}/${document[0].filename}`,
          }
        : null;
      const newDisease = await new Disease({
        name,
      });
      // console.log("Medicine doc ", medicinedoc);
      // console.log("This is new disease", newDisease);
      if (medicinedoc) await newDisease.medicine.push(medicinedoc);
      if (documentdoc) await newDisease.document.push(documentdoc);
      await newDisease.save();
      // console.log("This is updated new disease ", newDisease);

      await Disease.findByIdAndUpdate(
        { _id: newDisease._id },
        {
          medicine: newDisease.medicine,
          document: newDisease.document,
        }
      );

      let diseaseArr = user.disease;
      diseaseArr.push(newDisease._id);

      await User.findByIdAndUpdate(
        { _id: user._id },
        {
          disease: diseaseArr,
        }
      );
      // console.log(user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports.disease_post = async (req, res) => {
  // const userId = req.body;
  // const params = new URLSearchParams(userId);
  // const id = params.get("id");

  // const disease = await Disease.findOne({ _id: id });
  // console.log("disease",disease)
  // const hospitals = await Relations.find({
  //   userId: req.user._id,
  //   isPermitted: true,
  // }).populate("hospitalId", "hospitalName");
  // console.log('user',req.user)
  // res.locals.user = await req.user.populate("disease").execPopulate();
  // console.log('diseases',Userdiseases)
  console.log("disease id", req.body);
  const { diseaseId } = req.body;
  const disease = await Disease.findOne({ _id: diseaseId });
  console.log(disease);
  res.send(disease);
  // console.log(diseaseId)
  //   console.log("in disease page")
};

module.exports.profile_get = async (req, res) => {
  //res.locals.user = req.user
  // res.locals.user = await req.user.populate('disease').execPopulate()
  // console.log('user id',req.user)
  // console.log("locals",res.locals.user)
  // console.log('id',req.user._id)
  // const user=req.user
  // const hospitals = await Relations.find({'userId':req.user._id,'isPermitted':true}).populate('hospitalId','hospitalName')
  // const nominee= await req.user.populate('nominee').execPopulate()// to be optimised by gaurav
  // console.log('hospitals',nominee)
  // const profilePath=path.join(__dirname,`../../public/uploads/${user.email}/${user.profilePic}`)
  // console.log(profilePath)
  // res.render('./userViews/profile', {
  //     path: '/user/profile',
  //     hospitals:hospitals,
  //     nominee,
  //     // profilePath
  //   })
  //   console.log("in profile page")
  // const token=req.cookies.jwt
  // console.log('token backend',token)
  // console.log(req.user)
  const user = req.user;
  const nominee = await user.populate("nominee");
  console.log("nominee", nominee);
  const disease = await user.populate("disease", "name");
  // console.log("diseasessssss", disease);
  const hospitals = await Relations.find({
    userId: req.user._id,
    isPermitted: true,
  }).populate("hospitalId", "hospitalName");
  // console.log("disease",disease)
  // console.log(user,disease)
  res.send({ user, disease, hospitals, nominee });
};

module.exports.logout_get = async (req, res) => {
  // res.cookie('jwt', '', { maxAge: 1 });
  // const cookie = req.cookies.jwt
  console.log("user logged out");
  res.clearCookie("jwt");

  setError("success", true, "Successfully logged out");
  res.send(error_msg);
  // req.flash('success_msg', 'Successfully logged out')
  // res.redirect('/user/login')
};

// module.exports.upload_get =async (req, res) => {
//   res.render("multer")
// }

module.exports.getForgotPasswordForm = async (req, res) => {
  res.render("./userViews/forgotPassword");
};

module.exports.getPasswordResetForm = async (req, res) => {
  const userID = req.params.id;
  const user = await User.findOne({ _id: userID });
  const resetToken = req.params.token;
  res.render("./userViews/resetPassword", {
    userID,
    resetToken,
  });
};

module.exports.forgotPassword = async (req, res) => {
  const email = req.body.email;
  const user = await User.findOne({ email });
  if (!user) {
    req.flash("error_msg", "No user found");
    return res.redirect("/user/login");
  }
  // console.log(user)
  const userID = user._id;

  const dt = new Date(user.passwordResetExpires).getTime();
  if (
    (user.passwordResetToken && dt > Date.now()) ||
    !user.passwordResetToken
  ) {
    const resetToken = user.createPasswordResetToken();
    // console.log(user.passwordResetExpires)
    // console.log(user.passwordResetToken)
    await user.save({ validateBeforeSave: false });
    try {
      passwordMail(user, resetToken, req.hostname, req.protocol);
      req.flash("success_msg", "Email sent,please check email");
      res.redirect("/user/forgotPassword");
    } catch (err) {
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      req.flash("error_msg", "Unable to send mail");
      res.redirect("/user/forgotPassword");
    }
  } else {
    req.flash(
      "error_msg",
      "Mail already send,please wait for sometime to send again"
    );
    res.redirect("/user/forgotPassword");
  }
};

module.exports.resetPassword = async (req, res) => {
  try {
    const token = req.params.token;
    const id = req.params.id;
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");
    const user = await User.findOne({
      _id: req.params.id,
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() },
    });
    if (!user) {
      req.flash("error_msg", "No user found");
      return res.redirect("/user/login");
    }
    if (req.body.password !== req.body.cpassword) {
      req.flash("error_msg", "Passwords dont match");
      return res.redirect(`resetPassword/${id}/${token}`);
    } else {
      user.password = req.body.password;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();
      const JWTtoken = await user.generateAuthToken(maxAge);
      // user = user.toJSON()
      res.cookie("jwt", JWTtoken, {
        maxAge: 24 * 60 * 60 * 1000,
        httpOnly: false,
      });
      res.redirect("/user/profile");
    }
  } catch (err) {
    res.send(err);
  }
};
module.exports.hospitalSearch_get = async (req, res) => {
  const userId = req.query;
  const params = new URLSearchParams(userId);
  const id = params.get("id");
  const hospitals = await Hospital.find({ _id: id });
  // console.log(hospitals)
  // res.send(hospital)
  const nominee = await req.user.populate("nominee").execPopulate();
  // console.log('nomineeeee',nominee)
  res.locals.user = req.user;
  res.render("./userViews/Profile", {
    hospitals,
    nominee,
    path: "/user/userHospitalD",
  });
};
module.exports.hospitalSearch_post = async (req, res) => {
  const hospitalName = req.body.hname;

  if (!hospitalName) {
    setError("danger", true, "Enter a Hospital Name");
    res.send({ error_msg });
  }
  try {
    const hospital = await Hospital.find({ hospitalName: hospitalName });
    //    console.log('resukts',hospital)
    if (hospital.length === 0) {
      setError("success", true, "No such Hospital Exists");
      res.send({ error_msg });
    } else {
      setError("success", true, "Hospital Found");
      // res.locals.user = await req.user.populate("disease").execPopulate();
      // console.log("hospital search", hospital);

      // console.log(hospitals)
      // console.log(hospitals)
      res.send({ error_msg, hospital });
    }
  } catch (e) {
    //  console.log("Internal error while searching for hospital");
    console.log(e);
    setError("danger", false, "Error Occured while Searching");
    res.send({ error_msg });
  }
};
module.exports.download = async (req, res) => {
  const downloadpdf = req.query;
  const params = new URLSearchParams(downloadpdf);
  const pathp = params.get("pdfdownload");
  var parts = pathp.split("/");
  var result = parts[parts.length - 1]; //to get the file name
  const type = req.params.type; //to get the type wheather 'medical/documnet'
  let reqPath = path.join(__dirname, `../public/${pathp}/../${type}/${result}`);
  console.log(reqPath);
  res.download(reqPath, (error) => {
    if (error) {
      // req.flash("error_msg", "error while downloading");
      console.log(error);
      return res.send({ error_msg });
    }
    console.log("downloaded");
    res.end();
  });
};
module.exports.picupload_post = async (req, res) => {
  const user = req.user;
  const picPath = user.profilePic;
  User.findOneAndUpdate(
    { _id: user._id },
    { $set: { profilePic: picPath } },
    { new: true },
    (err, doc) => {
      if (err) {
        // console.log("Something wrong when updating data!");
        req.flash("error_msg", "Something wrong when updating data!");
        res.redirect("/user/profile");
      }

      // console.log(doc);
    }
  );
  res.redirect("/user/profile");
};
