const globalHandlerError = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "fail";
  res.status(error.statusCode).json({
    status: error.status,
    error: error,
    stack: error.stack,
  });
};

module.exports = { globalHandlerError };
