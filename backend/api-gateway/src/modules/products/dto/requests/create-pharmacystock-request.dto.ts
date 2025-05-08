import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  IsInt,
  IsPositive,
  IsString,
  IsNotEmpty,
  Length,
} from 'class-validator';

export class CreatePharmacyStockRequest {
  @ApiProperty({
    example: 1,
    description: 'ID của nhà thuốc',
    required: true,
  })
  @Expose()
  @IsInt({ message: 'ID nhà thuốc phải là số nguyên' })
  @IsPositive({ message: 'ID nhà thuốc phải là số dương' })
  @IsNotEmpty({ message: 'ID nhà thuốc không được để trống' })
  pharmacy_id: number;

  @ApiProperty({
    example: 'Paracetamol 500mg',
    description: 'Tên sản phẩm',
    maxLength: 255,
  })
  @Expose()
  @IsString({ message: 'Tên sản phẩm phải là chuỗi' })
  @IsNotEmpty({ message: 'Tên sản phẩm không được để trống' })
  @Length(1, 255, { message: 'Tên sản phẩm phải từ 1 đến 255 ký tự' })
  name: string;

  @ApiProperty({
    example: '123 Đường Láng',
    description: 'Địa chỉ đường',
    maxLength: 255,
  })
  @Expose()
  @IsString({ message: 'Địa chỉ phải là chuỗi' })
  @IsNotEmpty({ message: 'Địa chỉ không được để trống' })
  @Length(1, 255, { message: 'Địa chỉ phải từ 1 đến 255 ký tự' })
  address_street: string;

  @ApiProperty({
    example: 'Phường Láng Thượng',
    description: 'Phường/Xã',
    maxLength: 100,
  })
  @Expose()
  @IsString({ message: 'Tên phường/xã phải là chuỗi' })
  @IsNotEmpty({ message: 'Phường/Xã không được để trống' })
  @Length(1, 100, { message: 'Tên phường/xã phải từ 1 đến 100 ký tự' })
  ward: string;

  @ApiProperty({
    example: 'Quận Đống Đa',
    description: 'Quận/Huyện',
    maxLength: 100,
  })
  @Expose()
  @IsString({ message: 'Tên quận/huyện phải là chuỗi' })
  @IsNotEmpty({ message: 'Quận/Huyện không được để trống' })
  @Length(1, 100, { message: 'Tên quận/huyện phải từ 1 đến 100 ký tự' })
  district: string;

  @ApiProperty({
    example: 'Hà Nội',
    description: 'Thành phố/Tỉnh',
    maxLength: 100,
  })
  @Expose()
  @IsString({ message: 'Tên thành phố phải là chuỗi' })
  @IsNotEmpty({ message: 'Thành phố không được để trống' })
  @Length(1, 100, { message: 'Tên thành phố phải từ 1 đến 100 ký tự' })
  city: string;

  // @ApiProperty({
  //   example: 'LOT2023-001',
  //   description: 'Mã lô hàng',
  //   required: false,
  // })
  // @Expose()
  // @IsString({ message: 'Mã lô hàng phải là chuỗi' })
  // @IsOptional()
  // batch_number?: string;

  // @ApiProperty({
  //   example: '2023-12-31',
  //   description: 'Ngày hết hạn',
  //   required: false,
  // })
  // @Expose()
  // @IsString({ message: 'Ngày hết hạn phải là chuỗi' })
  // @IsOptional()
  // expiry_date?: string;
}
