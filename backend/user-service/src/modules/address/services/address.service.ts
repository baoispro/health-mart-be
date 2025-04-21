import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
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
    const newUser = this.addressRepository.create(createAddressDto);
    return await this.addressRepository.save(newUser);
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

    // Nếu có userId truyền vào thì cần validate và gán lại user
    if (updateAddressRequest.userId) {
      const user = await this.userRepository.findOne({
        where: { id: updateAddressRequest.userId },
      });

      if (!user) {
        throw new RpcException(
          new NotFoundException(
            `User ${updateAddressRequest.userId} không tồn tại`,
          ),
        );
      }

      address.user = user; // Gán lại quan hệ
    }

    // Gán các trường khác (ngoại trừ userId, đã xử lý ở trên)
    Object.assign(address, { ...updateAddressRequest });

    return await this.addressRepository.save(address);
  }

  async remove(id: number): Promise<DeleteResult> {
    await this.findOne(id);
    return await this.addressRepository.delete(id);
  }
}
