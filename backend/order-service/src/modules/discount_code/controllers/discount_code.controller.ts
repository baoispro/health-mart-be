import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DiscountCode } from '../entities/discount_code.entity';
import { DiscountCodesService } from '../services/discount_code.service';
import { CreateDiscountCodeRequest } from '../dto/create-discount_code-request.dto';
import { UpdateDiscountCodeRequest } from '../dto/update-discount_code-request.dto';

@Controller('discount-codes')
export class DiscountCodesController {
  constructor(private readonly discountCodesService: DiscountCodesService) {}

  @MessagePattern({ cmd: 'discount:get_all' })
  async findAll(): Promise<DiscountCode[]> {
    return await this.discountCodesService.findAll();
  }

  @MessagePattern({ cmd: 'discount:get_by_id' })
  async findOne(@Payload() payload: { id: number }): Promise<DiscountCode> {
    return await this.discountCodesService.findOneById(payload.id);
  }

  @MessagePattern({ cmd: 'discount:get_by_code' })
  async findByCode(
    @Payload() payload: { code: string },
  ): Promise<DiscountCode> {
    return await this.discountCodesService.findOneByCode(payload.code);
  }

  @MessagePattern({ cmd: 'discount:create' })
  async create(
    @Payload() dto: CreateDiscountCodeRequest,
  ): Promise<DiscountCode> {
    return await this.discountCodesService.createDiscountCode(dto);
  }

  @MessagePattern({ cmd: 'discount:update' })
  async update(
    @Payload()
    payload: {
      id: number;
      updateDiscountCodeRequest: UpdateDiscountCodeRequest;
    },
  ): Promise<DiscountCode> {
    return await this.discountCodesService.updateDiscountCode(
      payload.id,
      payload.updateDiscountCodeRequest,
    );
  }

  @MessagePattern({ cmd: 'discount:delete' })
  async delete(
    @Payload() payload: { id: number },
  ): Promise<{ message: string }> {
    return await this.discountCodesService.deleteDiscountCode(payload.id);
  }
}
