import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, OrderShipMethod } from '../../enums/order.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderRequest {
  @ApiProperty({
    example: 'PICK_UP',
    enum: OrderShipMethod,
    description:
      'Phương thức vận chuyển. Nếu là PICK_UP thì trạng thái sẽ tự động là COMPLETED',
  })
  @IsEnum(OrderShipMethod, {
    message: 'ship_method phải là "HOME_DELIVERY" hoặc "PICK_UP"',
  })
  @IsOptional()
  ship_method?: OrderShipMethod;

  @ApiProperty({
    example: 'COMPLETED',
    enum: OrderStatus,
    description:
      'Trạng thái đơn hàng. Nếu ship_method là PICK_UP thì mặc định là COMPLETED',
  })
  @IsEnum(OrderStatus, { message: 'order_status phải là trạng thái hợp lệ!' })
  @IsOptional()
  order_status?: OrderStatus;
}
