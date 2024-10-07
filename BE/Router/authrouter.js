const express = require("express");
const {
  signupController,
  loginController,
} = require("../Controller/authController");
const { adminSignup, adminLogin } = require("../Controller/adminController");

const router = express.Router();

router.post("/signup", signupController);
router.post("/login", loginController);
router.post("/admin-signup", adminSignup);
router.post("/admin-login", adminLogin);

module.exports = router;
