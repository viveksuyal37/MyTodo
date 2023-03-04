const ErrorHandler = require("../utils/ErrorHandler");
const todo = require("../models/todo");

const addTodoController = async (req, res, next) => {
  try {
    const userId = req.id;

    const { note, title } = req.body;

    if(!note|| !title){
      return next(new ErrorHandler("Please provide mandatory fields!", 400))
    }

    const newTodo = await todo.create({
      ...req.body,
      addedBy: userId,
    });

    res.json({ sucess: true, newTodo });
  } catch (error) {
    next(error);
  }
};

module.exports = addTodoController;
