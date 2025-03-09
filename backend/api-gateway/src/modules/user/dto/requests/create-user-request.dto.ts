import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../users.enum";

export class CreateUserRequest {
    @ApiProperty()
    avatar?: string;
    @ApiProperty()
    fullName: string;
    email: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    password: string;
    @ApiProperty()
    role?: Role;
}