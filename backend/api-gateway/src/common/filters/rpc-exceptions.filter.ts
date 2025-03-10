import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

@Catch(RpcException)
export class RpcExceptionFilter implements ExceptionFilter {
  catch(exception: RpcException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception.getError();
    console.error('RPC Exception Caught:', error); // Debug log lỗi

    // Xử lý lỗi trả về từ microservice
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR; // Mặc định là 500 nếu không có statusCode
    let message = 'Unknown error';

    if (typeof error === 'object' && error !== null) {
      statusCode = (error as any).statusCode || HttpStatus.BAD_REQUEST; // Nếu không có statusCode, mặc định 400
      message = (error as any).message || 'Unknown error';
    } else if (typeof error === 'string') {
      message = error;
    }

    response.status(statusCode).json({ statusCode, message });
  }
}
