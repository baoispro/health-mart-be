import { Role } from '../../enums/users.enum';

export class UpdateUserRequest {
  avatar?: string;
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
  role?: Role;
  avatarFile?: Express.Multer.File; 
}
