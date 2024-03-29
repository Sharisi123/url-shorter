class ApiError extends Error {
  status
  errors

  constructor(status: number, message: string, errors = []) {
    super(message)
    this.status = status
    this.errors = errors
  }

  static UnauthorizedError() {
    return new ApiError(401, 'AUTH: User not authorized, please try again')
  }

  static BadRequest(message: string, errors = []) {
    return new ApiError(400, "Bad request: " + message, errors)
  }
}
export default ApiError
