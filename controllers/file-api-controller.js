const ApiController = require('./api-controller');
const config = require('../config')
require('express-zip');

class FileApiController extends ApiController {
    filesUploadService;
    filesDownloadService;
    filesDeleteService;

    /**
     * @param {FileUploadService} filesUploadService 
     * @param {filesDownloadService} filesDownloadService 
     * @param {filesDeleteService} filesDeleteService 
     */
    constructor(
        filesUploadService,
        filesDownloadService,
        filesDeleteService,
    ) {
        super();
        this.filesUploadService = filesUploadService;
        this.filesDownloadService = filesDownloadService;
        this.filesDeleteService = filesDeleteService;
    }

    async upload(req, res) {
        if (!req.files?.files) {
            return this.sendSuccess(res, 'No files to upload');
        }

        await this.filesUploadService.upload(req.files.files);
        return this.sendSuccess(res, 'Files uploaded successfully', {
            publicKey: config.publicKey,
            privateKey: config.privateKey,
        })
    }

    async download(req, res) {
        const files = await this.filesDownloadService.download(res);
        if(files.length) {
            return res.zip(files, `${config.downloadZipFileName}.zip`);
        }
        return this.sendSuccess(res, 'No files to download');
    }

    async delete(req, res) {
        const files = await this.filesDeleteService.delete(res);
        if (files.length) {
            return this.sendSuccess(res, `${files.length} file(s) were deleted`);
        }
        return this.sendSuccess(res, 'No files to delete');
    }
}

module.exports = FileApiController