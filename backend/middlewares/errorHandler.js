const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message || 'Server Error';

  if(err.code === 'PGRST116'){
    statusCode = 404;
    message = 'Resource not found';
  }

  if(err.code === '23505'){
    statusCode = 400;
    message = 'Duplicate entry. This record already exists.';
  }
  if(err.code === '23503'){
    statusCode = 400;
    message = 'Invalid reference. The related record (e.g., user or team) does not exist.';
  }
  if(err.status && err.status >= 400 && err.status < 500){
     statusCode = err.status;
  }
  console.error(`[Error] ${req.method} ${req.path}:`, err);

  res.status(statusCode).json({
    success: false,
    message: message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

module.exports = { errorHandler };