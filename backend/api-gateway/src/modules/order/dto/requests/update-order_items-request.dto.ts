import { IsInt, IsPositive, IsOptional, Min } from 'class-validator';

export class UpdateOrderItemRequest {
  @IsInt({ message: 'Order ID must be an integer.' })
  @IsPositive({ message: 'Order ID must be a positive number.' })
  @Min(1, { message: 'Order ID must be greater than or equal to 1.' })
  @IsOptional()
  order_id?: number;

  @IsInt({ message: 'Product ID must be an integer.' })
  @IsPositive({ message: 'Product ID must be a positive number.' })
  @Min(1, { message: 'Product ID must be greater than or equal to 1.' })
  @IsOptional()
  product_id?: number;

  @IsInt({ message: 'Quantity must be an integer.' })
  @IsPositive({ message: 'Quantity must be a positive number.' })
  @Min(1, { message: 'Quantity must be greater than or equal to 1.' })
  @IsOptional()
  quantity?: number;
}
