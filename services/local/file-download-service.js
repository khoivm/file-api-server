const fs = require('fs');
const path = require('path');
const AbstractFileService = require('../abstract-file-service');

class FileDownloadService extends AbstractFileService {
  async download() {
    let filesInArray = [];
    let uploadLocation = this.LOCAL_UPLOAD_LOCATION;
    try {
      const files = await fs.readdirSync(uploadLocation);
      files.forEach(function (file) {
        filesInArray.push({path: path.join(uploadLocation, file), name: file});
      });
      return filesInArray;
    } catch(error) {
      return [];
    }
  }
}

module.exports = FileDownloadService