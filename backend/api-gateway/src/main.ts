import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RpcExceptionFilter } from './common/filters/rpc-exceptions.filter';
import { ValidationPipe } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from './guards/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình Swagger
  const config = new DocumentBuilder()
    .setTitle('Health Mart')
    .setDescription('The documentation of api')
    .setVersion('1.0')
    .addBearerAuth() // Cấu hình thêm Bearer Auth cho Swagger
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

  // Cấu hình CORS
  app.enableCors();

  // Sử dụng interceptor để xử lý response API
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));

  // Đăng ký Global Exception Filter
  app.useGlobalFilters(new RpcExceptionFilter());

  // Cấu hình ValidationPipe
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.useGlobalGuards(new AuthGuard(new JwtService())); // Áp dụng AuthGuard để xác thực JWT cho toàn bộ API

  await app.startAllMicroservices();

  // Lắng nghe API Gateway trên port 3001
  await app.listen(3001);
}

bootstrap();
