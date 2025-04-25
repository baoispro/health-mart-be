import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { appConfig } from '../config/app.config';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ClientProxyFactoryService {
  constructor(private readonly configService: ConfigService) {}
  createClient(serviceName: keyof typeof appConfig): ClientProxy {
    const { queue } = appConfig[serviceName];
    const rabbitmqUrl = this.configService.get<string>('RABBITMQ_URL');
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: [rabbitmqUrl],
        queue,
        queueOptions: { durable: false },
      },
    });
  }
}
