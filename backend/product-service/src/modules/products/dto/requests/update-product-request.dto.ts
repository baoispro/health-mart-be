export class UpdateProductRequest {
  name?: string;
  description_html?: string;
  price?: number;
  brand?: string;
  unit?: string;
  specification?: string;
  country?: string;
  manufacturer?: string;
  registration_number?: string;
  short_description?: string;
  slug?: string;
  image_url?: string;
  categoryId?: number;
  avatarFile?: Express.Multer.File; // nếu có file upload
}
