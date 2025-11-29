export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }

  static badRequest(msg: string) {
    return new ApiError(400, msg);
  }

  static unauthorized(msg: string) {
    return new ApiError(401, msg);
  }
}
