import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Not, Repository } from 'typeorm';
import { RpcException } from '@nestjs/microservices';
import { IAddressService } from '../interfaces/address.service.interface';
import { Address } from '../entities/address.entity';
import { CreateAddressDto } from '../dto/requests/create-address-request.dto';
import { UpdateAddressDto } from '../dto/requests/update-address-request.dto';
import { User } from 'src/modules/user/entities/users.entity';

@Injectable()
export class AddressService implements IAddressService {
  constructor(
    @InjectRepository(Address)
    private addressRepository: Repository<Address>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async createAddress(createAddressDto: CreateAddressDto): Promise<Address> {
    const { address_street, ward, district, city, userId } = createAddressDto;
    const existingAddress = await this.addressRepository.findOne({
      where: {
        address_street,
        ward,
        district,
        city,
        user: { id: userId }, // nếu bạn dùng quan hệ ManyToOne
      },
      relations: ['user'],
    });
    if (existingAddress) {
      throw new RpcException(
        new ConflictException(`Địa chỉ này đã tồn tại cho user ID ${userId}`),
      );
    }
    const newAddress = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newAddress);
  }

  async findOne(id: number): Promise<Address> {
    const user = await this.addressRepository.findOne({
      where: { id },
      relations: ['user'],
    });
    if (!user) {
      throw new RpcException(
        new NotFoundException(`Address ${id} không tìm thấy`),
      );
    }
    return user;
  }

  async update(
    id: number,
    updateAddressRequest: UpdateAddressDto,
  ): Promise<Address> {
    const address = await this.findOne(id);
    const { address_street, ward, district, city, userId } =
      updateAddressRequest;

    const targetUserId = userId || address.user?.id; // Nếu userId không truyền vào thì dùng user hiện tại

    // Kiểm tra địa chỉ trùng lặp (nhưng phải khác id hiện tại)
    const duplicate = await this.addressRepository.findOne({
      where: {
        address_street,
        ward,
        district,
        city,
        user: { id: targetUserId },
        // Tránh so sánh với chính nó
        id: Not(id),
      },
      relations: ['user'],
    });

    if (duplicate) {
      throw new RpcException(
        new ConflictException(
          `Địa chỉ này đã tồn tại cho user ID ${targetUserId}`,
        ),
      );
    }

    // Nếu có userId truyền vào thì validate và gán lại user
    if (userId) {
      const user = await this.userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        throw new RpcException(
          new NotFoundException(`User ${userId} không tồn tại`),
        );
      }

      address.user = user;
    }

    // Gán các trường còn lại
    Object.assign(address, updateAddressRequest);

    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.addressRepository.delete(id);
  }
}
