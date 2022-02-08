const University = require("../models/University");
const jwt = require("jsonwebtoken");
const { universityMail } = require("../config/nodemailer");
require("dotenv").config();
const { handleErrors, generateShortId } = require("../utilities/Utilities");
const maxAge = 30 * 24 * 60 * 60;

const error_msg = { type: "", show: false, msg: "" };

const setError = (type = "", show = false, msg = "") => {
  error_msg.type = type;
  error_msg.show = show;
  error_msg.msg = msg;
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
  if (password != confirmPassword) {
    setError("danger", true, "Password do not match");
    return res.send(error_msg);
  }

  try {
    const universityExists = await University.findOne({ email });
    if (universityExists) {
      setError("success", false, "user already exists try login in");
      return res.send(error_msg);
    }
    const short_id = generateShortId(name, phoneNumber);
    // console.log("Short ID generated is: ", short_id)
    const university = new University({
      email,
      name,
      password,
      phoneNumber,
      short_id,
    });
    let saveUniversity = await university.save();
    console.log(saveUniversity);
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
    res.status(400).redirect("/university/signup");
  }
};
module.exports.emailVerify_get = async (req, res) => {
  try {
    const userID = req.params.id;
    const expiredTokenUser = await University.findOne({ _id: userID });
    const token = req.query.tkn;
    // console.log(token)
    jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
      if (err) {
        req.flash(
          "error_msg",
          " Your verify link had expired. We have sent you another verification link"
        );
        universityMail(expiredTokenUser, req.hostname, req.protocol);
        return res.redirect("/university/login");
      }
      const university = await University.findOne({ _id: decoded.id });
      if (!university) {
        // console.log('user not found')
        res.redirect("/");
      } else {
        const activeUniversity = await University.findByIdAndUpdate(university._id, {
          active: true,
        });
        if (!activeUniversity) {
          // console.log('Error occured while verifying')
          req.flash("error_msg", "Error occured while verifying");
          res.redirect("/");
        } else {
          req.flash("success_msg", "User has been verified and can login now");
          // console.log('The user has been verified.')
          // console.log('active', activeUser)
          res.redirect("/university/login");
        }
      }
    });
  } catch (e) {
    // console.log(e)
    //signupMail(user,req.hostname,req.protocol)
    res.redirect("/university/login");
  }
};

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  console.log('in Login route')
  //  console.log('req.body',req.body)
  try {
    const university = await University.login(email, password);
    // console.log("user",user)

    const universityExists = await University.findOne({ email });
    //    console.log("userexsits",userExists)

    if (!universityExists.active) {
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
        `${universityExists.name}, your verify link has expired we have sent you another email please check you mailbox`
      );
      universityMail(universityExists, req.hostname, req.protocol);
      await University.findByIdAndUpdate(universityExists._id, { updatedAt: new Date() });
      // console.log('userExists',userExists)
      // res.redirect('/user/login')
      return res.send(error_msg);
    }

    const token = university.generateAuthToken(maxAge);
    console.log(token);

    res.cookie("university", token, { httpOnly: true, maxAge: maxAge * 1000 });

    setError("success", false, "successfully logged in");
    res.send(error_msg);
  } catch (err) {
    setError("danger", true, "invalid credentials");
    // console.log(err)
    res.send(error_msg);
  }
};


module.exports.profile_get = async (req, res) => {
  const university = req.university;
  res.send({ university });
};

module.exports.logout_get = async (req, res) => {
  console.log("user logged out");
  res.clearCookie("jwt");

  setError("success", true, "Successfully logged out");
  res.send(error_msg);
};


