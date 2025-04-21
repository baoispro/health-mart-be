import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { appConfig } from './modules/products/config/app.config';

async function bootstrap() {
  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://localhost:5672'],
          queue: appConfig.productService.queue,
          queueOptions: {
            durable: false,
          },
        },
      },
    );

    await app.listen();
    console.log(
      `✅ Product microservice is listening on queue: ${appConfig.productService.queue}`,
    );
  } catch (error) {
    console.error('❌ Failed to start Product microservice');
    console.error(error);
    process.exit(1);
  }
}
bootstrap();
