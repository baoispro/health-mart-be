import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus, OrderShipMethod } from '../../enums/order.enum';
import { IsEnum, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class UpdateOrderRequest {
  @ApiProperty({
    example: 'PENDING',
    enum: OrderStatus,
    description: 'Trạng thái đơn hàng',
  })
  @IsNotEmpty({ message: 'Trạng thái đơn hàng không được để trống' })
  @IsEnum(OrderStatus, {
    message: 'order_status phải là "PENDING", "COMPLETED" hoặc "CANCELLED"',
  })
  @IsOptional()
  order_status?: OrderStatus;

  @ApiProperty({
    example: 'HOME_DELIVERY',
    enum: OrderShipMethod,
    description: 'Phương thức vận chuyển',
  })
  @IsNotEmpty({ message: 'Phương thức vận chuyển không được để trống' })
  @IsEnum(OrderShipMethod, {
    message: 'ship_method phải là "HOME_DELIVERY" hoặc "PICK_UP"',
  })
  @IsOptional()
  ship_method?: OrderShipMethod;

  @ApiProperty({
    example: 100000,
    description: 'Tổng giá trị đơn hàng trước giảm giá',
  })
  @IsNotEmpty({ message: 'total_price không được để trống' })
  @IsNumber({}, { message: 'total_price phải là kiểu số' })
  @IsOptional()
  total_price?: number;

  @ApiProperty({
    example: 5000,
    description: 'Giảm giá áp dụng',
  })
  @IsNotEmpty({ message: 'final_price không được để trống' })
  @IsNumber({}, { message: 'discount phải là kiểu số' })
  @IsOptional()
  final_price?: number;

  @ApiProperty({
    example: 95000,
    description: 'Giá sau giảm',
  })
  @IsNotEmpty({ message: 'discount không được để trống' })
  @IsNumber({}, { message: 'final_price phải là kiểu số' })
  @IsOptional()
  discount?: number;
}
