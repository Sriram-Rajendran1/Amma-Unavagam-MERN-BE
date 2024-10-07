const mongoose = require("mongoose");
const authModel = require("../Model/authModel");

const orderModelSchema = new mongoose.Schema(
  {
    dishes: [
      {
        dish: {
          required: true,
          type: String,
        },
        price: {
          required: true,
          type: Number,
        },
        mealtype: {
          type: String,
          required: true,
          enum: ["Breakfast", "Lunch", "Dinner"],
        },
        quantity: {
          required: true,
          type: Number,
          default: 1,
        },
        totalprice: {
          type: Number,
          required: true,
        },
      },
    ],
    deliverydetails: {
      name: {
        required: true,
        type: String,
      },
      phone: {
        required: true,
        type: Number,
      },
      landmark: {
        required: true,
        type: String,
      },
      address: {
        required: true,
        type: String,
      },
    },
    finalprice: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["pending", "processing", "completed"],
      default: "pending",
    },
    orderdate: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const orderModel = mongoose.model("orderModel", orderModelSchema);

module.exports = orderModel;
