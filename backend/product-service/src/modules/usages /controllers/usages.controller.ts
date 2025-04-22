import { Controller } from '@nestjs/common';
import { UsagesService } from '../services/usages.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateUsageRequest } from '../dto/requests/create-usages-request.dto';
import { UpdateUsageRequest } from '../dto/requests/update-usages-request.dto';
// import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
// import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';

@Controller('usages')
export class UsagesController {
  constructor(private readonly usagesService: UsagesService) {}

  @MessagePattern('get_all_usages')
  getAllUsages() {
    return this.usagesService.findAll();
  }

  @MessagePattern('get_usage_by_id')
  async getUsageById(@Payload() id: number) {
    return this.usagesService.findOne(id);
  }

  @MessagePattern('get_usage_by_product_id')
  async getUsageByProductId(@Payload() productId: number) {
    return this.usagesService.findUsageByProductId(productId);
  }

  @MessagePattern('create_usage')
  async createUsage(@Payload() createUsageRequest: CreateUsageRequest) {
    return this.usagesService.create(createUsageRequest);
  }

  @MessagePattern('update_usage')
  async updateUsage(
    @Payload()
    payload: {
      id: number;
      updateUsageRequest: UpdateUsageRequest;
    },
  ) {
    const { id, updateUsageRequest } = payload;
    return this.usagesService.update(id, updateUsageRequest);
  }

  @MessagePattern('delete_usage')
  async deleteUsage(@Payload() id: number) {
    return this.usagesService.remove(id);
  }
}
