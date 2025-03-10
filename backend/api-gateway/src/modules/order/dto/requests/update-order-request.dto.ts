import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateOrderRequest } from './create-order-request.dto';

export class UpdateOrderRequest extends PartialType(CreateOrderRequest) {
  @ApiProperty({ example: 'processing', description: 'Trạng thái đơn hàng' })
  order_status?: string;
}
