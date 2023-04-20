const config = require('../config')
const FileUploadService = require('../services/local/file-upload-service');
const FileDownloadService = require('../services/local/file-download-service');
const FileDeleteService = require('../services/local/file-delete-service');
const GcpFileUploadService = require('../services/gcp/gcp-file-upload-service');
const GcpFileDownloadService = require('../services/gcp/gcp-file-download-service');
const GcpFileDeleteService = require('../services/gcp/gcp-file-delete-service');

class ServiceFactory {
  googleStorageClient;

  constructor() {
    if(config.storageProvider === 'google') {
      // Not putting outside of constructor to avoid the initialization when unnecessary
      const {Storage} = require('@google-cloud/storage');
      this.googleStorageClient = new Storage();
    }
  }
  
  static FileUploadService(req) {
    if(config.storageProvider === 'google') {
      return new GcpFileUploadService(this.googleStorageClient);
    }
    return new FileUploadService();
  }
  
  static FileDownloadService() {
    if(config.storageProvider === 'google') {
      return new GcpFileDownloadService(this.googleStorageClient);
    }
    return new FileDownloadService();
  }
  
  static FileDeleteService() {
    if(config.storageProvider === 'google') {
      return new GcpFileDeleteService(this.googleStorageClient);
    }
    return new FileDeleteService();
  }
}

module.exports = ServiceFactory;