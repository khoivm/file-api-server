const ResponseService = require('../services/response-service');
const config = require('../config');

module.exports = (req, res, next) => {
  if (!req.params?.publicKey || req.params?.publicKey !== config.publicKey) {
    ResponseService.error(res, "The public key is not valid");
    return;
  }

  next();
}