import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true }); // <-- bật CORS
  await app.listen(3003);
  console.log('Cart service is running on http://localhost:3003');
}
bootstrap();
