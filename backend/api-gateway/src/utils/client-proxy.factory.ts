import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { appConfig } from '../config/app.config'

export class ClientProxyFactoryService {
  createClient(serviceName: keyof typeof appConfig): ClientProxy {
    const { host, port } = appConfig[serviceName];
    return ClientProxyFactory.create({
      transport: Transport.TCP,
      options: { host, port },
    });
  }
}
