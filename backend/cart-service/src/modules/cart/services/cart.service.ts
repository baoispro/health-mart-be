import { Injectable } from '@nestjs/common';
import { CartItemDto } from '../dto/cart-item.dto';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class CartService {
  constructor(private readonly redisService: RedisService) {}

  async addItemToCart(userId: string, item: CartItemDto) {
    const key = `cart:${userId}`;
    let cart: CartItemDto[] = [];

    try {
      const data = await this.redisService.get(key);
      const parsed = data ? JSON.parse(data) : [];
      cart = Array.isArray(parsed) ? parsed : [];
    } catch {
      cart = [];
    }

    const index = cart.findIndex(
      (i) =>
        i.product_id === item.product_id &&
        i.variant_unit === item.variant_unit,
    );

    if (index > -1) {
      cart[index].quantity += item.quantity;
    } else {
      cart.push(item);
    }

    await this.redisService.set(key, JSON.stringify(cart));
    return cart;
  }

  async getCart(userId: string) {
    const key = `cart:${userId}`;
    const data = await this.redisService.get(key);
    return data ? JSON.parse(data) : [];
  }

  async removeItemFromCart(userId: string, productId: string) {
    const key = `cart:${userId}`;
    const data = await this.redisService.get(key);
    const cart = data ? JSON.parse(data) : [];

    const updatedCart = cart.filter((item) => item.product_id !== productId);
    await this.redisService.set(key, JSON.stringify(updatedCart));
    return updatedCart;
  }

  async overwriteCart(userId: string, items: CartItemDto[]) {
    const key = `cart:${userId}`;
    await this.redisService.set(key, JSON.stringify(items));
    return items;
  }
}
