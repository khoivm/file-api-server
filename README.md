# File Sharing API Server

[![npm version](https://badge.fury.io/js/api-server.svg)](https://badge.fury.io/js/api-server)

An API Server with HTTP REST API endpoints to upload, download and delete files. It is implemented in a way to be easier to switch to any other storage providers (Google Cloud Storage, S3 etc.)

## Usage

Make sure you send a request with an IP address in the header (improvement needed)
```
X-FORWARDED-FOR
```


### Upload endpoint
This endpoint will be used to upload new files. It should accept `​multipart/form-data​` requests and return a response in JSON format with the following attributes: `​publicKey​`, `​privateKey​`.
```
POST /files
```

### Download endpoint
This endpoint will be used to download existing files. It should accept `​publicKey​` as a request parameter and return a response stream with a MIME type representing the actual file format.
It will download a zip file.

```
GET /files/:publicKey
```

### Delete endpoint
This endpoint will be used to remove existing files. It should accept `​privateKey​` as a request parameter and return a response in JSON format confirming the file removal.
```
DELETE /files/:privateKey​
```

### Rate limiter
The server will keep track download and upload limits per ip address. If the number of request from a same ip address exceeds a certain threshold (e.g 100 daily requests), the server will rejects with 429 response

## Installation
* Setup the dependencies 

```bash
$ npm run build
```
* Make your own `.env` file if you haven't
```bash
$ cp .env_sample .env
```
* Start the server
```bash
$ npm start
```
* Or start the server and the server is restarted with any code changes
```bash
$ npm run dev
```
* Run tests
```
$ npm test
```

## Configuration
Set in environment variables

`UPLOAD_FOLDER`: location of the uploaded files, it will be under `files/` 

`PUBLIC_KEY` and `PRIVATE_KEY`: are keys returned to be used in 

`DOWNLOAD_ZIP_FILE_NAME`: file name for the downloaded zip file

`STORAGE_PROVIDER`: to upload to/download from

  * `local`: local server, all files are located in `files/`
  * `google`: Google Cloud Platform. You need to authenticate your app before using this. Bucket name is hard-corded in the `config.js` file

`DAILY_USAGE_LIMIT`: a number of maximum calls to both upload and download endpoints per ip address 

`GOOGLE_PROJECT_ID`: project name in Google Cloud Platform if the `STORAGE_PROVIDER == google`

## Development notes
* Unit tests and integration tests are missing
* The features with Google Cloud Storage are implemented but NOT tested
* Rate limiter is using physical files to keep track the request count. That is not ideal because it could cause blocking issues in production. We need to use database for improvement
* The ip address is ONLY got from `headers['X-FORWARDED-FOR']` which is not always correct in production.
