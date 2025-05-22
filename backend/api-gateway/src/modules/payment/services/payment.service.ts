import * as moment from 'moment';
import * as crypto from 'crypto';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class VnpayService {
  constructor(private readonly configService: ConfigService) {}

  createPaymentUrl({ amount, orderId }: { amount: number; orderId: number }) {
    const tmnCode = 'TBHMW208';
    const secretKey = '5MV67S015D9ADVTEM9VP676HPI3ATTUB';
    const vnpUrl = 'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html';
    const returnUrl = `http://localhost:3000/payment-status?orderId=${orderId}`;
    const vnp_Params = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: tmnCode,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: orderId,
      vnp_OrderInfo: 'Thanh toan don hang',
      vnp_OrderType: 'other',
      vnp_Amount: amount * 100,
      vnp_ReturnUrl: returnUrl,
      vnp_IpAddr: '127.0.0.1',
      vnp_CreateDate: moment().format('YYYYMMDDHHmmss'),
    };

    const sortedParams = this.sortObject(vnp_Params);
    const signData = new URLSearchParams(sortedParams).toString();
    const secureHash = crypto
      .createHmac('sha512', secretKey)
      .update(signData)
      .digest('hex');

    const fullUrl = `${vnpUrl}?${signData}&vnp_SecureHash=${secureHash}`;
    return fullUrl;
  }

  verifyVnpayReturn(query: any): boolean {
    const secretKey = '5MV67S015D9ADVTEM9VP676HPI3ATTUB';
    const { vnp_SecureHash, ...rest } = query;
    const sortedParams = this.sortObject(rest);

    const signData = new URLSearchParams(sortedParams).toString();
    const hash = crypto
      .createHmac('sha512', secretKey)
      .update(signData)
      .digest('hex');

    return hash === vnp_SecureHash;
  }

  private sortObject(obj: any) {
    const sorted = {};
    Object.keys(obj)
      .sort()
      .forEach((key) => {
        sorted[key] = obj[key];
      });
    return sorted;
  }
}
