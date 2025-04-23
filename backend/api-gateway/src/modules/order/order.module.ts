import { Module } from '@nestjs/common';
import { OrderController } from './controllers/order.controller';
import { OrderService } from './services/order.service';
import { OrderShippingAddressController } from './controllers/order_shipping_address.controller';
import { OrderShippingAddressService } from './services/order_shipping_address.service';
import { ReviewService} from '../review/services/review.service';
import { ReviewController} from '../review/controllers/review.controller';
import { ClientProxyFactoryService } from 'src/utils/client-proxy.factory';
import { OrderItemService } from './services/order_item.service';
import { OrderItemController } from './controllers/order_item.controller';


@Module({
  controllers: [OrderController, OrderShippingAddressController, ReviewController, OrderItemController ],
  providers: [OrderService, OrderShippingAddressService, ReviewService,OrderItemService, ClientProxyFactoryService],
})
export class OrderModule {}
