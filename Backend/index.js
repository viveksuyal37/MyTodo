const express = require("express");
const app = express();
require("dotenv").config({ path: "./config/.env" });
const PORT = process.env.PORT || 5000;
const router = require("./routes/user.js");
const errorMiddleware = require("./middlewares/error");
const dbConnect = require("./config/dbConnect");
const cors= require("cors")

dbConnect();

//body parser
app.use(express.json());

//cors
app.use(cors())

//routes
app.use("/user", router);

//custom error middleware
app.use(errorMiddleware);

app.listen(process.env.PORT, (err) => {
  if (err) return console.log(err);

  console.log(`Server running on port ${PORT}`);
});
