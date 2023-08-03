import { Response } from 'express';

enum ErrorCode {
  SUCCESS = 0,
  FAILURE = 1,
  RETRY = 2,
  INVALID_ACCESS_TOKEN = 3,
}

enum ResponseStatusCode {
  SUCCESS = 200,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

enum ResponseStatus {
  SUCCESS = 'Success!',
  FAILURE = 'Failure!',
  RETRY = 'Retry!',
  BAD_REQUEST = 'Bad Request!',
  UNAUTHORIZED = 'Unauthorized!',
  FORBIDDEN = 'Forbidden!',
  NOT_FOUND = 'Not Found!',
  INTERNAL_SERVER_ERROR = 'Internal Server Error!',
}

abstract class AppResponse {
  constructor(protected success: boolean, protected errorCode: ErrorCode, protected status: ResponseStatus, protected statusCode: ResponseStatusCode, protected message: string, protected timestamp: Date, protected data: any) { }

  protected prepare<T extends AppResponse>(res: Response, response: T, headers: { [key: string]: string }): Response {
    for (const [key, value] of Object.entries(headers)) {
      res.append(key, value);
    }

    return res.status(this.statusCode).json(AppResponse.sanitize(response));
  }

  public send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare(res, this, headers);
  }

  private static sanitize<T extends AppResponse>(response: T): T {
    const clone: T = Object.assign({}, response);

    return clone;
  }
}

export class AuthFailureResponse extends AppResponse {
  constructor(message = 'Authentication failed') {
    super(false, ErrorCode.FAILURE, ResponseStatus.FAILURE, ResponseStatusCode.UNAUTHORIZED, message, new Date(), null);
  }
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<AuthFailureResponse>(res, this, headers);
  }
}

export class NotFoundResponse extends AppResponse {
  constructor(message = 'Not found') {
    super(false, ErrorCode.FAILURE, ResponseStatus.NOT_FOUND, ResponseStatusCode.NOT_FOUND, message, new Date(), null);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<NotFoundResponse>(res, this, headers);
  }
}

export class ForbiddenResponse extends AppResponse {
  constructor(message = 'Forbidden') {
    super(false, ErrorCode.FAILURE, ResponseStatus.FORBIDDEN, ResponseStatusCode.FORBIDDEN, message, new Date(), null);
  }
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<ForbiddenResponse>(res, this, headers);
  }
}

export class BadRequestResponse extends AppResponse {
  constructor(message = 'Bad request') {
    super(false, ErrorCode.FAILURE, ResponseStatus.BAD_REQUEST, ResponseStatusCode.BAD_REQUEST, message, new Date(), null);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<BadRequestResponse>(res, this, headers);
  }
}

export class InternalServerErrorResponse extends AppResponse {
  constructor(message = 'Internal server error') {
    super(false, ErrorCode.FAILURE, ResponseStatus.INTERNAL_SERVER_ERROR, ResponseStatusCode.INTERNAL_SERVER_ERROR, message, new Date(), null);
  }
  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<InternalServerErrorResponse>(res, this, headers);
  }
}

export class SuccessMsgResponse extends AppResponse {
  constructor(message: string) {
    super(false, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), null);
  }
}

export class FailureMsgResponse extends AppResponse {
  constructor(message: string) {
    super(false, ErrorCode.FAILURE, ResponseStatus.FAILURE, ResponseStatusCode.SUCCESS, message, new Date(), null);
  }
}

export class SuccessResponse<T> extends AppResponse {
  constructor(message: string, data: T) {
    super(true, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), data);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<SuccessResponse<T>>(res, this, headers);
  }
}

export class AccessTokenErrorResponse extends AppResponse {
  private instruction = 'refresh_token';

  constructor(message = 'Invalid access token') {
    super(false, ErrorCode.INVALID_ACCESS_TOKEN, ResponseStatus.FAILURE, ResponseStatusCode.UNAUTHORIZED, message, new Date(), null);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    headers.instruction = this.instruction;
    return this.prepare<AccessTokenErrorResponse>(res, this, headers);
  }
}

export class TokenRefreshResponse extends AppResponse {
  constructor(message: string, private accessToken: string, private refreshToken: string) {
    super(true, ErrorCode.SUCCESS, ResponseStatus.SUCCESS, ResponseStatusCode.SUCCESS, message, new Date(), null);
  }

  send(res: Response, headers: { [key: string]: string } = {}): Response {
    return this.prepare<TokenRefreshResponse>(res, this, headers);
  }
}
