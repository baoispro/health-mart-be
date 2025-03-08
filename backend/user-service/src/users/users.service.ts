import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeleteResult, Repository } from 'typeorm';
import { IUserService } from './users.service.interface';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';

@Injectable()
export class UsersService implements IUserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(createUserRequest: CreateUserRequest): Promise<User> {
        const newUser = this.userRepository.create(createUserRequest);
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    async update(id: number, updateUserRequest: UpdateUserRequest): Promise<User>{
        const user = await this.findOne(id);
        Object.assign(user, updateUserRequest);
        return await this.userRepository.save(user);
    }
    
    async remove(id: number): Promise<DeleteResult> {
        return await this.userRepository.delete(id);
    }
}