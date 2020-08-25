import httpStatus from 'http-status';
import { ResponseVO } from '../model/vo/ResponseVo';

enum StatusCode {
  success = httpStatus.OK,
  created = httpStatus.CREATED,
  updated = httpStatus.NO_CONTENT,
  deleted = httpStatus.NO_CONTENT,
}

class Result {
  private statusCode: number;
  private code: number;
  private message: string;
  private data?: any;

  constructor(statusCode: number, code: number, message: string, data?: any) {
    this.statusCode = statusCode;
    this.code = code;
    this.message = message;
    this.data = data;
  }

  /**
   * Serverless: According to the API Gateway specs, the body content must be stringified
   */
  bodyToString () {
    return {
      statusCode: this.statusCode,
      body: JSON.stringify({
        code: this.code,
        message: this.message,
        data: this.data,
      }),
    };
  }
}

export class MessageUtil {
  static success(data: object): ResponseVO {
    const result = new Result(StatusCode.success, 0, 'success', data);
    return result.bodyToString();
  }

  static created(data: object): ResponseVO {
    const result = new Result(StatusCode.created, 0, 'created', data);
    return result.bodyToString();
  }

  static updated(data: object): ResponseVO {
    const result = new Result(StatusCode.updated, 0, 'updated', data);
    return result.bodyToString();
  }

  static deleted(data: object): ResponseVO {
    const result = new Result(StatusCode.deleted, 0, 'updated', data);
    return result.bodyToString();
  }

  static error(code: number = 1000, message: string) {
    const result = new Result(StatusCode.success, code, message);
    return result.bodyToString();
  }
}
