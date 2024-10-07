const authModel = require("../Model/authModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signupController = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      confirmpassword,
      location,
      landmark,
      phone,
    } = req.body;
    const usermatch = await authModel.findOne({ email });

    if (usermatch) {
      return res
        .status(409)
        .json({ status: `Failed`, message: `User aready exist` });
    }

    if (password === confirmpassword) {
      const newuser = new authModel({
        username,
        email,
        password,
        confirmpassword,
        phone,
        location,
        landmark,
      });
      const userdata = await newuser.save();

      const token = jwt.sign({ id: userdata._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(202).json({
        status: "Success",
        message: `User Created Successfully`,
        data: userdata,
        id: userdata._id,
        token,
      });
    } else {
      return res
        .status(401)
        .json({ status: "Failed", message: "Password Mismatch" });
    }
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during signup`,
      error,
      errormessage: error.message,
    });
  }
};

const loginController = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const usermatch = await authModel
      .findOne({ email, username })
      .select("+password");
    if (!usermatch) {
      return res
        .status(404)
        .json({ status: "Failed", message: `user not found please Signup` });
    }
    const passCheck = await bcrypt.compare(password, usermatch.password);

    if (passCheck) {
      const token = jwt.sign({ id: usermatch._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      return res.status(200).json({
        status: "Success",
        message: `Login Successfully`,
        data: {
          username,
          email,
        },
        id: usermatch._id,
        token,
      });
    } else {
      return res
        .status(401)
        .json({ status: "Failed", message: `Invalid Password` });
    }
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during login`,
      error,
      errormessage: error.message,
    });
  }
};

module.exports = { signupController, loginController };
