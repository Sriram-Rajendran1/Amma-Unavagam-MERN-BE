const express = require("express");
const {
  authorizeMiddleware,
  authorizeAdminMiddleware,
} = require("../Middleware/authorizeMiddleware");
const {
  postOrder,
  getOrder,
  getUserOrder,
  updateOrderStatusController,
} = require("../Controller/orderController");

const router = express.Router();

router.post("/postorder", postOrder);
router.get("/getallorder/", authorizeMiddleware, getUserOrder);
router.get("/getorder/:id", authorizeMiddleware, getOrder);
router.put(
  "/updatestatus/:id",
  authorizeMiddleware,
  authorizeAdminMiddleware,
  updateOrderStatusController
);

module.exports = router;
