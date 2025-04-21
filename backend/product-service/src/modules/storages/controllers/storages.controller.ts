import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoragesService } from '../services/storages.service';
import { CreateStorageRequest } from '../dto/requests/create-storages-request.dto';
import { UpdateStorageRequest } from '../dto/requests/update-storages-request.dto';

@Controller('storages')
export class StoragesController {
  constructor(private readonly storagesService: StoragesService) {}

  @MessagePattern('get_all_storages')
  getAllstorages() {
    return this.storagesService.findAll();
  }

  @MessagePattern('get_storage_by_id')
  async getStoragesById(@Payload() id: number) {
    return this.storagesService.findOne(id);
  }

  @MessagePattern('get_storage_by_product_id')
  async getStoragesByProductId(@Payload() productId: number) {
    return this.storagesService.findStorageByProductId(productId);
  }

  @MessagePattern('create_storage')
  async createstorages(@Payload() createStoragesRequest: CreateStorageRequest) {
    return this.storagesService.create(createStoragesRequest);
  }

  @MessagePattern('update_storage')
  async updatestorages(
    @Payload()
    payload: {
      id: number;
      updateStorageRequest: UpdateStorageRequest;
    },
  ) {
    const { id, updateStorageRequest } = payload;
    return this.storagesService.update(id, updateStorageRequest);
  }

  @MessagePattern('delete_storage')
  async deleteUsage(@Payload() id: number) {
    return this.storagesService.remove(id);
  }
}
