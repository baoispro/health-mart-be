import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AddressService } from '../services/address.service';
import { CreateAddressDto } from '../dto/requests/create-address-request.dto';
import { UpdateAddressDto } from '../dto/requests/update-address-request.dto';

@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @MessagePattern('get_address_by_id')
  async getAddressById(@Payload() id: number) {
    return this.addressService.findOne(id);
  }

  @MessagePattern('create_address')
  async createAddress(@Payload() createUserRequest: CreateAddressDto) {
    return this.addressService.createAddress(createUserRequest);
  }

  @MessagePattern('update_address')
  async updateAddress(
    @Payload() data: { id: number; updateUserRequest: UpdateAddressDto },
  ) {
    return this.addressService.update(data.id, data.updateUserRequest);
  }

  @MessagePattern('get_addresses_by_user')
  async getAddressesByUser(@Payload() userId: number) {
    return this.addressService.getAddressesByUser(userId);
  }

  @MessagePattern('delete_address')
  async deleteAddress(@Payload() id: number) {
    return this.addressService.remove(id);
  }
}
