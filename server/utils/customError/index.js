class CustomError extends Error {
  constructor(message, status, result) {
    super(message, status, result);
    this.message = message;
    this.status = status;
    this.result = result;
  }
}

module.exports = CustomError;
