const FileApiController = require('../controllers/file-api-controller');
const ServiceFactory = require('./service-factory');

class ControllersFactory {
  static FileApiController(req, res) {
    return new FileApiController(
      ServiceFactory.FileUploadService(),
      ServiceFactory.FileDownloadService(),
      ServiceFactory.FileDeleteService(),
    );
  }
}

module.exports = ControllersFactory