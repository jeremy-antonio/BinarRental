class BadRequestError extends Error {
  public statusCode;
  constructor(message: string) {
    super(message);
    this.name = "BAD_REQUEST";
    this.statusCode = 400;
  }
}

class UnauthorizedError extends Error {
  public statusCode;
  constructor(message: string) {
    super(message);
    this.name = "UNAUTHORIZED";
    this.statusCode = 401;
  }
}

class ForbiddenError extends Error {
  public statusCode;
  constructor(message: string) {
    super(message);
    this.name = "FORBIDDEN";
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  public statusCode;
  constructor(message: string) {
    super(message);
    this.name = "NOT_FOUND";
    this.statusCode = 404;
  }
}

class InternalServerError extends Error {
  public statusCode;
  constructor(message: string) {
    super(message);
    this.name = "INTERNAL_SERVER_ERROR";
    this.statusCode = 500;
  }
}

export { BadRequestError, UnauthorizedError, ForbiddenError, NotFoundError, InternalServerError };
