const CustomAPIError = require('../errors/custom-error');
const errorHandler = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res
      .status(err.statusCode)
      .json({ message: err.message });
  }
  return res
    .status(500)
    .json({ message: 'Something went wrong. Try again later' });
}

module.exports = errorHandler;