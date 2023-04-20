const ResponseService = require('../services/response-service');

module.exports = (req, res, next) => {
  if (!req.is('multipart/form-data')) {
    ResponseService.error(res, "The content-type of the request must be 'multipart/form-data'");
    return;
  }

  next();
}