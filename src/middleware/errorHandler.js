const errorHandler = (handler) => {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
};

const globalErrorHandler = (err, req, res, next) => {
  // Log the error for server-side debugging
  console.error('ERROR:', err);

  // Default status code and error message
  const statusCode = err.status || 500;
  const errorMessage = err.message || 'Internal server error';

  // Format validation errors
  if (err.name === 'ValidationError') {
    const validationErrors = Object.values(err.errors).map(error => error.message);
    return res.status(400).json({
      status: 'error',
      message: 'Validation failed',
      errors: validationErrors
    });
  }

  // Handle duplicate key errors (MongoDB code 11000)
  if (err.code === 11000) {
    return res.status(409).json({
      status: 'error',
      message: 'Duplicate value error',
      field: Object.keys(err.keyValue)[0]
    });
  }

  // Handle invalid ObjectId format
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid ID format'
    });
  }

  // Handle JWT errors
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({
      status: 'error',
      message: 'Invalid token'
    });
  }

  // Default error response
  return res.status(statusCode).json({
    status: 'error',
    message: errorMessage
  });
};

module.exports = {
  errorHandler,
  globalErrorHandler
};
