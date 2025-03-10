import { ApiProperty } from "@nestjs/swagger";
export class CreateOrderRequest {
    @ApiProperty()
    user_id: number;
  
    @ApiProperty()
    product_id: string;
  
    @ApiProperty()
    quantity: number;
  
    @ApiProperty()
    total_price: number;
  
    @ApiProperty()
    order_status: string;
  }
  