const todo = require("../models/todo");

const viewTodoController = async (req, res, next) => {
  try {
    req.query = req.query || {};
    const Todos = await todo
      .find({ addedBy: req.id, ...req.query })
      .populate({ path: "addedBy", select: "-password" });

    res.json({ sucess: true, Todos });
  } catch (error) {
    next(error);
  }
};

module.exports = viewTodoController;
