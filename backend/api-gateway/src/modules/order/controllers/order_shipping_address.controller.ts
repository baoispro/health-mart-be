import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';
import { OrderShippingAddressService } from '../services/order_shipping_address.service';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { BaseResponseDto } from '../dto/responses/base-response.dto';

// Gắn nhãn nhóm API là "Địa chỉ giao hàng đơn hàng"
@ApiTags('Order Shipping Address')
@Controller('order-shipping-addresses')
export class OrderShippingAddressController {
  constructor(
    private readonly orderShippingAddressService: OrderShippingAddressService,
  ) {}

  // Lấy tất cả địa chỉ giao hàng
  @Get()
  @ApiOperation({ summary: 'Lấy tất cả địa chỉ giao hàng' })
  @ApiResponse({ 
    status: 200, 
    description: 'Danh sách địa chỉ giao hàng',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy danh sách địa chỉ giao hàng thành công')
  async getAllShippingAddresses() {
    return this.orderShippingAddressService.findAll();
  }

  // Lấy địa chỉ giao hàng theo ID
  @Get(':id')
  @ApiOperation({ summary: 'Lấy địa chỉ giao hàng theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Chi tiết địa chỉ giao hàng',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy địa chỉ giao hàng thành công')
  async getShippingAddressById(@Param('id') id: number) {
     return this.orderShippingAddressService.findOne(id);
  }

  // Tạo mới địa chỉ giao hàng
  @Post()
  @ApiOperation({ summary: 'Tạo mới địa chỉ giao hàng' })
  @ApiBody({ type: CreateOrderShippingAddressRequest })
  @ApiResponse({ 
    status: 201, 
    description: 'Tạo địa chỉ giao hàng thành công',
    type: BaseResponseDto 
  })
  @ResponseMessage('Tạo địa chỉ giao hàng thành công')
  async createShippingAddress(@Body() createDto: CreateOrderShippingAddressRequest) {
     return this.orderShippingAddressService.create(createDto);

  }

  // Cập nhật địa chỉ giao hàng theo ID
  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật địa chỉ giao hàng' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrderShippingAddressRequest })
  @ApiResponse({ 
    status: 200, 
    description: 'Cập nhật địa chỉ giao hàng thành công',
    type: BaseResponseDto 
  })
  @ResponseMessage('Cập nhật địa chỉ giao hàng thành công')
  async updateShippingAddress(
    @Param('id') id: number,
    @Body() updateDto: UpdateOrderShippingAddressRequest,
  ) {
     return this.orderShippingAddressService.update(id, updateDto);
     
  }

  // Lấy địa chỉ giao hàng theo orderId
  @Get('order/:orderId')
  @ApiOperation({ summary: 'Lấy địa chỉ giao hàng theo ID đơn hàng' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({ 
    status: 200, 
    description: 'Chi tiết địa chỉ giao hàng theo đơn hàng',
    type: BaseResponseDto 
  })
  @ResponseMessage('Lấy địa chỉ giao hàng theo đơn hàng thành công')
  async getShippingAddressByOrderId(@Param('orderId') orderId: number) {
     return this.orderShippingAddressService.findByOrderId(orderId);
     
  }
}
