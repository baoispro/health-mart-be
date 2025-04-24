import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, Min } from "class-validator";

export class CreateOrderItemRequest {
  @ApiProperty()
  @IsNotEmpty({ message: "order_id là bắt buộc!" })
  @IsNumber()
  order_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: "product_id là bắt buộc!" })
  @IsNumber()
  product_id: number;

  @ApiProperty()
  @IsNotEmpty({ message: "quantity là bắt buộc!" })
  @IsNumber({}, { message: "quantity phải là số!" })
  @Min(1, { message: "quantity phải lớn hơn hoặc bằng 1!" })
  quantity: number;

  @ApiProperty()
  @IsNotEmpty({ message: "price là bắt buộc!" })
  @IsNumber({}, { message: "price phải là số!" })
  @Min(0, { message: "price không được nhỏ hơn 0!" })
  price: number;
}
