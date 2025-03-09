import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../../users.enum";

export class UpdateUserRequest {
    @ApiProperty()
    avatar?: string;
    @ApiProperty()
    fullName?: string;
    @ApiProperty()
    email?: string;
    @ApiProperty()
    phone?: string;
    @ApiProperty()
    password?: string;
    @ApiProperty()
    role?: Role;
}