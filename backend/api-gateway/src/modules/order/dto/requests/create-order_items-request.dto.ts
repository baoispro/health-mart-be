import { IsInt, IsPositive, IsNotEmpty, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

// DTO dùng để tạo một mục trong đơn hàng
export class CreateOrderItemRequest {
  @ApiProperty({
    example: 123,
    description: 'ID của đơn hàng. Phải là số nguyên dương lớn hơn hoặc bằng 1.',
  })
  @IsInt({ message: 'ID đơn hàng phải là một số nguyên.' })
  @IsPositive({ message: 'ID đơn hàng phải là một số dương.' })
  @Min(1, { message: 'ID đơn hàng phải lớn hơn hoặc bằng 1.' })
  @IsNotEmpty({ message: 'ID đơn hàng không được để trống.' })
  order_id: number;

  @ApiProperty({
    example: 456,
    description: 'ID của sản phẩm. Phải là số nguyên dương lớn hơn hoặc bằng 1.',
  })
  @IsInt({ message: 'ID sản phẩm phải là một số nguyên.' })
  @IsPositive({ message: 'ID sản phẩm phải là một số dương.' })
  @Min(1, { message: 'ID sản phẩm phải lớn hơn hoặc bằng 1.' })
  @IsNotEmpty({ message: 'ID sản phẩm không được để trống.' })
  product_id: number;

  @ApiProperty({
    example: 2,
    description: 'Số lượng sản phẩm đặt. Phải là số nguyên dương lớn hơn hoặc bằng 1.',
  })
  @IsInt({ message: 'Số lượng phải là một số nguyên.' })
  @IsPositive({ message: 'Số lượng phải là một số dương.' })
  @Min(1, { message: 'Số lượng phải lớn hơn hoặc bằng 1.' })
  @IsNotEmpty({ message: 'Số lượng không được để trống.' })
  quantity: number;
}
