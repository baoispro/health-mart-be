import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities/users.entity';
import { DeleteResult, In, Not, Repository } from 'typeorm';
import { IUserService } from '../interfaces/users.service.interface';
import { UpdateUserRequest } from '../dto/requests/update-user-request.dto';
import { RpcException } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserRequest } from '../dto/requests/create-user-request.dto';

@Injectable()
export class UsersService implements IUserService {
  private s3: S3Client;
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async create(payload: CreateUserRequest): Promise<User> {
    const { email, phone, password, avatarFile, ...rest } = payload;

    // Kiểm tra email hoặc số điện thoại đã tồn tại
    const existingUser = await this.userRepository.findOne({
      where: [{ email }, { phone }],
    });

    if (existingUser) {
      throw new RpcException(
        new ConflictException('Email hoặc số điện thoại đã tồn tại!'),
      );
    }

    // Băm mật khẩu
    const hashedPassword = await bcrypt.hash(password, 10);

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = rest.avatar ?? 'https://example.com/avatar.png'; // default
    if (avatarFile) {
      avatarUrl = await this.uploadToS3(avatarFile); // bạn cần viết hàm này
    }

    const newUser = this.userRepository.create({
      ...rest,
      email,
      phone,
      password: hashedPassword,
      avatar: avatarUrl,
    });

    // không cần ép kiểu nữa, vì create trả về entity đúng kiểu
    return await this.userRepository.save(newUser);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({ relations: ['addresses'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['addresses'],
    });
    if (!user) {
      throw new RpcException(
        new NotFoundException(`User ${id} không tìm thấy`),
      );
    }
    return user;
  }

  async findUserByEmail(email: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  }

  async update(
    id: number,
    updateUserRequest: UpdateUserRequest,
  ): Promise<User> {
    const user = await this.findOne(id);
    const { email, phone, ...rest } = updateUserRequest;

    if (email || phone) {
      const existingUser = await this.userRepository.findOne({
        where: [
          email ? { email, id: Not(id) } : null,
          phone ? { phone, id: Not(id) } : null,
        ].filter(Boolean),
      });

      if (existingUser) {
        throw new RpcException(
          new ConflictException('Email hoặc số điện thoại đã tồn tại!'),
        );
      }
    }

    // Nếu có avatarFile thì upload lên S3
    let avatarUrl = rest.avatar ?? 'https://example.com/avatar.png'; // default
    if (rest.avatarFile) {
      avatarUrl = await this.uploadToS3(rest.avatarFile); // bạn cần viết hàm này
    }

    rest.avatar = avatarUrl; // cập nhật avatarUrl nếu có

    Object.assign(user, updateUserRequest);
    return await this.userRepository.save(user);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.userRepository.delete(id);
  }

  async checkUserExist(id: number): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  }

  async findUsersByIds(ids: number[]): Promise<User[]> {
    return this.userRepository.findBy({ id: In(ids) });
  }

  async uploadToS3(file: any): Promise<string> {
    const bucket = process.env.AWS_BUCKET_NAME;
    const fileName = `avatars/${uuidv4()}_${file.originalname}`;
    const buffer = Buffer.from(file.buffer);

    const command = new PutObjectCommand({
      Bucket: bucket,
      Key: fileName,
      Body: buffer,
      ContentType: file.mimetype,
    });

    await this.s3.send(command);

    return `https://${bucket}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  }
}
