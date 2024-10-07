const authModel = require("../Model/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const getProfileController = async (req, res) => {
  try {
    const reqHeader = req.headers.authorization;
    if (!reqHeader) {
      return res
        .status(401)
        .json({ status: "failed", message: "Token not found" });
    }

    const token = reqHeader.split(" ")[1];

    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodetoken || !decodetoken.id) {
      return res
        .status(404)
        .json({ status: "Failed", message: "invalid token" });
    }
    const userdetails = await authModel.findById(decodetoken.id);
    if (!userdetails) {
      return res
        .status(404)
        .json({ status: "Failed", message: "no user found" });
    }

    return res.status(200).json({
      status: "Success",
      message: "Please find your user details",
      data: userdetails,
    });
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during profile read`,
      error,
      errormessage: error.message,
    });
  }
};

const updateProfileController = async (req, res) => {
  try {
    console.log(req.body);
    const reqHeader = req.headers.authorization;
    if (!reqHeader) {
      return res
        .status(401)
        .json({ status: "failed", message: "Token not found" });
    }

    const token = reqHeader.split(" ")[1];

    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    if (!decodetoken || !decodetoken.id) {
      return res
        .status(404)
        .json({ status: "Failed", message: "invalid token" });
    }

    const availableFields = [
      "username",
      "email",
      "phone",
      "location",
      "landmark",
    ];

    const validFields = Object.keys(req.body);

    console.log(validFields);

    const isvalidFields = validFields.every((validField) =>
      availableFields.includes(validField)
    );

    if (!isvalidFields) {
      return res
        .status(404)
        .json({ status: "failed", message: `invalid field` });
    }

    const updatedProfile = await authModel
      .findByIdAndUpdate(decodetoken.id, req.body, {
        new: true,
        runValidators: true,
      })
      .select("-password");

    return res.status(203).json({
      status: "Success",
      message: `Please find your updated details`,
      data: updatedProfile,
    });
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during profile read`,
      error,
      errormessage: error.message,
    });
  }
};

module.exports = { getProfileController, updateProfileController };
