export class UpdateCategoryRequest {
  name?: string;
  slug?: string;
  parent_id?: number;
  image?: string;
  avatarFile?: Express.Multer.File; // nếu có file upload
}
