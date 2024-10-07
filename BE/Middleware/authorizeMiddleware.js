const authModel = require("../Model/authModel");
const jwt = require("jsonwebtoken");

const authorizeMiddleware = (req, res, next) => {
  try {
    const reqHeader = req.headers.authorization;

    if (!reqHeader) {
      return res
        .status(401)
        .json({ message: "Authorization header missing or malformed." });
    }

    const token = reqHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "No token provided." });
    }
    const decodetoken = jwt.verify(token, process.env.JWT_SECRET);
    userID = decodetoken.id;
    next();
  } catch (error) {
    return res.status(500).json({
      status: `Failed`,
      message: `Internal Server Error - during authorization - middleware`,
      error,
      errormessage: error.message,
    });
  }
};

const authorizeAdminMiddleware = async (req, res, next) => {
  const checkadmin = await authModel.findById(userID);
  if (!checkadmin || checkadmin.role !== "admin") {
    return res
      .status(404)
      .json({ status: "Failed", message: `Your are not authorized` });
  }
  next();
};

module.exports = { authorizeMiddleware, authorizeAdminMiddleware };
