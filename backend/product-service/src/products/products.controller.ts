import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductRequest } from './dto/requests/create-product-request.dto';
import { UpdateProductRequest } from './dto/requests/update-product-request.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @MessagePattern({ cmd: 'get_all_products' })
  getAllProducts() {
    return this.productService.findAll();
  }

  @MessagePattern({ cmd: 'get_product_by_id' })
  async getProductById(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern({ cmd: 'create_product' })
  async createProduct(@Payload() createProductRequest: CreateProductRequest) {
    return this.productService.create(createProductRequest);
  }

  @MessagePattern({ cmd: 'update_product' })
  async updateProduct(
    @Payload() payload: { id: number; updateProductRequest: UpdateProductRequest },
  ) {
    const { id, updateProductRequest } = payload;
    return this.productService.update(id, updateProductRequest);
  }

  @MessagePattern({ cmd: 'delete_product' })
  async deleteProduct(@Payload() id: number) {
    return this.productService.remove(id);
  }
}
