import { Test, TestingModule } from '@nestjs/testing';
import { OrderShippingAddressService } from './order_shipping_address.service';

describe('OrderShippingAddressService', () => {
  let service: OrderShippingAddressService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderShippingAddressService],
    }).compile();

    service = module.get<OrderShippingAddressService>(
      OrderShippingAddressService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
