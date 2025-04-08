import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { appConfig } from '../config/app.config';

export class ClientProxyFactoryService {
  createClient(serviceName: keyof typeof appConfig): ClientProxy {
    const { queue } = appConfig[serviceName];
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],
        queue,
        queueOptions: { durable: false },
      },
    });
  }
}
