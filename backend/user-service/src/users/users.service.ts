import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { DeleteResult, Not, Repository } from 'typeorm';
import { IUserService } from './users.service.interface';
import { CreateUserRequest } from './dto/requests/create-user-request.dto';
import { UpdateUserRequest } from './dto/requests/update-user-request.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class UsersService implements IUserService{
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ){}

    async create(createUserRequest: CreateUserRequest): Promise<User> {
        const { email, phone } = createUserRequest;

        const existingUser = await this.userRepository.findOne({
            where: [{ email }, { phone }],
        });

        if (existingUser) {
            throw new RpcException(
                new ConflictException('Email hoặc số điện thoại đã tồn tại!')
            );
        }
        const newUser = this.userRepository.create(createUserRequest);
        return await this.userRepository.save(newUser);
    }

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new RpcException(
                new NotFoundException(`User ${id} không tìm thấy`)
            );
        }
        return user;
    }

    async update(id: number, updateUserRequest: UpdateUserRequest): Promise<User>{
        const user = await this.findOne(id);
        const { email, phone } = updateUserRequest;

        if (email || phone) {
            const existingUser = await this.userRepository.findOne({
                where: [
                    email ? { email, id: Not(id) } : null, 
                    phone ? { phone, id: Not(id) } : null
                ].filter(Boolean),
            });
    
            if (existingUser) {
                throw new RpcException(
                    new ConflictException('Email hoặc số điện thoại đã tồn tại!')
                );
            }
        }
        Object.assign(user, updateUserRequest);
        return await this.userRepository.save(user);
    }
    
    async remove(id: number): Promise<DeleteResult> {
        const user = await this.findOne(id);
        return await this.userRepository.delete(id);
    }
}