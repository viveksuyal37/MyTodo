const Users = require("../models/UserModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const registerController = async (req, res, next) => {
  try {
    let { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("All fields are required..!", 400));
    }

    // req validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ success: false, errors: errors.array() });
    }

    //find duplicate email
    let DuplicateUser = await Users.findOne({
      email: { $regex: email, $options: "i" },
    });

    if (DuplicateUser) {
      next(new ErrorHandler("This email is already registered with us.", 400));
      return;
    }
    //hashing password
    let salt = await bcrypt.genSalt(10);
    let hashedPassword = await bcrypt.hash(password, salt);

    // creating user
    let newUser = await Users.create({ name, email, password: hashedPassword });

    // providing login token on successfull registration
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = registerController;
