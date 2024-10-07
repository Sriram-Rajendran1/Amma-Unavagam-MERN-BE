const express = require("express");
const {
  authorizeMiddleware,
  authorizeAdminMiddleware,
} = require("../Middleware/authorizeMiddleware");
const {
  postMenuController,
  getMenuController,
  getMenubyMealtypeController,
  getMenubyIDController,
  deleteMenubyIDController,
  updateMenuController,
} = require("../Controller/menuController");

const router = express.Router();

router.post(
  "/postmenu",
  authorizeMiddleware,
  authorizeAdminMiddleware,
  postMenuController
);
router.put(
  "/editmenu",
  authorizeMiddleware,
  authorizeAdminMiddleware,
  updateMenuController
);
router.get("/getmenu", getMenuController);
router.get("/getmenu/:id", authorizeMiddleware, getMenubyIDController);
router.get("/getbymeal", authorizeMiddleware, getMenubyMealtypeController);
router.delete(
  "/getmenu/:id",
  authorizeMiddleware,
  authorizeAdminMiddleware,
  deleteMenubyIDController
);

module.exports = router;
