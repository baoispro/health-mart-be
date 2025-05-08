import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { PharmacyProductService } from '../services/pharmacy_product.service';
import { CreatePharmacyProductRequest } from '../dto/requests/create-pharmacyproduct-request.dto';
import { UpdatePharmacyProductRequest } from '../dto/requests/update-pharmacyproduct-request.dto';

@Controller('pharmacy-product')
export class PharmacyProductController {
  constructor(
    private readonly pharmacyProductService: PharmacyProductService,
  ) {}

  @MessagePattern('get_all_pharmacy_products')
  getAllPharmacyProduct() {
    return this.pharmacyProductService.findAll();
  }

  // Lấy tồn kho theo pharmacyId
  @MessagePattern('get_product_by_pharmacy')
  async getProductByPharmacy(@Payload() pharmacyId: number) {
    return this.pharmacyProductService.findByPharmacy(pharmacyId);
  }

  // Lấy tồn kho theo productId
  @MessagePattern('get_pharmacy_by_product')
  async getPharmacyByProduct(@Payload() productId: number) {
    return this.pharmacyProductService.findByProduct(productId);
  }

  // Lấy tồn kho theo cả pharmacyId và productId
  @MessagePattern('get_pharmacy_product_by_id')
  async getPharmacyProductById(
    @Payload() payload: { pharmacyId: number; productId: number },
  ) {
    return this.pharmacyProductService.findOne(
      payload.pharmacyId,
      payload.productId,
    );
  }

  // Tạo mới tồn kho
  @MessagePattern('create_pharmacy_product')
  async createPharmacyProduct(
    @Payload() createRequest: CreatePharmacyProductRequest,
  ) {
    return this.pharmacyProductService.create(createRequest);
  }

  // Cập nhật tồn kho
  @MessagePattern('update_pharmacy_product')
  async updatePharmacyProduct(
    @Payload()
    payload: {
      pharmacyId: number;
      productId: number;
      updateRequest: UpdatePharmacyProductRequest;
    },
  ) {
    return this.pharmacyProductService.update(
      payload.pharmacyId,
      payload.productId,
      payload.updateRequest,
    );
  }

  // Xóa tồn kho
  @MessagePattern('delete_pharmacy_product')
  async deletePharmacyProduct(
    @Payload() payload: { pharmacyId: number; productId: number },
  ) {
    return this.pharmacyProductService.remove(
      payload.pharmacyId,
      payload.productId,
    );
  }

  // Kiểm tra tồn tại tồn kho theo pharmacyId
  @MessagePattern('check_pharmacy_exist')
  async checkPharmacyExist(@Payload() pharmacyId: number) {
    return this.pharmacyProductService.checkPharmacyExist(pharmacyId);
  }
}
