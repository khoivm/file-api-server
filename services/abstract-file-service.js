const config = require('../config');
const path = require('path');

class AbstractFileService {
  LOCAL_UPLOAD_LOCATION = path.join(`.`,'files', config.uploadFolder);
  LOCAL_DOWNLOAD_LOCATION = path.join(`.`,'files', 'downloads');

  constructor() {
    if (this.constructor ===  AbstractFileService) {
        throw new Error('Can not instantiate abstract class');
    }
  }

  async download() {
    throw new Error('Method not implemented');
  }
  /**
   * @param {File} files 
   */
  async upload(files) {
      throw new Error('Method not implemented');
  }
  async delete() {
      throw new Error('Method not implemented');
  }
}

module.exports = AbstractFileService;