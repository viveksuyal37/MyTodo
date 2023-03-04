const todo = require("../models/todo");

const deleteTodoController = async (req, res, next) => {
  try {
    const todo_id = req.params.id;
    console.log(todo_id)
    await todo.findByIdAndDelete({ _id: todo_id });

    res.json({ success: true, msg: "deleted successfully." });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteTodoController;
