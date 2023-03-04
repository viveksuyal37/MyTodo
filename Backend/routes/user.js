const express = require("express");
const verifyAuth = require("../middlewares/verifyAuth");
const registerController = require("../controllers/registerController");
const loginController = require("../controllers/loginController");
const addTodoController = require("../controllers/addTodoController");
const viewTodosController = require("../controllers/viewTodoController");
const updateTodoController = require("../controllers/updateTodoController");
const togglePendingController = require("../controllers/togglePendingController");
const deleteTodoController = require("../controllers/deleteTodoController");
const { body } = require("express-validator");
const router = express.Router();

//route1: Register user and login

router.post(
  "/register",
  [
    [
      body("email", "Enter a valid email..!").isEmail(),
      body("password", "Min 8 characters are reqiured in password..!").isLength(
        {
          min: 8,
        }
      ),
    ],
  ],
  registerController,
  loginController
);

//route2: login User

router.post(
  "/login",
  [
    [
      body("email", "Enter a valid email..!").isEmail(),
      body("password", "Min 8 characters are reqiured in password..!").isLength(
        {
          min: 8,
        }
      ),
    ],
  ],
  loginController
);

//route3: Add note (required login)

router.post("/add-todo", verifyAuth, addTodoController);

//route4: view notes (required login) --------- will not show other user's todos.

router.get("/view-todos", verifyAuth, viewTodosController);

//route4: update note by id (required login)
//route5: delete note by id (required login)
router.route("/todo/:id").put(verifyAuth, updateTodoController).delete(verifyAuth, deleteTodoController);

//route6: (toggle pending) note by id (required login)

router.put("/toggle-pending/to-do/:id", verifyAuth, togglePendingController);




module.exports = router;
