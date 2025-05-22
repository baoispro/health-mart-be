import { Controller, Post, Get, Query, Body } from '@nestjs/common';
import { VnpayService } from '../services/payment.service';

@Controller('vnpay')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Post('create-payment')
  async createPayment(@Body() body: { amount: number; orderId: number }) {
    const paymentUrl = this.vnpayService.createPaymentUrl({
      amount: body.amount,
      orderId: body.orderId,
    });
    return { paymentUrl };
  }

  @Get('return')
  async vnpayReturn(@Query() query: any) {
    const isValid = this.vnpayService.verifyVnpayReturn(query);

    if (!isValid) {
      return { success: false, message: 'Dữ liệu không hợp lệ!' };
    }

    const statusCode = query.vnp_ResponseCode;

    if (statusCode === '00') {
      return { success: true, message: 'Thanh toán thành công!' };
    } else {
      return {
        success: false,
        message: `Thanh toán thất bại! Mã lỗi: ${statusCode}`,
      };
    }
  }
}
