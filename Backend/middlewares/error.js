const errorMiddleware = (err, req, res, next) => {
  let message = err.message || "Internal Server Error";
  let statusCode = err.statusCode || 500;

if(err.name==="TypeError"){
  message=`${err.path}`
}

  res.status(statusCode).json({
    success: false,
    message,
  });
};

module.exports= errorMiddleware;
