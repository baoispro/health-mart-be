export class CreateProductRequest {
  name: string;
  price: number;
  brand: string;
  unit: string;
  category_id: number;
  specification: string;
  country: string;
  short_description: string;
  manufacturer: string;
  registration_number: string;
  description_html: string;
  slug: string;
  image_url?: string;
  avatarFile?: Express.Multer.File; // nếu có file upload
}
