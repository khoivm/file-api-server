const fs = require('fs');
const path = require('path');
const AbstractFileService = require('../abstract-file-service');

class FileDeleteService extends AbstractFileService {
  async delete() {
    let localUploadLocation = this.LOCAL_UPLOAD_LOCATION;
    let files = [];
    try {
      files = await fs.readdirSync(localUploadLocation);
      if (files.length === 0) return [];
    } catch(error) {
      return [];
    }

    let promises = [];
    files.forEach(function (file) {
      promises.push(fs.unlinkSync(path.join(localUploadLocation, file)));
    });

    return Promise.all(promises).then(( () => { return files }));
  }

  

  
}

module.exports = FileDeleteService