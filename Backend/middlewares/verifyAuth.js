const ErrorHandler = require( "../utils/ErrorHandler.js");
const jwt = require( "jsonwebtoken");

const verifyAuth = async (req, res, next) => {
  
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      next(new ErrorHandler("Please send token with specifying bearer.", 401));
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        return next(new ErrorHandler("session expired please relogin", 401));
      }
      req.user = decoded.user;
      req.id = decoded.id;
      next();
    });
  } else {
    next(new ErrorHandler("No auth token received", 401));
  }
};

module.exports= verifyAuth;
