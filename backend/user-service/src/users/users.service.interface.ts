import { DeleteResult } from 'typeorm';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';
import { User } from './users.entity';

export interface IUserService {
    create(createUserRequest: CreateUserRequest): Promise<User>;
    findAll(): Promise<User[]>;
    findOne(id: number) :Promise<User>;
    update(id: number, updateUserRequest: UpdateUserRequest): Promise<User>;
    remove(id: number): Promise<DeleteResult>
}
