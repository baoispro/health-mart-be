import { ApiProperty } from "@nestjs/swagger";
import { OrderStatus, OrderShipMethod } from "../../enums/order.enum";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateOrderRequest {
  @ApiProperty({ example: 'PENDING', enum: OrderStatus, description: 'Trạng thái đơn hàng' })
  @IsEnum(OrderStatus, { message: 'order_status phải là "PENDING", "COMPLETED" hoặc "CANCELLED"' })
  @IsOptional()
  order_status?: OrderStatus;

  @ApiProperty({ example: 'HOME_DELIVERY', enum: OrderShipMethod, description: 'Phương thức vận chuyển' })
  @IsEnum(OrderShipMethod, { message: 'ship_method phải là "HOME_DELIVERY" hoặc "PICK_UP"' })
  @IsOptional()
  ship_method?: OrderShipMethod;
}
