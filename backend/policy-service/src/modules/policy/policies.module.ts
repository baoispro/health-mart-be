import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Policy } from './entities/policies.entity';
import { PoliciesController } from './controllers/policies.controller';
import { PoliciesService } from './services/policies.service';

@Module({
  imports: [TypeOrmModule.forFeature([Policy])],
  controllers: [PoliciesController],
  providers: [PoliciesService],
})
export class PoliciesModule {}
