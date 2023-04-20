module.exports = {
  uploadFolder: process.env.UPLOAD_FOLDER || "uploads",
  downloadZipFileName: process.env.DOWNLOAD_ZIP_FILE_NAME || "files",
  publicKey: process.env.PUBLIC_KEY,
  privateKey: process.env.PRIVATE_KEY,
  storageProvider: process.env.STORAGE_PROVIDER || "local",
  dailyUsageLimit: Number(process.env.DAILY_USAGE_LIMIT || 10),
  activePeriodInDays: Number(process.env.ACTIVE_PERIOD_IN_DAYS || 1),
  cloudProvider: {
    google: {
      projectId: process.env.GOOGLE_PROJECT_ID,
      storageBucketName: "storageBucketName"
    }
  }
}