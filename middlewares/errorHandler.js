const AppError = require("../utils/AppError");

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json(formatError(error.message));
  }

  // Mongoose dublicateKey error
  if (error.code == 11000) {
    return res
      .status(400)
      .json(
        formatError(`This ${Object.keys(error.keyValue)[0]} is already taken`)
      );
  }

  // Mongoose validation error
  if (error.name == "ValidationError") {
    return res.status(400).json(formatError(error.message));
  }

  // Mongoose cast error
  if (error.name == "CastError") {
    return res
      .status(400)
      .json(formatError(`Cast Error for ${error.path}: ${error.value}`));
  }

  // JWT Errors

  // Invalid token
  if (error.name === "JsonWebTokenError") {
    return res.status(401).json(formatError("Invalid token"));
  }

  // Token expired
  if (error.name === "TokenExpiredError" || error.name === "NotBeforeError") {
    return res.status(401).json(formatError("Token expired"));
  }

  // Formatting function to ensure consistency in error structure
  function formatError(message) {
    return {
      status: "Failure",
      message,
    };
  }
};

module.exports = errorHandler;
