import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'ORDER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4003 }, 
      },
    ]),
  ],
  controllers: [OrderController],
  providers: [OrderService], 
  exports: [OrderService],
})
export class OrderModule {}
