import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { Order } from './orders.entity';
import { OrdersMicroserviceController } from './orders.microservice.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    ClientsModule.register([
      {
        name: 'USER_SERVICE',
        transport: Transport.TCP,
        options: { host: 'localhost', port: 4001 }, // Port của user-service
      },
    ]),
  ],
  controllers: [OrdersMicroserviceController],
  providers: [OrdersService],
})
export class OrdersModule {}
