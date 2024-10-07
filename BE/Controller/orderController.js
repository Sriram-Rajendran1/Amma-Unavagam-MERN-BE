const orderModel = require("../Model/orderModel");

const postOrder = async (req, res) => {
  try {
    const { dishes, finalprice, status, deliverydetails } = req.body;

    if (dishes.length <= 0 || !dishes) {
      return res.status(404).json({
        status: "failed",
        message: `Your cart is empty, no items found - please check your cart once`,
      });
    }

    const forder = new orderModel({
      dishes,
      finalprice,
      status,
      deliverydetails,
    });
    const finalorder = await forder.save();

    return res.status(201).json({
      status: "Success",
      message: `Your Order placed Successfully`,
      finalorder,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server Error during order submition`,
      error,
      errormessage: error.message,
    });
  }
};

const getUserOrder = async (req, res) => {
  try {
    const orderDetails = await orderModel.find({});
    const checkuser = orderDetails.map((item) => item.user);
    const usercompare = checkuser.toString().split(",");

    const maptofinduser = usercompare.find((item) => item === userID);

    const userOrder = await orderModel.find({ user: maptofinduser });

    return res.status(200).json({
      status: "Success",
      message: `Please find your orders`,
      data: userOrder,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server Error during getting order`,
      error,
      errormessage: error.message,
    });
  }
};

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res
        .status(404)
        .json({ status: "Failed", message: `Please search with Order ID` });
    }

    const orderDetails = await orderModel.findById(id);

    if (!orderDetails || orderDetails.id !== id) {
      return res
        .status(404)
        .json({ status: "Failed", message: `Order ID not Found` });
    }

    return res.status(200).json({
      status: "Success",
      message: `Please find your order`,
      data: orderDetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server Error during getting order`,
      error,
      errormessage: error.message,
    });
  }
};

const updateOrderStatusController = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) {
      return res
        .status(404)
        .json({ status: "Failed", message: `Order ID not Found` });
    }

    const updateOrderStatus = await orderModel.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    return res.status(203).json({
      status: "Success",
      message: `Status Updates Successfully`,
      data: updateOrderStatus,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server Error during  order status change`,
      error,
      errormessage: error.message,
    });
  }
};

module.exports = {
  postOrder,
  getOrder,
  getUserOrder,
  updateOrderStatusController,
};
