const express = require("express");
const { authorizeMiddleware } = require("../Middleware/authorizeMiddleware");
const {
  getProfileController,
  updateProfileController,
} = require("../Controller/profileController");

const router = express.Router();

router.get("/profile", authorizeMiddleware, getProfileController);
router.put("/profile", authorizeMiddleware, updateProfileController);

module.exports = router;
