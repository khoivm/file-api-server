// load environment variables
require('dotenv').config();

// using expressJs as a server framework
const express = require('express');
// formidable is a middleware for handling multipart/form-data which is used for uploading files
const formidable = require('express-formidable');
// Using factory layers to be easy to switch between underlying providers
const ControllersFactory = require('./factories/controller-factory');
// middleware to validate upload request before handling it
const fileUploadValidationMiddleware = require('./middlewares/file-upload-validation-middleware');
// middleware to validate download request before handling it
const fileDownloadValidationMiddleware = require('./middlewares/file-download-validation-middleware');
// middleware to validate rate limit
const rateLimiterMiddleware = require('./middlewares/rate-limiter-middleware');
// a service to handle all responses
const ResponseService = require('./services/response-service');
// load all jobs need to run when server starts
const jobs = require('./jobs');

const app = express();
const port = 3000;

app.use(formidable({
  multiples: true,
}));

// run all jobs
jobs.run();

app.post('/files', [
  fileUploadValidationMiddleware,
  rateLimiterMiddleware,
], (req, res, next) => {
  return ControllersFactory.FileApiController().upload(req, res).catch(next);
})

app.get('/files/:publicKey', [
  fileDownloadValidationMiddleware,
  rateLimiterMiddleware,
], (req, res, next) => {
  return ControllersFactory.FileApiController().download(req, res).catch(next);
})

app.delete('/files/:privateKey', (req, res, next) => {
  return ControllersFactory.FileApiController().delete(req, res).catch(next);
})

app.use((err, req, res, next) => {
  ResponseService.error(res, err.message, 500);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})