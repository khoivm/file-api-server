const ResponseService = require('../services/response-service');

const config = require('../config')
module.exports = (req, res, next) => {
  if (!req.params?.privateKey || req.params?.privateKey !== config.privateKey) {
    ResponseService.error(res, "The private key is not valid");
    return;
  }

  next();
}