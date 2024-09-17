class CustomError extends Error {
  constructor(message, status, result) {
    super(message, status);
    this.message = message;
    this.status = status;
    this.result = result;
  }
}

module.exports = CustomError;
