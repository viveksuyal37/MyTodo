const Users = require("../models/UserModel.js");
const ErrorHandler = require("../utils/ErrorHandler.js");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginController = async (req, res, next) => {
  try {
    // req validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, errors: errors.array() });
    }

    let { email, password } = req.body;

    //find user
    let user = await Users.findOne({ email: { $regex: email , $options:"i"} });

    if (!user) {
      return next(new ErrorHandler("Invalid credentials", 404));
    }

    let matchPassword = await bcrypt.compare(password, user.password);

    if (matchPassword) {
      const token = await jwt.sign(
        {
          user: user.name,
          id: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: "2d" }
      );

      //providing username and role at login with token

      res.json({
        success: true,
        token,
        userinfo: { username: user.name },
      });
    } else {
      next(new ErrorHandler("Invalid credentials", 401));
    }
  } catch (error) {
    next(error);
  }
};

module.exports = loginController;
