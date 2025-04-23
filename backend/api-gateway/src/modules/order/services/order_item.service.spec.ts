import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemService } from './order_item.service';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';

describe('OrderItemService', () => {
  let service: OrderItemService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrderItemService, ClientProxyFactoryService],
    }).compile();

    service = module.get<OrderItemService>(OrderItemService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
