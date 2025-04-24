import { Test, TestingModule } from '@nestjs/testing';
import { OrderShippingAddressController } from './order_shipping_address.controller';

describe('OrderShippingAddressController', () => {
  let controller: OrderShippingAddressController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderShippingAddressController],
    }).compile();

    controller = module.get<OrderShippingAddressController>(
      OrderShippingAddressController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
