import { Role } from '../../enums/users.enum';

export class CreateUserRequest {
  avatar?: string;
  fullName: string;
  email: string;
  phone: string;
  password: string;
  role?: Role;
  avatarFile?: Express.Multer.File; // nếu có file upload
}
