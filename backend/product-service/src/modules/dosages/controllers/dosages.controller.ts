import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { DosagesService } from '../services/dosages.service';
import { CreateDosageRequest } from '../dto/requests/create-dosages-request.dto';
import { UpdateDosagesRequest } from '../dto/requests/update-dosages-request.dto';

@Controller('dosages')
export class DosagesController {
  constructor(private readonly dosagesService: DosagesService) {}

  @MessagePattern('get_all_dosages')
  getAllDosages() {
    return this.dosagesService.findAll();
  }

  @MessagePattern('get_dosage_by_id')
  async getDosageById(@Payload() id: number) {
    return this.dosagesService.findOne(id);
  }

  @MessagePattern('get_dosage_by_product_id')
  async getDosageByProductId(@Payload() productId: number) {
    return this.dosagesService.findDosageByProductId(productId);
  }

  @MessagePattern('create_dosage')
  async createDosage(@Payload() createDosageRequest: CreateDosageRequest) {
    return this.dosagesService.create(createDosageRequest);
  }

  @MessagePattern('update_dosage')
  async updateDosage(
    @Payload()
    payload: {
      id: number;
      updateDosageRequest: UpdateDosagesRequest;
    },
  ) {
    const { id, updateDosageRequest } = payload;
    return this.dosagesService.update(id, updateDosageRequest);
  }

  @MessagePattern('delete_dosage')
  async deleteUsage(@Payload() id: number) {
    return this.dosagesService.remove(id);
  }
}
