class ResponseService {
  static success(res, message, data = null) {
    return res.status(200).json({
      status: 'success',
      message,
      data
    })
  }

  static error(res, message, statusCode = 400) {
    return res.status(statusCode).json({
      status: 'error',
      message
    })
  }
}

module.exports = ResponseService