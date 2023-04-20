const fs = require('fs');
const crypto = require('crypto');
const path = require('path');
const AbstractFileService = require('../abstract-file-service');

class FileUploadService extends AbstractFileService {
  /**
   * @param {File} files 
   */
  async upload(files) {
    let localUploadLocation = this.LOCAL_UPLOAD_LOCATION;

    if (!Array.isArray(files)) {
      files = [files];
    }

    if (!fs.existsSync(localUploadLocation)){
      fs.mkdirSync(localUploadLocation, { recursive: true });
    }

    let promises = [];
    for (let file of files) {
      // filename is prefixed with UUID to prevent files being replaced
      const newFilePath = path.join(localUploadLocation, `${crypto.randomUUID()}-${file.name}`);
      promises.push(fs.copyFile(file.path, newFilePath, () => {
        console.log(`File ${file.name} uploaded to ${newFilePath} successfully`);
      }))
    }

    return Promise.all(promises);
  }
}

module.exports = FileUploadService