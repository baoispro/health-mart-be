import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, UnauthorizedException } from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal Server Error';
    let errors: any[] = [];

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse;
      } else if (typeof exceptionResponse === 'object' && exceptionResponse !== null) {
        message = (exceptionResponse as any).message || message;

        // Nếu lỗi là BadRequestException và có danh sách lỗi, thì lấy luôn danh sách đó
        if (exception instanceof BadRequestException && (exceptionResponse as any).length) {
          errors = exceptionResponse as any[];
        }
      }
    }

    if (exception instanceof UnauthorizedException) {
        message = 'Bạn chưa xác thực. Vui lòng đăng nhập!';
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      errors: errors.length ? errors : undefined, // Nếu có danh sách lỗi thì trả về, không thì bỏ qua
    });
  }
}
