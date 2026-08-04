
const errorHandler = (err, req, res, next) => {
  // Log the error stack for debugging in the terminal
  console.error(err.stack);

  // Set the status code (default to 500 Internal Server Error if not specified)
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);

  // Always return a structured JSON response
  res.json({
    success: false,
    message: err.message || "An unexpected error occurred on the server.",
    // Only show the stack trace in development mode for security
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

export default errorHandler;
