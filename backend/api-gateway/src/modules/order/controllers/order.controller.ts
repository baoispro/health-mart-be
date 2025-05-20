// src/modules/orders/controllers/order.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiParam,
} from '@nestjs/swagger';
import { OrderService } from '../services/order.service';
import { CreateOrderRequest } from '../dto/requests/create-order-request.dto';
import { BaseResponseDto } from '../dto/responses/base-response.dto';
import { ResponseMessage } from 'src/common/decorators/response-message.decorator';
import { UpdateOrderRequest } from '../dto/requests/update-order-request.dto';
import { CreateOrderShippingAddressRequest } from '../dto/requests/create-ordershippingaddress-request.dto';
import { UpdateOrderShippingAddressRequest } from '../dto/requests/update-ordershippingaddress-request.dto';
import { CreateOrderItemRequest } from '../dto/requests/create-order_items-request.dto';
import { UpdateOrderPromotionRequest } from '../dto/requests/update-order_promotions-request.dto';
import { CreateOrderPromotionRequest } from '../dto/requests/create-order_promotions-request.dto';
import { CreateDiscountCodeRequest } from '../dto/requests/create-discount_code-request.dto';
import { UpdateDiscountCodeRequest } from '../dto/requests/update-discount_code-request.dto';

// @UseGuards(JwtAuthGuard)
// @ApiBearerAuth('access-token')
@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}
  //ORDER PROMOTIONS
  @Get('order-promotions')
  @ApiOperation({ summary: 'Lấy tất cả khuyến mãi cho đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách khuyến mãi được trả về',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách khuyến mãi thành công')
  getAllOrderPromotions() {
    return this.orderService.getAllOrderPromotions();
  }

  @Get('order-promotions/order/:orderId')
  @ApiOperation({ summary: 'Lấy khuyến mãi theo ID đơn hàng' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Danh sách khuyến mãi của đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy khuyến mãi của đơn hàng thành công')
  getOrderPromotionsByOrderId(@Param('orderId') orderId: number) {
    return this.orderService.getOrderPromotionsByOrderId(orderId);
  }

  @Post('order-promotions')
  @ApiOperation({ summary: 'Tạo mới thông tin khuyến mãi cho đơn hàng' })
  @ApiBody({ type: CreateOrderPromotionRequest })
  @ApiResponse({
    status: 201,
    description: 'Thông tin khuyến mãi được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo thông tin khuyến mãi thành công')
  createOrderPromotion(
    @Body() createOrderPromotionDto: CreateOrderPromotionRequest,
  ) {
    return this.orderService.createOrderPromotion(createOrderPromotionDto);
  }

  @Put('order-promotions/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin khuyến mãi cho đơn hàng' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrderPromotionRequest })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thông tin khuyến mãi thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật thông tin khuyến mãi thành công')
  updateOrderPromotion(
    @Param('id') id: number,
    @Body() updateOrderPromotionDto: UpdateOrderPromotionRequest,
  ) {
    return this.orderService.updateOrderPromotion(id, updateOrderPromotionDto);
  }

  @Delete('order-promotions/:id')
  @ApiOperation({ summary: 'Xóa thông tin khuyến mãi cho đơn hàng' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Xóa thông tin khuyến mãi thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa thông tin khuyến mãi thành công')
  deleteOrderPromotion(@Param('id') id: number) {
    return this.orderService.deleteOrderPromotion(id);
  }

  // ORDER ITEMS
  @Get('order-items')
  @ApiOperation({ summary: 'Lấy tất cả items của đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách các items của đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách các items của đơn hàng thành công')
  getAllOrderItems() {
    return this.orderService.getAllOrderItems();
  }

  @Get('order-items/order/:orderId')
  @ApiOperation({ summary: 'Lấy tất cả items của đơn hàng theo ID đơn hàng' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Danh sách items của đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách items của đơn hàng thành công')
  getOrderItemsByOrderId(@Param('orderId') orderId: number) {
    return this.orderService.getOrderItemsByOrderId(orderId);
  }

  // ORDER SHIPPING ADDRESSES
  @Get('shipping-addresses')
  @ApiOperation({ summary: 'Lấy tất cả địa chỉ giao hàng' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách địa chỉ giao hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách địa chỉ giao hàng thành công')
  getAllShippingAddresses() {
    return this.orderService.getAllShippingAddresses();
  }

  @Get('shipping-addresses/:id')
  @ApiOperation({ summary: 'Lấy địa chỉ giao hàng theo ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết địa chỉ giao hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy địa chỉ giao hàng thành công')
  getShippingAddressById(@Param('id') id: number) {
    return this.orderService.getShippingAddressById(id);
  }

  @Get('shipping-addresses/order/:orderId')
  @ApiOperation({ summary: 'Lấy địa chỉ giao hàng theo ID đơn hàng' })
  @ApiParam({ name: 'orderId', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Chi tiết địa chỉ giao hàng theo đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy địa chỉ giao hàng theo đơn hàng thành công')
  getShippingAddressByOrderId(@Param('orderId') orderId: number) {
    return this.orderService.getShippingAddressByOrderId(orderId);
  }

  @Get()
  @ApiOperation({ summary: 'Lấy danh sách đơn hàng' })
  @ApiResponse({ status: 200, description: 'Danh sách đơn hàng được trả về' })
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Lấy thông tin một đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Thông tin đơn hàng',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin đơn hàng thành công')
  getOrderById(@Param('id') id: number) {
    return this.orderService.getOrderById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Tạo đơn hàng mới' })
  @ApiBody({ type: CreateOrderRequest })
  @ApiResponse({ status: 201, description: 'Đơn hàng được tạo thành công' })
  @ResponseMessage('Tạo đơn hàng thành công')
  async createOrder(@Body() createOrderDto: CreateOrderRequest) {
    return this.orderService.createOrder(createOrderDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Cập nhật thông tin đơn hàng' })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật đơn hàng thành công')
  updateOrder(
    @Param('id') id: number,
    @Body() updateOrderRequest: UpdateOrderRequest,
  ) {
    return this.orderService.updateOrder(id, updateOrderRequest);
  }

  @Post('shipping-addresses')
  @ApiOperation({ summary: 'Tạo mới địa chỉ giao hàng' })
  @ApiBody({ type: CreateOrderShippingAddressRequest })
  @ApiResponse({
    status: 201,
    description: 'Tạo địa chỉ giao hàng thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo địa chỉ giao hàng thành công')
  createShippingAddress(@Body() createDto: CreateOrderShippingAddressRequest) {
    return this.orderService.createShippingAddress(createDto);
  }

  @Put('shipping-addresses/:id')
  @ApiOperation({ summary: 'Cập nhật địa chỉ giao hàng' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateOrderShippingAddressRequest })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật địa chỉ giao hàng thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật địa chỉ giao hàng thành công')
  updateShippingAddress(
    @Param('id') id: number,
    @Body() updateDto: UpdateOrderShippingAddressRequest,
  ) {
    return this.orderService.updateShippingAddress(id, updateDto);
  }

  @Post('order-items')
  @ApiOperation({ summary: 'Tạo mới item cho đơn hàng' })
  @ApiBody({ type: CreateOrderItemRequest })
  @ApiResponse({ status: 201, description: 'Tạo item thành công' })
  @ResponseMessage('Tạo item thành công')
  createOrderItems(@Body() createOrderItemsDto: CreateOrderItemRequest[]) {
    return this.orderService.createOrderItems(createOrderItemsDto);
  }

  @Delete('order-items/:orderItemId')
  @ApiOperation({ summary: 'Xóa một item khỏi đơn hàng dựa trên ID' })
  @ApiParam({
    name: 'orderItemId',
    type: Number,
    description: 'ID của item cần xóa',
  })
  @ApiResponse({
    status: 200,
    description: 'Item được xóa thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Item được xóa thành công')
  deleteItemById(@Param('orderItemId') orderItemId: number) {
    return this.orderService.deleteItemById(orderItemId);
  }

  @Get('discount-codes')
  @ApiOperation({ summary: 'Lấy danh sách mã giảm giá' })
  @ApiResponse({
    status: 200,
    description: 'Danh sách mã giảm giá được trả về',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy danh sách mã giảm giá thành công')
  getAllDiscountCodes() {
    return this.orderService.getAllDiscountCodes();
  }

  @Get('discount-codes/:id')
  @ApiOperation({ summary: 'Lấy thông tin một mã giảm giá' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Thông tin mã giảm giá',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin mã giảm giá thành công')
  getDiscountCodeById(@Param('id') id: number) {
    return this.orderService.getDiscountCodeById(id);
  }

  @Get('discount-codes/by-code/:code')
  @ApiOperation({ summary: 'Lấy thông tin mã giảm giá theo code' })
  @ApiParam({ name: 'code', type: String })
  @ApiResponse({
    status: 200,
    description: 'Thông tin mã giảm giá theo code',
    type: BaseResponseDto,
  })
  @ResponseMessage('Lấy thông tin mã giảm giá theo code thành công')
  getDiscountCodeByCode(@Param('code') code: string) {
    return this.orderService.getDiscountCodeByCode(code);
  }

  @Post('discount-codes')
  @ApiOperation({ summary: 'Tạo mới mã giảm giá' })
  @ApiBody({ type: CreateDiscountCodeRequest })
  @ApiResponse({
    status: 201,
    description: 'Mã giảm giá được tạo thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Tạo mã giảm giá thành công')
  createDiscountCode(@Body() createDiscountDto: CreateDiscountCodeRequest) {
    return this.orderService.createDiscountCode(createDiscountDto);
  }

  @Put('discount-codes/:id')
  @ApiOperation({ summary: 'Cập nhật thông tin mã giảm giá' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateDiscountCodeRequest })
  @ApiResponse({
    status: 200,
    description: 'Cập nhật mã giảm giá thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Cập nhật mã giảm giá thành công')
  updateDiscountCode(
    @Param('id') id: number,
    @Body() updateDiscountDto: UpdateDiscountCodeRequest,
  ) {
    return this.orderService.updateDiscountCode(id, updateDiscountDto);
  }

  @Delete('discount-codes/:id')
  @ApiOperation({ summary: 'Xóa mã giảm giá' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'Xóa mã giảm giá thành công',
    type: BaseResponseDto,
  })
  @ResponseMessage('Xóa mã giảm giá thành công')
  deleteDiscountCode(@Param('id') id: number) {
    return this.orderService.deleteDiscountCode(id);
  }
}
