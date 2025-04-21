import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entities/address.entity';
import { AddressController } from './controllers/address.controller';
import { AddressService } from './services/address.service';
import { User } from '../user/entities/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Address, User])],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
