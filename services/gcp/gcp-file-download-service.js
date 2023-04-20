const path = require('path');
const config = require('../../config');
const AbstractFileService = require('../abstract-file-service');

class GcpFileDownloadService extends AbstractFileService {
  storage;
  bucketName;

  /**
   * @param {Storage} storage 
   */
  constructor(storage) {
    this.storage = storage;
    if (!config.cloudProvider?.google?.storageBucketName) {
      throw new Error('Missing Google storage bucket name');
    }
    this.bucketName = config.cloudProvider.google.storageBucketName;
  }

  async download() {
    const bucketName = this.bucketName;

    // Lists files in the bucket
    const [files] = await this.storage.bucket(bucketName).getFiles();

    if (files.length === 0) {
      return [];
    }

    let filesInArray = [];
    return Promise.map(files, async (file) => {
      const object = await this.storage.bucket(bucketName).file(file.name)
      
      const [exists] = await object.exists();
      if (!exists) {
        return;
      }
      
      // temporarily download to local
      // TODO: delete after finish or use tmp folder to be automatically deleted when connection is closed
      const destination = path.join(this.LOCAL_DOWNLOAD_LOCATION, file.name);
      await object.download({destination});

      // have to be the same interface
      return filesInArray.push({path: destination, name: file.name});
    });
  }
}

module.exports = GcpFileDownloadService