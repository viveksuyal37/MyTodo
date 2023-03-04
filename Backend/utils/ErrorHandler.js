//added in util coz we can send status code via this class

class ErrorHandler extends Error {
    constructor(msg, statusCode) {
      super(msg);
      this.statusCode = statusCode;
    }
  }
  
module.exports= ErrorHandler;
  