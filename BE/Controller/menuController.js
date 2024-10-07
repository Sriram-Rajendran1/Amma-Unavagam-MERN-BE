const menuModel = require("../Model/menuModel");

const postMenuController = async (req, res) => {
  try {
    const { dish, price, mealtype, image } = req.body;
    const menuexist = await menuModel.findOne({ dish });
    if (menuexist) {
      return res
        .status(404)
        .json({ status: "Failed", message: `${dish}, already exist` });
    }
    const addDish = await menuModel.insertMany({
      dish,
      price,
      mealtype,
      image,
    });

    return res.status(201).json({
      status: "Success",
      message: `${dish}, added successfully`,
      data: addDish,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During posting menulist`,
      error,
      errormessage: error.message,
    });
  }
};

const updateMenuController = async (req, res) => {
  try {
    const { dish, price, mealtype, image } = req.body;
    const availableDish = await menuModel.find({ dish });

    const ID = availableDish.map((item) => item.id);

    if (!availableDish || availableDish.length === 0) {
      return res
        .status(404)
        .json({ status: "Failed", message: `${dish}, not found to edit` });
    }

    const updateDish = await menuModel.findByIdAndUpdate(
      ID.toString(),
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    return res.status(203).json({
      status: "Success",
      message: `${dish}, Successfully Updated`,
      data: updateDish,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During updating menulist`,
      error,
      errormessage: error.message,
    });
  }
};

const getMenuController = async (req, res) => {
  try {
    const menulist = await menuModel.find();

    if (menulist.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: `No dishes available at the moment`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Please find your Menu List`,
      data: menulist,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During getting menulist`,
      error,
      errormessage: error.message,
    });
  }
};

const getMenubyIDController = async (req, res) => {
  try {
    const { id } = req.params;
    const searchbyid = await menuModel.findById(id);

    if (!searchbyid) {
      return res.status(404).json({
        status: "Failed",
        message: `dish not found for the search - ID: ${id}`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Please find you dish for the search ID : ${id}`,
      data: searchbyid,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During getting menubyid`,
      error,
      errormessage: error.message,
    });
  }
};

const getMenubyMealtypeController = async (req, res) => {
  try {
    const { mealtype } = req.query;
    const meal = await menuModel.find({ mealtype });
    const mealmeal = meal.map((item) => item.mealtype);

    if (!mealmeal.includes(mealtype) || meal.length === 0) {
      return res.status(404).json({
        status: "Failed",
        message: `Sorry no ${mealtype}, mealtype found`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `Please find your Menu List`,
      data: meal,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During getting menubymealtype`,
      error,
      errormessage: error.message,
    });
  }
};

const deleteMenubyIDController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(404).json({
        status: "Failed",
        message: `Please Search with Dish ID`,
      });
    }

    const searchbyID = await menuModel.findByIdAndDelete(id);
    if (!searchbyID) {
      return res.status(404).json({
        status: "Failed",
        message: `dish not found for the search - ID: ${id}`,
      });
    }

    return res.status(200).json({
      status: "Success",
      message: `${searchbyID.dish}, Deleted Successfully`,
    });
  } catch (error) {
    return res.status(500).json({
      status: "Failed",
      message: `Internal Server error During getting menubyid`,
      error,
      errormessage: error.message,
    });
  }
};

module.exports = {
  postMenuController,
  getMenuController,
  getMenubyMealtypeController,
  getMenubyIDController,
  deleteMenubyIDController,
  updateMenuController,
};
