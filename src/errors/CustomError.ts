import { CommonRes } from '@/types/commonResponse';

// errors/CustomError.ts
class CustomError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

class ClientError extends CustomError {
  constructor(message: string) {
    super(message, 0); // 0 clinet error
  }
}

class NetworkError extends CustomError {
  statusText: string;
  errorBody: string;

  constructor(
    message: string,
    statusCode: number,
    statusText: string,
    errorBody: string,
  ) {
    let parsedMessage = message; // 기본 메시지

    try {
      const parsedBody = JSON.parse(errorBody);

      if (
        parsedBody &&
        typeof parsedBody === 'object' &&
        'message' in parsedBody
      ) {
        parsedMessage = `${parsedBody.code}: ${parsedBody.message}`;
      }
    } catch (error) {
      console.error('Error parsing JSON in errorBody:', error);
    }

    super(parsedMessage, statusCode);
    this.statusText = statusText;
    this.errorBody = errorBody;
  }
}

export { CustomError, ClientError, NetworkError };
