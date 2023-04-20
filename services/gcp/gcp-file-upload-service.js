const fs = require('fs');
const crypto = require('crypto');
const config = require('../../config');
const path = require('path');
const AbstractFileService = require('../abstract-file-service');


class GcpFileUploadService extends AbstractFileService {
  storage;

  /**
   * @param {Storage} storage 
   */
  constructor(storage) {
    this.storage = storage;
    if (!config.cloudProvider?.google?.storageBucketName) {
      throw new Error('Missing Google storage bucket name');
    }
  }

  /**
   * @param {File} files 
   */
  async upload(files) {
    const options = {
      destination: '',
      // Optional:
      // Set a generation-match precondition to avoid potential race conditions
      // and data corruptions. The request to upload is aborted if the object's
      // generation number does not match your precondition. For a destination
      // object that does not yet exist, set the ifGenerationMatch precondition to 0
      // If the destination object already exists in your bucket, set instead a
      // generation-match precondition using its generation number.
      preconditionOpts: {ifGenerationMatch: 0},
    };

    return Promise.map(files, (file) => {
      options.destination = config.cloudProvider.google.storageBucketName + '/' + file.name;
      return storage.bucket(bucketName).upload(file.path, options);
    });
  }
}

module.exports = GcpFileUploadService