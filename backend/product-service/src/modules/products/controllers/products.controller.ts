import { Controller } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CreateProductRequest } from '../dto/requests/create-product-request.dto';
import { UpdateProductRequest } from '../dto/requests/update-product-request.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @MessagePattern('get_all_products')
  getAllProducts() {
    return this.productService.findAll();
  }

  @MessagePattern('get_product_by_id')
  async getProductById(@Payload() id: number) {
    return this.productService.findOne(id);
  }

  @MessagePattern('get_product_by_slug')
  async getProductBySlug(@Payload() slug: string) {
    return this.productService.findBySlug(slug);
  }

  @MessagePattern('create_product')
  async createProduct(@Payload() createProductRequest: CreateProductRequest) {
    return this.productService.create(createProductRequest);
  }

  @MessagePattern('update_product')
  async updateProduct(
    @Payload()
    payload: {
      id: number;
      updateProductRequest: UpdateProductRequest;
    },
  ) {
    const { id, updateProductRequest } = payload;
    return this.productService.update(id, updateProductRequest);
  }

  @MessagePattern('delete_product')
  async deleteProduct(@Payload() id: number) {
    return this.productService.remove(id);
  }

  @MessagePattern('check_product_exist')
  async checkProductExists(@Payload() product_id: number) {
    return this.productService.checkProductExist(product_id);
  }

  @MessagePattern({ cmd: 'get_product_price' })
  async handleGetProductPrice(
    @Payload() payload: { productId: number },
  ): Promise<number> {
    return this.productService.getProductPrice(payload.productId);
  }
}
