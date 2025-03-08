import { Role } from "src/users/users.enum";

export class CreateUserRequest {
    avatar?: string;
    fullName: string;
    email: string;
    phone: string;
    password: string;
    role?: Role;
}