import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  //Kết nối swagger
  const config = new DocumentBuilder()
    .setTitle('Health Mart')
    .setDescription('The documentation of api')
    .setVersion('1.0')
    .addBearerAuth()
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
  // app.useGlobalFilters(new AllExceptionsFilter());
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
