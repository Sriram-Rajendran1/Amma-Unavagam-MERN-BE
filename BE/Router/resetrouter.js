const express = require("express");
const {
  verifyUserExist,
  resetpasstry,
} = require("../Controller/resetPassword");

const router = express.Router();

router.post("/verifyreset", verifyUserExist);
router.post("/resetpassword", resetpasstry);

module.exports = router;
