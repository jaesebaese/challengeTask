//@ts-nocheck
import ErrorResponse from "../utils/errorResponse";

const errorHandler = async (err, req, res, next) => {
  let error = await { ...err };

  if (err.name === "CastError") {
    const message = `Resource not found with id of ${err.value}`;
    error = new ErrorResponse(message, 404);
    // console.log(error, "cast error");
  }

  if (err.code === 11000) {
    const message = `Duplicate resource cannot create`;
    error = new ErrorResponse(message, 400);
    // console.log(error, "duplicate resource error");
  }

  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((val) => val.message);
    error = new ErrorResponse(message, 400);
    // console.log(error, "validation error");
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

module.exports = errorHandler;