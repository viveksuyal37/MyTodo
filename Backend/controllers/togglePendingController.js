const todo = require("../models/todo");
const ErrorHandler = require("../utils/ErrorHandler");

const togglePendingController = async (req, res, next) => {
  try {
    const todo_id = req.params.id;

    const note = await todo.find({ _id: todo_id });
    console.log(note)
    if (!note) {
      return next(new ErrorHandler("No such note exists!", 400));
    }
    const changednote = await todo.findByIdAndUpdate(
      { _id: todo_id },
      { pending: !note[0].pending },
      { new: true }
    );

    res.json({ success: true, changednote });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};

module.exports = togglePendingController;
