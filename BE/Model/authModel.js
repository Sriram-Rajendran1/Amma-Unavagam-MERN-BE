const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//need to implement schema validations

const authModelSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      select: false,
      type: String,
      required: true,
    },
    confirmpassword: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
    },
    newpassword: {
      type: String,
    },
    location: {
      type: String,
    },
    landmark: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

authModelSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    try {
      this.password = await bcrypt.hash(this.password, 12);
      this.confirmpassword = undefined;
      next();
    } catch (error) {
      return next(error);
    }
  } else {
    next();
  }
});

const authModel = mongoose.model("authModel", authModelSchema);

module.exports = authModel;
