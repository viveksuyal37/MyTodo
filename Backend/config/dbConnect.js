const mongoose = require( "mongoose");

mongoose.set("strictQuery", true);

const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGO_CONN_URI)
    .then(() => {
      console.log("connected to mongodb sucessfully");
    })
    .catch((err) => {
      console.log(err);
      new Error(err);
    });
};

module.exports= dbConnect;
