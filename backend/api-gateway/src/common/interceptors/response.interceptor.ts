import { CallHandler, ExecutionContext, Injectable, NestInterceptor} from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {Reflector} from '@nestjs/core';

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, any> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();
    
    const message = this.reflector.get<string>('responseMessage', context.getHandler()) || 'Thao tác thành công';

    return next.handle().pipe(
      map((data) => ({
        statusCode: response.statusCode,
        message: message,
        data: data
      })),
    );
  }
}
