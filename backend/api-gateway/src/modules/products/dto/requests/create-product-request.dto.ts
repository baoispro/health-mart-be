import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, IsNumber } from 'class-validator';

export class CreateProductRequest {
  @ApiProperty()
  @Expose()
  @IsString()
  name: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  price: number;

  @ApiProperty()
  @Expose()
  @IsString()
  brand: string;

  @ApiProperty()
  @Expose()
  @IsString()
  unit: string;

  @ApiProperty()
  @Expose()
  @IsNumber()
  category_id: number;

  @ApiProperty()
  @Expose()
  @IsString()
  specification: string;

  @ApiProperty()
  @Expose()
  @IsString()
  country: string;

  @ApiProperty()
  @Expose()
  @IsString()
  short_description: string;

  @ApiProperty()
  @Expose()
  @IsString()
  manufacturer: string;

  @ApiProperty()
  @Expose()
  @IsString()
  registration_number: string;

  @ApiProperty()
  @Expose()
  @IsString()
  description_html: string;

  @ApiProperty()
  @Expose()
  @IsString()
  slug: string;

  @ApiProperty()
  @Expose()
  @IsString()
  image_url: string;
}
