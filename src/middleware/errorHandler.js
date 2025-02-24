const errorHandler = (handler) => {
  return function(req, res, next) {
    return Promise.resolve(handler(req, res, next)).catch(next);
  };
};

module.exports = errorHandler;
