const ResponseService = require("../services/response-service")
const config = require("../config")

class ApiController {
  constructor() {
    if (!config.privateKey && !config.publicKey) {
      throw new Error("Missing private or public key")
    }
  }  

  sendSuccess(res, message, data = {}) {
    return ResponseService.success(res, message, data);
  }

  sendError(res, message) {
    return ResponseService.error(res, message);
  }
}

module.exports = ApiController