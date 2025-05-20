import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RpcExceptionFilter } from './common/filters/rpc-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Kết nối swagger
  const config = new DocumentBuilder()
    .setTitle('Health Mart')
    .setDescription('The documentation of api')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'access-token', // <- tên security name
    )
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory, {
    swaggerOptions: {
      operationsSorter: (a, b) => {
        const order = ['get', 'post', 'put', 'patch', 'delete'];
        return order.indexOf(a.get('method')) - order.indexOf(b.get('method'));
      },
    },
  });

  const reflector = app.get(Reflector);
  app.enableCors();
  // Sử dụng template success response api
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  // Đăng ký Global Exception Filter
  app.useGlobalFilters(new RpcExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors) => {
        const formattedErrors = errors.reduce((acc, err) => {
          const field = err.property;
          const messages = err.constraints
            ? Object.values(err.constraints)
            : [];
          acc[field] = messages;
          return acc;
        }, {});

        return {
          statusCode: 400,
          message: formattedErrors, // Trả về object lỗi với từng field
          error: 'Bad Request',
        };
      },
    }),
  );
  await app.startAllMicroservices();
  await app.listen(3001, '0.0.0.0');
}
bootstrap();
