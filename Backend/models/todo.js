const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  link: {
    type: String
  },
  iconUrl:{
    type: String
  },
  pending: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  addedBy: {
    type: String,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("notes", todoSchema);
