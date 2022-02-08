const express = require("express");
const router = express.Router();


const {
    requireAuth,
    redirectIfLoggedIn,
  } = require("../middleware/universityAuth");
const universityController = require("../controllers/universityController");
router.get("/verify/:id", universityController.emailVerify_get);
router.get("/signup", universityController.signup_get);
router.post("/signup", universityController.signup_post);
router.get("/login", universityController.login_get);
router.post("/login", universityController.login_post);
router.get("/logout", universityController.logout_get);
router.get("/profile", requireAuth, universityController.profile_get);

module.exports = router;