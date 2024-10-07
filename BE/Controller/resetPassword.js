const authModel = require("../Model/authModel");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

const verifyUserExist = async (req, res) => {
  try {
    const { email } = req.body;
    const emailExist = await authModel.find({ email });
    const ei = emailExist.map((item) => item._id);
    const e_id = ei.toString();
    const em = emailExist.map((item) => item.email);

    if (email !== em[0]) {
      return res.status(404).json({
        status: "Failed",
        message: `invalid email id or email does not exist`,
      });
    }

    const token = jwt.sign({ id: e_id }, process.env.JWT_RESET, {
      expiresIn: "1h",
    });

    return res
      .status(200)
      .json({ status: "Success", message: "email found successfully", token });
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during resetpassword`,
      error,
      errormessage: error.message,
    });
  }
};

const resetpasstry = async (req, res) => {
  try {
    const { email, password, newpassword } = req.body;

    const reqHeader = req.headers.authorization;
    const token = reqHeader.split(" ")[1];
    const decodetoken = jwt.verify(token, process.env.JWT_RESET);
    const validate = await authModel
      .findById(decodetoken.id)
      .select("+password");

    const userEmail = validate.email.trim().toLowerCase();
    const providedEmail = email.trim().toLowerCase();

    if (userEmail !== providedEmail) {
      return res.status(404).json({
        status: "Failed",
        message: `invalid email id or email does not exist`,
        userEmail,
        providedEmail,
      });
    }

    console.log(password);
    console.log(newpassword);

    const passCompare = await bcrypt.compare(password, validate.password);

    if (!passCompare) {
      return res.status(404).json({
        status: "Failed",
        message: `Password does not match with old password`,
      });
    }

    const hashed = await bcrypt.hash(newpassword, 12);
    console.log(hashed);

    const updatepass = await authModel.findByIdAndUpdate(
      decodetoken.id,
      { password: hashed },
      { new: true, runValidators: true }
    );

    return res.status(203).json({
      status: "Success",
      message: `Password updated successfully`,
      data: updatepass,
    });
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during pass-reset`,
      error,
      errormessage: error.message,
    });
  }
};

module.exports = { verifyUserExist, resetpasstry };
