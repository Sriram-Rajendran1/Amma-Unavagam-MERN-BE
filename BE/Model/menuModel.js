const mongoose = require("mongoose");

const menuModelSchema = new mongoose.Schema({
  dish: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  mealtype: {
    type: String,
    enum: ["breakfast", "lunch", "chats", "dinner"],
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

const menuModel = mongoose.model("menuModel", menuModelSchema);

module.exports = menuModel;
