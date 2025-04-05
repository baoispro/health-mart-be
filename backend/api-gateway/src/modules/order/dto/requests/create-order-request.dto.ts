import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsOptional, Min } from "class-validator";
import { OrderShipMethod, OrderStatus } from "../../enums/order.enum";

export class CreateOrderRequest {
  @ApiProperty()
  @IsNotEmpty({ message: "user_id là bắt buộc!" })
  @IsNumber()
  user_id: number;

  @IsNotEmpty({ message: 'total_price không được để trống!' })
  @IsNumber({}, { message: 'total_price phải là số!' })
  @Min(0, { message: 'total_price không được nhỏ hơn 0!' })
  @ApiProperty()
  total_price: number;

  @IsNotEmpty({ message: 'discount không được để trống!' })
  @IsNumber({}, { message: 'discount phải là số!' })
  @Min(0, { message: 'discount không được nhỏ hơn 0!' })
  @ApiProperty()
  discount: number;

  @IsNotEmpty({ message: 'final_price không được để trống!' })
  @IsNumber({}, { message: 'final_price phải là số!' })
  @Min(0, { message: 'final_price không được nhỏ hơn 0!' })
  @ApiProperty()
  final_price: number;

  @ApiProperty({ example: 'PENDING', enum: OrderStatus, description: 'Trạng thái đơn hàng' })
  @IsEnum(OrderStatus, { message: 'order_status phải là "PENDING", "COMPLETED" hoặc "CANCELLED"' })
  @IsOptional()
  order_status?: OrderStatus;

  @ApiProperty({ example: 'HOME_DELIVERY', enum: OrderShipMethod, description: 'Phương thức vận chuyển' })
  @IsEnum(OrderShipMethod, { message: 'ship_method phải là "HOME_DELIVERY" hoặc "PICK_UP"' })
  @IsOptional()
  ship_method?: OrderShipMethod;
}
