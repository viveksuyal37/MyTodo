const todo = require("../models/todo");
const ErrorHandler = require("../utils/ErrorHandler.js");

const updateTodoController = async (req, res, next) => {
  try {
    const todoId = req.params.id;

    const { title, note } = req.body;

    if (!title || !note) {
      return next(new ErrorHandler("Please provide necessary fields!", 400));
    }
    const updatedtodo = await todo.findByIdAndUpdate(
      { _id: todoId },
      { ...req.body },
      { new: true }
    );

    res.json({ sucess: true, updatedtodo });
  } catch (error) {
    next(error);
  }
};

module.exports = updateTodoController;
