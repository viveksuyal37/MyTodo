const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: [true, "Password is required..!"],
    minLength: [8, "Password should contain min 8 characters"],
  }
 
});

module.exports = mongoose.model("users", userSchema);
