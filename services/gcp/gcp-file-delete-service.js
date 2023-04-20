const AbstractFileService = require('../abstract-file-service');

class GcpFileDeleteService extends AbstractFileService {
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

  async delete() {
    const bucketName = this.bucketName;
    
    // Lists files in the bucket
    const [files] = await this.storage.bucket(bucketName).getFiles();

    if (files.length === 0) {
      return [];
    }

    // Optional:
    // Set a generation-match precondition to avoid potential race conditions
    // and data corruptions. The request to delete is aborted if the object's
    // generation number does not match your precondition. For a destination
    // object that does not yet exist, set the ifGenerationMatch precondition to 0
    // If the destination object already exists in your bucket, set instead a
    // generation-match precondition using its generation number.
    const deleteOptions = {
      ifGenerationMatch: 0,
    };

    return Promise.map(files, async (file) => {
      const object = this.storage.bucket(bucketName).file(file.name)
      
      const [exists] = await object.exists();
      if (!exists) {
        return;
      }
      
      return object.delete(deleteOptions);
    });
  }

  

  
}

module.exports = GcpFileDeleteService