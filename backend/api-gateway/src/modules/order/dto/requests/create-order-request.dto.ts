import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from 'class-validator';
import { OrderShipMethod, OrderStatus } from '../../enums/order.enum';

export class CreateOrderRequest {
  @ApiProperty()
  @IsNotEmpty({ message: 'user_id là bắt buộc!' })
  @IsNumber()
  user_id: number;

  @IsNotEmpty({ message: 'total_price không được để trống!' })
  @IsNumber({}, { message: 'total_price phải là số!' })
  @Min(0.01, { message: 'total_price không được nhỏ hơn 0!' })
  @ApiProperty()
  total_price: number;

  @IsNotEmpty({ message: 'discount không được để trống!' })
  @IsNumber({}, { message: 'discount phải là số!' })
  @Min(0, { message: 'discount không được nhỏ hơn 0!' })
  @ApiProperty()
  discount?: number;

  @ApiProperty({
    example: 'PENDING',
    enum: OrderStatus,
    description: 'Trạng thái đơn hàng',
  })
  @IsEnum(OrderStatus, {
    message: 'order_status phải là "PENDING", "COMPLETED" hoặc "CANCELLED"',
  })
  @IsOptional()
  order_status?: OrderStatus;

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
}
