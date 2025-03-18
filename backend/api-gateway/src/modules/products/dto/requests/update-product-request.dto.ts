import { IsOptional, IsString, IsNumber } from 'class-validator';
import { Transform,  Expose } from 'class-transformer'

export class UpdateProductRequest {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description_html?: string;

  @IsOptional()
  @IsNumber()
  price?: number;

  @IsOptional()
  @IsString()
  brand?: string;

  @IsOptional()
  @IsString()
  unit?: string;

  @IsOptional()
  @IsString()
  specification?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  manufacturer?: string;

  @IsOptional()
  @IsString()
  registration_number?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  image_url?: string;

  @IsOptional()
  @IsNumber()
  category_id?: number;

  @IsOptional()
  @Expose()
  @Transform(({ obj }) => obj.category_id)  
  categoryId?: number;
}
